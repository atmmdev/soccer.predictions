import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = path.join(rootDir, 'apps/api');
const apiMain = path.join(apiDir, 'dist', 'src', 'main.js');
const apiPort = process.env.API_INTERNAL_PORT ?? '3001';
const apiOrigin = process.env.API_INTERNAL_URL ?? `http://127.0.0.1:${apiPort}`;

function resolveDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;
  const host = process.env.DB_HOST ?? 'localhost';
  const port = process.env.DB_PORT ?? '3306';

  if (!user || !password || !database) {
    return null;
  }

  return `mysql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}?allowPublicKeyRetrieval=true`;
}

function preferLocalhost(databaseUrl) {
  const parsed = new URL(databaseUrl);

  if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
    return databaseUrl;
  }

  parsed.hostname = 'localhost';
  return parsed.toString();
}

async function isApiRunning() {
  try {
    const response = await fetch(`${apiOrigin}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
}

async function startApi() {
  const databaseUrl = resolveDatabaseUrl();

  if (!databaseUrl) {
    console.error('DATABASE_URL is not set — API will not start.');
    return;
  }

  if (!existsSync(apiMain)) {
    console.error(`API entry not found: ${apiMain}`);
    return;
  }

  if (await isApiRunning()) {
    console.log('API already running.');
    return;
  }

  const workingUrl = preferLocalhost(databaseUrl);
  console.log(`Starting API on port ${apiPort}...`);

  spawn(process.execPath, [apiMain], {
    cwd: apiDir,
    env: {
      ...process.env,
      DATABASE_URL: workingUrl,
      PORT: apiPort,
      NODE_ENV: process.env.NODE_ENV ?? 'production',
    },
    stdio: 'inherit',
    detached: true,
  }).unref();
}

await startApi();
