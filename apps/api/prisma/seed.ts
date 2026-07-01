import { hash } from 'bcryptjs';
import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client.js';

const PASSWORD_SALT_ROUNDS = 10;

async function main(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required to run seed');
  }

  const adapter = new PrismaMariaDb(databaseUrl);
  const prisma = new PrismaClient({ adapter });

  const passwordHash = await hash('admin123', PASSWORD_SALT_ROUNDS);

  await prisma.user.upsert({
    where: { email: 'admin@admin' },
    update: {
      name: 'Super Admin',
      password: passwordHash,
      role: 'SUPER_ADMIN',
      authProvider: 'LOCAL',
    },
    create: {
      email: 'admin@admin',
      name: 'Super Admin',
      password: passwordHash,
      role: 'SUPER_ADMIN',
      authProvider: 'LOCAL',
    },
  });

  await prisma.$disconnect();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
