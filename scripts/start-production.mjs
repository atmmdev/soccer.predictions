import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = path.join(rootDir, 'apps/api');
const webDir = path.join(rootDir, 'apps/web');

const publicPort = process.env.PORT ?? '3000';
const apiPort = process.env.API_INTERNAL_PORT ?? '3001';
const apiOrigin = process.env.API_INTERNAL_URL ?? `http://127.0.0.1:${apiPort}`;

const children = [];

function spawnProcess(command, args, options) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    ...options,
  });

  children.push(child);
  return child;
}

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

function shutdown(exitCode = 0) {
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }

  process.exit(exitCode);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

function runMigrations() {
  console.log('Running Prisma migrations...');

  const result = spawnSync('npx', ['prisma', 'migrate', 'deploy'], {
    cwd: apiDir,
    env: process.env,
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    console.error('Prisma migrate deploy failed.');
    shutdown(result.status ?? 1);
  }
}

runMigrations();

const api = spawnProcess('node', ['dist/main'], {
  cwd: apiDir,
  env: {
    ...process.env,
    PORT: apiPort,
  },
});

api.on('exit', code => {
  if (code && code !== 0) {
    console.error(`API exited with code ${code}`);
    shutdown(code);
  }
});

try {
  await waitForApi();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  shutdown(1);
}

const web = spawnProcess(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['next', 'start', '-p', publicPort],
  {
    cwd: webDir,
    env: {
      ...process.env,
      PORT: publicPort,
    },
  },
);

web.on('exit', code => {
  shutdown(code ?? 0);
});
