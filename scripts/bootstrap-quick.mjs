import { existsSync, writeFileSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = path.join(rootDir, 'apps/api');
const apiMain = path.join(apiDir, 'dist', 'src', 'main.js');
const prismaCli = path.join(apiDir, 'node_modules', 'prisma', 'build', 'index.js');
const lockFile = path.join(rootDir, '.bootstrap.lock');
const apiPort = process.env.API_INTERNAL_PORT ?? '3001';

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

function runMigrations(databaseUrl) {
  const env = { ...process.env, DATABASE_URL: databaseUrl };

  if (existsSync(prismaCli)) {
    const result = spawnSync(process.execPath, [prismaCli, 'migrate', 'deploy'], {
      cwd: apiDir,
      env,
      encoding: 'utf8',
    });

    if (result.stdout) console.log(result.stdout.trim());
    if (result.stderr) console.error(result.stderr.trim());

    if (result.status === 0) {
      return true;
    }
  }

  const npmResult = spawnSync('npm', ['run', 'prisma:migrate:deploy'], {
    cwd: apiDir,
    env,
    encoding: 'utf8',
    shell: true,
  });

  if (npmResult.stdout) console.log(npmResult.stdout.trim());
  if (npmResult.stderr) console.error(npmResult.stderr.trim());

  return npmResult.status === 0;
}

function startApiProcess() {
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

if (existsSync(lockFile)) {
  console.log('Bootstrap already completed in this deployment, skipping.');
  process.exit(0);
}

const databaseUrl = resolveDatabaseUrl();

if (!databaseUrl) {
  console.error('DATABASE_URL is not set — skipping bootstrap.');
  process.exit(0);
}

console.log('Bootstrap: preparing database and API...');
console.log(`DATABASE_URL host: ${new URL(databaseUrl).hostname}`);

if (!runMigrations(databaseUrl)) {
  console.error('Prisma migrate deploy failed — continuing anyway.');
}

process.env.DATABASE_URL = databaseUrl;
startApiProcess();
writeFileSync(lockFile, new Date().toISOString());
console.log('Bootstrap complete.');
