import { execSync, spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(scriptDir, '..');
const webDir = path.join(rootDir, 'apps/web');
const apiDir = path.join(rootDir, 'apps/api');
const apiMain = path.join(apiDir, 'dist', 'src', 'main.js');
const apiPort = Number(process.env.API_INTERNAL_PORT ?? '3001');
const port = Number(process.env.PORT || 3000);
const hostname = '0.0.0.0';
const PORT_FREE_ATTEMPTS = 10;
const API_HEALTH_TIMEOUT_MS = 45_000;

/** @type {import('node:child_process').ChildProcess | null} */
let apiProcess = null;
let shuttingDown = false;

console.log('[startup] Soccer Predictions booting...');
console.log(`[startup] PORT=${port} NODE_ENV=${process.env.NODE_ENV ?? '(not set)'}`);
console.log(`[startup] cwd=${process.cwd()}`);

process.on('uncaughtException', error => {
  console.error('[startup] uncaughtException:', error);
});

process.on('unhandledRejection', reason => {
  console.error('[startup] unhandledRejection:', reason);
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function resolveDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return null;
  }

  try {
    const parsed = new URL(databaseUrl);

    if (parsed.hostname !== 'localhost' && parsed.hostname !== '127.0.0.1') {
      parsed.hostname = 'localhost';
    }

    return parsed.toString();
  } catch {
    return databaseUrl;
  }
}

function isPortFree(listenPort) {
  return new Promise(resolve => {
    const probe = net.createServer();

    probe.once('error', () => resolve(false));
    probe.once('listening', () => {
      probe.close(() => resolve(true));
    });

    probe.listen(listenPort, '127.0.0.1');
  });
}

function listPortListenerPids(listenPort) {
  const commands = [
    `lsof -t -iTCP:${listenPort} -sTCP:LISTEN 2>/dev/null`,
    `fuser ${listenPort}/tcp 2>/dev/null`,
  ];

  const pids = new Set();

  for (const command of commands) {
    try {
      const output = execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
      for (const token of output.split(/\s+/)) {
        const pid = Number.parseInt(token, 10);
        if (Number.isFinite(pid) && pid > 1) {
          pids.add(pid);
        }
      }
    } catch {
      // tool unavailable or no listeners
    }
  }

  return [...pids];
}

function signalPortListeners(listenPort, signal) {
  const pids = listPortListenerPids(listenPort);

  if (pids.length === 0) {
    return 0;
  }

  for (const pid of pids) {
    try {
      process.kill(pid, signal);
    } catch {
      // process already gone
    }
  }

  console.log(`[api] Sent ${signal} to port ${listenPort} listener(s): ${pids.join(', ')}`);
  return pids.length;
}

/** Free leftover Nest processes from previous Hostinger restarts. */
async function ensureApiPortAvailable(listenPort) {
  if (await isPortFree(listenPort)) {
    return true;
  }

  for (let attempt = 1; attempt <= PORT_FREE_ATTEMPTS; attempt += 1) {
    console.warn(
      `[api] Port ${listenPort} busy (attempt ${attempt}/${PORT_FREE_ATTEMPTS}) — freeing leftover process`,
    );

    signalPortListeners(listenPort, 'SIGTERM');
    await sleep(400 * attempt);

    if (await isPortFree(listenPort)) {
      console.log(`[api] Port ${listenPort} is free after attempt ${attempt}`);
      return true;
    }

    if (attempt === PORT_FREE_ATTEMPTS - 1) {
      signalPortListeners(listenPort, 'SIGKILL');
      await sleep(1500);
    }
  }

  const stillBusy = !(await isPortFree(listenPort));

  if (stillBusy) {
    console.error(
      `[api] Port ${listenPort} still busy after cleanup. Nest API will fail to bind.`,
    );
  }

  return !stillBusy;
}

async function waitForApiHealth(listenPort) {
  const deadline = Date.now() + API_HEALTH_TIMEOUT_MS;

  while (Date.now() < deadline) {
    if (apiProcess && apiProcess.exitCode !== null) {
      console.error(
        `[api] Process exited before health check (code=${apiProcess.exitCode})`,
      );
      return false;
    }

    try {
      const response = await fetch(`http://127.0.0.1:${listenPort}/api/health`);
      if (response.ok) {
        const body = await response.json();
        console.log(`[api] Health check OK: ${JSON.stringify(body)}`);
        return true;
      }
    } catch {
      // API still booting
    }

    await sleep(500);
  }

  console.error(`[api] Health check timed out after ${API_HEALTH_TIMEOUT_MS}ms`);
  return false;
}

async function startApi() {
  if (!existsSync(apiMain)) {
    console.error(`[api] Build not found: ${apiMain}`);
    return false;
  }

  const databaseUrl = resolveDatabaseUrl();

  if (!databaseUrl) {
    console.error('[api] DATABASE_URL is not set.');
    return false;
  }

  const portReady = await ensureApiPortAvailable(apiPort);

  if (!portReady) {
    return false;
  }

  console.log(`[api] Starting on port ${apiPort}...`);

  // Keep Nest as a child of this process (not detached) so Hostinger
  // restarts tear down the API with the parent and avoid EADDRINUSE.
  apiProcess = spawn(process.execPath, [apiMain], {
    cwd: apiDir,
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
      PORT: String(apiPort),
      NODE_ENV: process.env.NODE_ENV ?? 'production',
    },
    stdio: 'inherit',
  });

  apiProcess.on('exit', (code, signal) => {
    apiProcess = null;

    if (shuttingDown) {
      return;
    }

    console.error(
      `[api] Process exited unexpectedly (code=${code}, signal=${signal})`,
    );
  });

  return waitForApiHealth(apiPort);
}

function shutdown(signal) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  console.log(`[startup] Received ${signal}, shutting down...`);

  if (apiProcess && !apiProcess.killed) {
    apiProcess.kill('SIGTERM');
  }

  server.close(() => {
    process.exit(0);
  });

  setTimeout(() => process.exit(0), 3000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

const require = createRequire(path.join(webDir, 'package.json'));
const next = require('next');

let ready = false;
let handleRequest = null;

const server = createServer(async (req, res) => {
  if (!ready || !handleRequest) {
    res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Application is starting, please retry in a few seconds.');
    return;
  }

  try {
    await handleRequest(req, res);
  } catch (error) {
    console.error('[startup] Request error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Internal Server Error');
  }
});

server.listen(port, hostname, () => {
  console.log(`[startup] Listening on http://${hostname}:${port}`);
  void bootNext();
});

async function bootNext() {
  try {
    const apiReady = await startApi();

    if (!apiReady) {
      console.error('[startup] Nest API failed to start — aborting boot');
      process.exit(1);
    }

    console.log('[startup] Preparing Next.js...');
    const app = next({ dev: false, dir: webDir });
    handleRequest = app.getRequestHandler();
    await app.prepare();
    ready = true;
    console.log('[startup] Next.js ready');
  } catch (error) {
    console.error('[startup] Failed to boot Next.js:', error);
    process.exit(1);
  }
}
