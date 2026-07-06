import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = path.join(rootDir, 'apps/api');
const apiPort = process.env.API_INTERNAL_PORT ?? '3001';
const apiOrigin = process.env.API_INTERNAL_URL ?? `http://127.0.0.1:${apiPort}`;

async function waitForApi() {
  const healthUrl = `${apiOrigin}/api/health`;

  for (let attempt = 1; attempt <= 30; attempt += 1) {
    try {
      const response = await fetch(healthUrl);

      if (response.ok) {
        return;
      }
    } catch {
      // API still booting.
    }

    await delay(1000);
  }

  throw new Error(`API did not become ready at ${healthUrl}`);
}

export async function bootstrapApi() {
  console.log('Running Prisma migrations...');

  const migrate = spawnSync('npx', ['prisma', 'migrate', 'deploy'], {
    cwd: apiDir,
    env: process.env,
    stdio: 'inherit',
  });

  if (migrate.status !== 0) {
    throw new Error('Prisma migrate deploy failed');
  }

  console.log('Starting API...');

  spawn('node', [path.join('dist', 'src', 'main.js')], {
    cwd: apiDir,
    env: {
      ...process.env,
      PORT: apiPort,
    },
    stdio: 'inherit',
    detached: true,
  }).unref();

  await waitForApi();
  console.log('API ready');
}
