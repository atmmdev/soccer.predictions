import { existsSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

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

async function findWorkingDatabaseUrl(primaryUrl) {
  for (const candidateUrl of candidateDatabaseUrls(primaryUrl)) {
    const host = new URL(candidateUrl).hostname;
    console.log(`Testing MySQL host: ${host}`);

    if (await testDatabaseConnection(candidateUrl)) {
      console.log(`MySQL reachable via ${host}.`);
      return candidateUrl;
    }
  }

  return null;
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

async function waitForApiHealth() {
  const healthUrl = `${apiOrigin}/api/health`;

  for (let attempt = 1; attempt <= 30; attempt += 1) {
    try {
      const response = await fetch(healthUrl);

      if (response.ok) {
        console.log(`API healthy at ${healthUrl}`);
        return true;
      }
    } catch {
      // API still booting.
    }

    await delay(1000);
  }

  console.error(`API did not respond at ${healthUrl}`);
  return false;
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
  if (!existsSync(apiMain)) {
    console.error(`API entry not found: ${apiMain}`);
    return false;
  }

  if (isApiRunning()) {
    console.log('API already running, skipping start.');
    return true;
  }

  console.log(`Starting API on port ${apiPort}...`);

  const child = spawn(process.execPath, [apiMain], {
    cwd: apiDir,
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
      PORT: apiPort,
      NODE_ENV: process.env.NODE_ENV ?? 'production',
    },
    stdio: 'inherit',
    detached: true,
  });

  child.unref();
  return true;
}

const primaryDatabaseUrl = resolveDatabaseUrl();

if (!primaryDatabaseUrl) {
  console.error('DATABASE_URL is not set — cannot bootstrap API.');
  process.exit(1);
}

console.log('Bootstrap: database and API...');
console.log(`Database target: ${maskDatabaseUrl(primaryDatabaseUrl)}`);

const workingDatabaseUrl = await findWorkingDatabaseUrl(primaryDatabaseUrl);

if (!workingDatabaseUrl) {
  console.error('No reachable MySQL host — API will not start.');
  console.error('On Hostinger use DATABASE_URL with host localhost (not srv*.hstgr.io).');
  console.log('Bootstrap complete.');
  process.exit(0);
}

process.env.DATABASE_URL = workingDatabaseUrl;

const migrated = runMigrateDeploy(workingDatabaseUrl);

if (migrated) {
  console.log('Migrations applied successfully.');
} else {
  console.warn('Migrate deploy failed or skipped — starting API anyway if tables already exist.');
}

if (startApiProcess(workingDatabaseUrl)) {
  await waitForApiHealth();
}

console.log('Bootstrap complete.');
