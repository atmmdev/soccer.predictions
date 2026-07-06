import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = path.join(rootDir, 'apps/api');
const apiMain = path.join(apiDir, 'dist', 'src', 'main.js');
const apiPort = process.env.API_INTERNAL_PORT ?? '3001';

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

export function startApi() {
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
