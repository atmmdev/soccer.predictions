import { existsSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const fixPrismaBinaries = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'fix-prisma-binaries.mjs',
);

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = path.join(rootDir, 'apps/api');
const apiMain = path.join(apiDir, 'dist', 'src', 'main.js');
const prismaCli = path.join(apiDir, 'node_modules', 'prisma', 'build', 'index.js');
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

function logCommandOutput(result) {
  if (result.stdout?.trim()) {
    console.log(result.stdout.trim());
  }

  if (result.stderr?.trim()) {
    console.error(result.stderr.trim());
  }
}

function runMigrations(databaseUrl) {
  const env = { ...process.env, DATABASE_URL: databaseUrl };

  spawnSync(process.execPath, [fixPrismaBinaries], { stdio: 'inherit' });

  console.log('Running prisma migrate deploy...');

  if (!existsSync(prismaCli)) {
    console.error(`Prisma CLI not found at ${prismaCli}`);
    return false;
  }

  const result = spawnSync(process.execPath, [prismaCli, 'migrate', 'deploy'], {
    cwd: apiDir,
    env,
    encoding: 'utf8',
  });

  logCommandOutput(result);
  return result.status === 0;
}

function isApiRunning() {
  try {
    const result = spawnSync(
      process.execPath,
      [
        '-e',
        `fetch('${apiOrigin}/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))`,
      ],
      { stdio: 'ignore' },
    );

    return result.status === 0;
  } catch {
    return false;
  }
}

function startApiProcess() {
  if (isApiRunning()) {
    console.log('API already running, skipping start.');
    return;
  }

  console.log(`Starting API on port ${apiPort}...`);

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

const databaseUrl = resolveDatabaseUrl();

if (!databaseUrl) {
  console.error('DATABASE_URL is not set — cannot run migrations.');
  process.exit(1);
}

console.log('Bootstrap: database and API...');
console.log(`DATABASE_URL host: ${new URL(databaseUrl).hostname}`);

const migrated = runMigrations(databaseUrl);

if (!migrated) {
  console.error('Prisma migrate deploy FAILED — tables were not created.');
  console.error('Fix: run "npm run db:migrate" from your PC, or paste "npm run db:sql" into phpMyAdmin.');
  console.error('Continuing without API — Next.js will still start.');
} else {
  console.log('Migrations applied successfully.');
  process.env.DATABASE_URL = databaseUrl;
  startApiProcess();
}

console.log('Bootstrap complete.');
