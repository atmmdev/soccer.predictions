import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const webDir = path.join(rootDir, 'apps/web');
const nextCli = path.join(webDir, 'node_modules', 'next', 'dist', 'bin', 'next');
const bootstrapScript = path.join(rootDir, 'scripts/bootstrap-quick.mjs');
const port = process.env.PORT ?? '3000';

console.log('Starting production server');
console.log(`PORT=${port}`);
console.log(`NODE_ENV=${process.env.NODE_ENV ?? '(not set)'}`);

// Start API in background so Next can bind PORT immediately (Hostinger timeout).
spawn(process.execPath, [bootstrapScript], {
  cwd: rootDir,
  stdio: 'inherit',
  env: process.env,
  detached: true,
}).unref();

const result = spawnSync(
  process.execPath,
  [nextCli, 'start', '-H', '0.0.0.0', '-p', port],
  {
    cwd: webDir,
    stdio: 'inherit',
    env: { ...process.env, PORT: port },
  },
);

process.exit(result.status ?? 1);
