import { execSync, spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createServer, request as httpRequest } from 'node:http';
import { createRequire } from 'node:module';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(scriptDir, '..');
const webDir = path.join(rootDir, 'apps/web');
const apiDir = path.join(rootDir, 'apps/api');
const apiMain = path.join(apiDir, 'dist', 'src', 'main.js');
const preferredApiPort = Number(process.env.API_INTERNAL_PORT ?? '3001');
const port = Number(process.env.PORT || 3000);
const hostname = '0.0.0.0';
const PORT_FREE_ATTEMPTS = 3;
const API_HEALTH_TIMEOUT_MS = 45_000;
const FALLBACK_PORT_RANGE = 20;

/** @type {import('node:child_process').ChildProcess | null} */
let apiProcess = null;
/** Port the live Nest child is bound to (may differ from preferred after fallback). */
let activeApiPort = preferredApiPort;
let apiReady = false;
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

function addPidTokens(pids, text) {
  for (const token of String(text).split(/[\s,=]+/)) {
    const pid = Number.parseInt(token, 10);
    if (Number.isFinite(pid) && pid > 1 && pid !== process.pid) {
      pids.add(pid);
    }
  }
}

function listPortListenerPids(listenPort) {
  const commands = [
    `lsof -t -iTCP:${listenPort} -sTCP:LISTEN 2>/dev/null`,
    `fuser ${listenPort}/tcp 2>/dev/null`,
    `ss -ltnp "sport = :${listenPort}" 2>/dev/null`,
    `netstat -tlnp 2>/dev/null | grep ":${listenPort} "`,
  ];

  const pids = new Set();

  for (const command of commands) {
    try {
      const output = execSync(command, {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();

      if (!output) {
        continue;
      }

      for (const match of output.matchAll(/pid[=:]?\s*(\d+)/gi)) {
        addPidTokens(pids, match[1]);
      }
      for (const match of output.matchAll(/\b(\d+)\/\S+/g)) {
        addPidTokens(pids, match[1]);
      }

      addPidTokens(pids, output);
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

  console.log(
    `[api] Sent ${signal} to port ${listenPort} listener(s): ${pids.join(', ')}`,
  );
  return pids.length;
}

async function probeApiHealth(listenPort) {
  try {
    const response = await fetch(`http://127.0.0.1:${listenPort}/api/health`);
    if (!response.ok) {
      return false;
    }

    const body = await response.json();
    return body.status === 'ok' && body.database === 'up';
  } catch {
    return false;
  }
}

/**
 * Try to free a port. Never reuses an existing Nest — that caused deploys to
 * keep serving stale API code on Hostinger.
 */
async function tryFreePort(listenPort) {
  if (await isPortFree(listenPort)) {
    return true;
  }

  for (let attempt = 1; attempt <= PORT_FREE_ATTEMPTS; attempt += 1) {
    const pids = listPortListenerPids(listenPort);
    console.warn(
      `[api] Port ${listenPort} busy (attempt ${attempt}/${PORT_FREE_ATTEMPTS})` +
        (pids.length > 0
          ? ` — pids: ${pids.join(', ')}`
          : ' — no listener pid found'),
    );

    const signal = attempt >= 2 ? 'SIGKILL' : 'SIGTERM';
    const signaled = signalPortListeners(listenPort, signal);

    if (signaled === 0) {
      await sleep(150);
      if (await isPortFree(listenPort)) {
        return true;
      }
      // Shared hosting often hides PIDs — stop wasting boot time.
      return false;
    }

    await sleep(200 * attempt);

    if (await isPortFree(listenPort)) {
      console.log(`[api] Port ${listenPort} is free after attempt ${attempt}`);
      return true;
    }
  }

  return isPortFree(listenPort);
}

async function reserveApiPort() {
  if (await tryFreePort(preferredApiPort)) {
    return preferredApiPort;
  }

  console.warn(
    `[api] Preferred port ${preferredApiPort} still busy — picking a free fallback port (will NOT reuse orphan Nest)`,
  );

  for (let offset = 1; offset <= FALLBACK_PORT_RANGE; offset += 1) {
    const candidate = preferredApiPort + offset;
    if (candidate === port) {
      continue;
    }

    if (await isPortFree(candidate)) {
      console.log(`[api] Using fallback port ${candidate}`);
      return candidate;
    }
  }

  return null;
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

    if (await probeApiHealth(listenPort)) {
      console.log('[api] Health check OK');
      return true;
    }

    await sleep(500);
  }

  console.error(`[api] Health check timed out after ${API_HEALTH_TIMEOUT_MS}ms`);
  return false;
}

function markApiReady() {
  apiReady = true;
  console.log(`[api] Proxy enabled for /api/* → 127.0.0.1:${activeApiPort}`);
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

  const listenPort = await reserveApiPort();

  if (listenPort == null) {
    console.error(
      `[api] No free port near ${preferredApiPort} — Nest API cannot start.`,
    );
    return false;
  }

  activeApiPort = listenPort;
  console.log(`[api] Starting on port ${activeApiPort}...`);

  apiProcess = spawn(process.execPath, [apiMain], {
    cwd: apiDir,
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
      PORT: String(activeApiPort),
      NODE_ENV: process.env.NODE_ENV ?? 'production',
    },
    stdio: 'inherit',
  });

  apiProcess.on('exit', (code, signal) => {
    apiProcess = null;
    apiReady = false;

    if (shuttingDown) {
      return;
    }

    console.error(
      `[api] Process exited unexpectedly (code=${code}, signal=${signal})`,
    );
  });

  const healthy = await waitForApiHealth(activeApiPort);

  if (healthy) {
    markApiReady();
  }

  return healthy;
}

function proxyToApi(req, res) {
  const proxyReq = httpRequest(
    {
      hostname: '127.0.0.1',
      port: activeApiPort,
      path: req.url,
      method: req.method,
      headers: {
        ...req.headers,
        host: `127.0.0.1:${activeApiPort}`,
      },
    },
    proxyRes => {
      res.writeHead(proxyRes.statusCode ?? 502, proxyRes.headers);
      proxyRes.pipe(res);
    },
  );

  proxyReq.on('error', error => {
    console.error('[api] Proxy error:', error);
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('API unavailable');
    }
  });

  req.pipe(proxyReq);
}

function shutdown(signal) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  console.log(`[startup] Received ${signal}, shutting down...`);

  if (apiProcess && !apiProcess.killed) {
    apiProcess.kill('SIGTERM');
    setTimeout(() => {
      if (apiProcess && !apiProcess.killed) {
        apiProcess.kill('SIGKILL');
      }
    }, 800).unref();
  }

  server.close(() => {
    process.exit(0);
  });

  setTimeout(() => process.exit(0), 3000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

let ready = false;
let handleRequest = null;

const server = createServer(async (req, res) => {
  const url = req.url ?? '/';

  if (url.startsWith('/api/') || url === '/api') {
    if (apiReady) {
      proxyToApi(req, res);
      return;
    }

    res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('API is starting, please retry in a few seconds.');
    return;
  }

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

function listenHttp() {
  return new Promise(resolve => {
    server.once('error', error => {
      if (error.code === 'EADDRINUSE') {
        resolve({ ok: false, reason: 'EADDRINUSE' });
        return;
      }

      console.error('[startup] HTTP server error:', error);
      resolve({ ok: false, reason: error.code ?? 'ERROR' });
    });

    server.listen(port, hostname, () => {
      console.log(`[startup] Listening on http://${hostname}:${port}`);
      resolve({ ok: true });
    });
  });
}

async function bootNext() {
  const nestReady = await startApi();

  if (!nestReady) {
    console.error('[startup] Nest API failed to start — aborting boot');
    process.exit(1);
  }

  console.log('[startup] Preparing Next.js...');
  const require = createRequire(path.join(webDir, 'package.json'));
  const next = require('next');
  const app = next({ dev: false, dir: webDir });
  handleRequest = app.getRequestHandler();
  await app.prepare();
  ready = true;
  console.log('[startup] Next.js ready');
}

async function main() {
  const listenResult = await listenHttp();

  if (!listenResult.ok) {
    console.log(
      `[startup] Port ${port} already in use (${listenResult.reason}) — primary instance is serving`,
    );
    process.exit(0);
  }

  await bootNext();
}

main().catch(error => {
  console.error('[startup] Failed to boot application:', error);
  process.exit(1);
});
