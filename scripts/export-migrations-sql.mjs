import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const migrationsDir = path.join(rootDir, 'apps/api/prisma/migrations');

const folders = readdirSync(migrationsDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)
  .sort();

const chunks = [
  '-- Run this file in phpMyAdmin if prisma migrate deploy fails on Hostinger.',
  '-- Database: u352396458_soccer',
  '',
];

for (const folder of folders) {
  const sqlPath = path.join(migrationsDir, folder, 'migration.sql');

  chunks.push(`-- ===== ${folder} =====`);
  chunks.push(readFileSync(sqlPath, 'utf8').trim());
  chunks.push('');
}

process.stdout.write(chunks.join('\n'));
