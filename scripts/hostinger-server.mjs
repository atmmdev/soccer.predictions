import net from 'node:net';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const webDir = path.join(rootDir, 'apps/web');
const nextCli = path.join(webDir, 'node_modules', 'next', 'dist', 'bin', 'next');

const port = Number(process.env.PORT ?? '3000');

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
