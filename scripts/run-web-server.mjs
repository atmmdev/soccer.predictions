import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(scriptDir, '..');
const webDir = path.join(rootDir, 'apps/web');
const apiDir = path.join(rootDir, 'apps/api');
const apiMain = path.join(apiDir, 'dist', 'src', 'main.js');
const apiPort = process.env.API_INTERNAL_PORT ?? '3001';
const port = Number(process.env.PORT || 3000);
const hostname = '0.0.0.0';

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

function startApi() {
  if (!existsSync(apiMain)) {
    console.error(`[api] Build not found: ${apiMain}`);
    return;
  }

  const databaseUrl = resolveDatabaseUrl();

  if (!databaseUrl) {
    console.error('[api] DATABASE_URL is not set.');
    return;
  }

  console.log(`[api] Starting on port ${apiPort}...`);

  spawn(process.execPath, [apiMain], {
    cwd: apiDir,
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
      PORT: apiPort,
      NODE_ENV: process.env.NODE_ENV ?? 'production',
    },
    stdio: 'inherit',
    detached: true,
  }).unref();
}

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
    startApi();

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
