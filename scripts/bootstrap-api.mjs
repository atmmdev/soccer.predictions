import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

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
      'MySQL connection test failed:',
      error instanceof Error ? error.message : error,
    );
    return false;
  }
}

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

function runMigrateCommand(env) {
  const attempts = [
    {
      label: 'prisma cli',
      command: () =>
        spawnSync(process.execPath, [prismaCli, 'migrate', 'deploy'], {
          cwd: apiDir,
          env,
          encoding: 'utf8',
        }),
    },
    {
      label: 'npm script',
      command: () =>
        spawnSync('npm', ['run', 'prisma:migrate:deploy'], {
          cwd: apiDir,
          env,
          encoding: 'utf8',
          shell: true,
        }),
    },
  ];

  for (const attempt of attempts) {
    if (attempt.label === 'prisma cli' && !existsSync(prismaCli)) {
      console.error(`Prisma CLI not found at ${prismaCli}`);
      continue;
    }

    console.log(`Running migrate via ${attempt.label}...`);
    const result = attempt.command();

    if (result.stdout) {
      console.log(result.stdout.trim());
    }

    if (result.stderr) {
      console.error(result.stderr.trim());
    }

    if (result.status === 0) {
      return true;
    }
  }

  return false;
}

async function runMigrations() {
  const databaseUrl = resolveDatabaseUrl();

  if (!databaseUrl) {
    console.error(
      'DATABASE_URL (or DB_USER/DB_PASSWORD/DB_NAME) is not set — skipping migrations.',
    );
    return false;
  }

  console.log(`Database target: ${maskDatabaseUrl(databaseUrl)}`);

  const env = {
    ...process.env,
    DATABASE_URL: databaseUrl,
  };

  const hostsToTry = [
    new URL(databaseUrl).hostname,
    process.env.DB_HOST,
    '127.0.0.1',
    'localhost',
  ].filter(Boolean);

  const uniqueHosts = [...new Set(hostsToTry)];

  for (const host of uniqueHosts) {
    const candidateUrl =
      host === new URL(databaseUrl).hostname
        ? databaseUrl
        : (buildDatabaseUrl(host) ?? databaseUrl);

    console.log(`Testing MySQL host: ${host}`);
    const canConnect = await testDatabaseConnection(candidateUrl);

    if (!canConnect) {
      continue;
    }

    console.log(`MySQL reachable via ${host}. Running Prisma migrations...`);

    if (runMigrateCommand({ ...env, DATABASE_URL: candidateUrl })) {
      process.env.DATABASE_URL = candidateUrl;
      return true;
    }
  }

  console.error('Prisma migrate deploy failed for all tested MySQL hosts.');
  return false;
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
  await runMigrations();
  startApiProcess();

  const ready = await waitForApi();

  if (ready) {
    console.log('API ready');
    return;
  }

  console.error(`API did not become ready at ${apiOrigin}/api/health`);
}
