import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const webDir = path.join(rootDir, 'apps/web');
const nextCli = path.join(webDir, 'node_modules', 'next', 'dist', 'bin', 'next');

console.log(`Starting production server`);
console.log(`PORT=${process.env.PORT ?? '(not set — Next defaults to 3000)'}`);
console.log(`NODE_ENV=${process.env.NODE_ENV ?? '(not set)'}`);

spawnSync(process.execPath, [path.join(rootDir, 'scripts/bootstrap-quick.mjs')], {
  cwd: rootDir,
  stdio: 'inherit',
  env: process.env,
});

const result = spawnSync(
  process.execPath,
  [nextCli, 'start', '-H', '0.0.0.0'],
  {
    cwd: webDir,
    stdio: 'inherit',
    env: process.env,
  },
);

process.exit(result.status ?? 1);
