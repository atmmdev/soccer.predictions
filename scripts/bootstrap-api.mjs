import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = path.join(rootDir, 'apps/api');
const apiMain = path.join(apiDir, 'dist', 'src', 'main.js');
const prismaCli = path.join(apiDir, 'node_modules', 'prisma', 'build', 'index.js');
const apiPort = process.env.API_INTERNAL_PORT ?? '3001';
const apiOrigin = process.env.API_INTERNAL_URL ?? `http://127.0.0.1:${apiPort}`;

async function waitForApi() {
  const healthUrl = `${apiOrigin}/api/health`;

  for (let attempt = 1; attempt <= 60; attempt += 1) {
    try {
      const response = await fetch(healthUrl);

      if (response.ok) {
        return true;
      }
    } catch {
      // API still booting.
    }

    await delay(1000);
  }

  return false;
}

function runMigrations() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set — skipping migrations.');
    return false;
  }

  console.log('Running Prisma migrations...');

  const migrate = spawnSync(process.execPath, [prismaCli, 'migrate', 'deploy'], {
    cwd: apiDir,
    env: process.env,
    stdio: 'inherit',
  });

  if (migrate.status !== 0) {
    console.error('Prisma migrate deploy failed — API may not work until DB is fixed.');
    return false;
  }

  return true;
}

function startApiProcess() {
  console.log('Starting API...');

  spawn(process.execPath, [apiMain], {
    cwd: apiDir,
    env: {
      ...process.env,
      PORT: apiPort,
    },
    stdio: 'inherit',
    detached: true,
  }).unref();
}

export async function bootstrapApi() {
  runMigrations();
  startApiProcess();

  const ready = await waitForApi();

  if (ready) {
    console.log('API ready');
    return;
  }

  console.error(`API did not become ready at ${apiOrigin}/api/health`);
}
