import { existsSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
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

function encodeCredential(value) {
  return encodeURIComponent(value);
}

function buildDatabaseUrl(host) {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;
  const port = process.env.DB_PORT ?? '3306';

  if (!user || !password || !database) {
    return null;
  }

  return `mysql://${encodeCredential(user)}:${encodeCredential(password)}@${host}:${port}/${database}?allowPublicKeyRetrieval=true`;
}

function withDatabaseHost(databaseUrl, host) {
  const parsed = new URL(databaseUrl);
  parsed.hostname = host;
  return parsed.toString();
}

function resolveDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const host = process.env.DB_HOST ?? 'localhost';
  return buildDatabaseUrl(host);
}

function maskDatabaseUrl(databaseUrl) {
  return databaseUrl.replace(/:([^:@/]+)@/, ':***@');
}

function candidateDatabaseUrls(primaryUrl) {
  const parsed = new URL(primaryUrl);
  const hosts = [
    parsed.hostname,
    process.env.DB_HOST,
    'localhost',
    '127.0.0.1',
  ].filter(Boolean);

  const uniqueHosts = [...new Set(hosts)];

  return uniqueHosts.map(host => {
    if (host === parsed.hostname) {
      return primaryUrl;
    }

    return buildDatabaseUrl(host) ?? withDatabaseHost(primaryUrl, host);
  });
}

async function testDatabaseConnection(databaseUrl) {
  try {
    const require = createRequire(path.join(apiDir, 'package.json'));
    const mariadb = require('mariadb');
    const parsed = new URL(databaseUrl);

    const connection = await mariadb.createConnection({
      host: parsed.hostname,
      port: Number(parsed.port || 3306),
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: parsed.pathname.replace(/^\//, ''),
      connectTimeout: 5000,
    });

    await connection.query('SELECT 1');
    await connection.end();
    return true;
  } catch (error) {
    console.error(
      `MySQL unreachable at ${new URL(databaseUrl).hostname}:`,
      error instanceof Error ? error.message : error,
    );
    return false;
  }
}

function logCommandOutput(result) {
  if (result.stdout?.trim()) {
    console.log(result.stdout.trim());
  }

  if (result.stderr?.trim()) {
    console.error(result.stderr.trim());
  }
}

function runMigrateDeploy(databaseUrl) {
  const env = { ...process.env, DATABASE_URL: databaseUrl };

  spawnSync(process.execPath, [fixPrismaBinaries], { stdio: 'inherit' });

  console.log(`Running prisma migrate deploy via ${new URL(databaseUrl).hostname}...`);

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

async function runMigrations(primaryUrl) {
  const candidates = candidateDatabaseUrls(primaryUrl);

  for (const candidateUrl of candidates) {
    const host = new URL(candidateUrl).hostname;
    console.log(`Testing MySQL host: ${host}`);

    if (!(await testDatabaseConnection(candidateUrl))) {
      continue;
    }

    console.log(`MySQL reachable via ${host}.`);

    if (runMigrateDeploy(candidateUrl)) {
      return candidateUrl;
    }
  }

  return null;
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

function startApiProcess(databaseUrl) {
  if (isApiRunning()) {
    console.log('API already running, skipping start.');
    return;
  }

  console.log(`Starting API on port ${apiPort}...`);

  spawn(process.execPath, [apiMain], {
    cwd: apiDir,
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
      PORT: apiPort,
    },
    stdio: 'inherit',
    detached: true,
  }).unref();
}

const primaryDatabaseUrl = resolveDatabaseUrl();

if (!primaryDatabaseUrl) {
  console.error('DATABASE_URL is not set — cannot run migrations.');
  process.exit(1);
}

console.log('Bootstrap: database and API...');
console.log(`Database target: ${maskDatabaseUrl(primaryDatabaseUrl)}`);

const workingDatabaseUrl = await runMigrations(primaryDatabaseUrl);

if (!workingDatabaseUrl) {
  console.error('Prisma migrate deploy FAILED — tables were not created.');
  console.error('On Hostinger set DATABASE_URL host to localhost (not srv*.hstgr.io).');
  console.error('Or run "npm run db:migrate" from your PC / paste "npm run db:sql" in phpMyAdmin.');
  console.error('Continuing without API — Next.js will still start.');
} else {
  console.log('Migrations applied successfully.');
  process.env.DATABASE_URL = workingDatabaseUrl;
  startApiProcess(workingDatabaseUrl);
}

console.log('Bootstrap complete.');
