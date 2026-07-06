import { chmodSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const engineDirs = [
  path.join(rootDir, 'apps/api/node_modules/@prisma/engines'),
  path.join(rootDir, 'node_modules/@prisma/engines'),
];

let fixed = 0;

for (const dir of engineDirs) {
  if (!existsSync(dir)) {
    continue;
  }

  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);

    if (!statSync(fullPath).isFile()) {
      continue;
    }

    try {
      chmodSync(fullPath, 0o755);
      fixed += 1;
    } catch (error) {
      console.warn(`chmod failed for ${fullPath}: ${error.message}`);
    }
  }
}

if (fixed > 0) {
  console.log(`Prisma binaries: set execute permission on ${fixed} file(s).`);
}
