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

/** Free leftover Nest processes from previous Hostinger restarts. */
function freeApiPort(listenPort) {
  try {
    execSync(`fuser -k ${listenPort}/tcp`, { stdio: 'ignore' });
    console.log(`[api] Freed port ${listenPort} via fuser`);
    return;
  } catch {
    // fuser may be unavailable
  }

  try {
    execSync(
      `sh -c 'pids=$(lsof -t -iTCP:${listenPort} -sTCP:LISTEN 2>/dev/null); [ -n "$pids" ] && kill -TERM $pids'`,
      { stdio: 'ignore' },
    );
    console.log(`[api] Freed port ${listenPort} via lsof`);
  } catch {
    // nothing listening / tools missing
  }
}

async function ensureApiPortAvailable(listenPort) {
  if (await isPortFree(listenPort)) {
    return;
  }

  console.warn(`[api] Port ${listenPort} already in use — freeing leftover process`);
  freeApiPort(listenPort);
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!(await isPortFree(listenPort))) {
    console.error(
      `[api] Port ${listenPort} still busy after cleanup. NestAPI will fail to bind.`,
    );
  }
}

async function startApi() {
  if (!existsSync(apiMain)) {
    console.error(`[api] Build not found: ${apiMain}`);
    return;
  }

  const databaseUrl = resolveDatabaseUrl();

  if (!databaseUrl) {
    console.error('[api] DATABASE_URL is not set.');
    return;
  }

  await ensureApiPortAvailable(apiPort);

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
    await startApi();

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
