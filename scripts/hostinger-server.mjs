import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import net from 'node:net';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const webDir = path.join(rootDir, 'apps/web');
const nextCli = path.join(webDir, 'node_modules', 'next', 'dist', 'bin', 'next');
const serverLock = path.join(rootDir, '.server.lock');

const port = Number(process.env.PORT ?? '3000');

function acquireServerLock() {
  if (existsSync(serverLock)) {
    const [ownerPidRaw, startedAtRaw] = readFileSync(serverLock, 'utf8').split(':');
    const ownerPid = Number(ownerPidRaw);
    const startedAt = Number(startedAtRaw);
    const lockAgeMs = Date.now() - startedAt;

    if (Number.isFinite(ownerPid) && ownerPid !== process.pid && lockAgeMs < 120_000) {
      try {
        process.kill(ownerPid, 0);
        console.log(`Another server instance is active (pid ${ownerPid}). Exiting.`);
        process.exit(0);
      } catch {
        // Stale lock.
      }
    }
  }

  writeFileSync(serverLock, `${process.pid}:${Date.now()}`);

  process.on('exit', () => {
    try {
      if (!existsSync(serverLock)) {
        return;
      }

      const [ownerPidRaw] = readFileSync(serverLock, 'utf8').split(':');

      if (Number(ownerPidRaw) === process.pid) {
        unlinkSync(serverLock);
      }
    } catch {
      // Ignore cleanup errors on shutdown.
    }
  });
}

function isPortAvailable(listenPort) {
  return new Promise(resolve => {
    const server = net.createServer();

    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });

    server.listen(listenPort, '0.0.0.0');
  });
}

acquireServerLock();

console.log('Starting production server');
console.log(`PORT=${port}`);
console.log(`NODE_ENV=${process.env.NODE_ENV ?? '(not set)'}`);

if (!(await isPortAvailable(port))) {
  console.error(`Port ${port} is already in use (EADDRINUSE).`);
  console.error('Stop the Node.js app in hPanel, wait 10 seconds, then redeploy once.');
  process.exit(0);
}

spawnSync(process.execPath, [path.join(rootDir, 'scripts/bootstrap-quick.mjs')], {
  cwd: rootDir,
  stdio: 'inherit',
  env: process.env,
});

const result = spawnSync(
  process.execPath,
  [nextCli, 'start', '-H', '0.0.0.0', '-p', String(port)],
  {
    cwd: webDir,
    stdio: 'inherit',
    env: { ...process.env, PORT: String(port) },
  },
);

process.exit(result.status ?? 1);
