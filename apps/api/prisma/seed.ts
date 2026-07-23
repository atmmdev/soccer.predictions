import { hash } from 'bcryptjs';
import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client.js';
import { createPrismaAdapter } from '../src/shared/prisma/create-prisma-adapter.js';

const PASSWORD_SALT_ROUNDS = 10;

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `${name} is required to run seed. See senhas.txt (local) and apps/api/.env.example.`,
    );
  }
  return value;
}

async function main(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required to run seed');
  }

  const seedPassword = requiredEnv('SEED_SUPER_ADMIN_PASSWORD');
  const seedSuperAdmin = {
    email: requiredEnv('SEED_SUPER_ADMIN_EMAIL'),
    name: process.env.SEED_SUPER_ADMIN_NAME?.trim() || 'Super Admin',
    role: 'SUPER_ADMIN' as const,
  };

  const adapter = createPrismaAdapter(databaseUrl);
  const prisma = new PrismaClient({ adapter });
  const passwordHash = await hash(seedPassword, PASSWORD_SALT_ROUNDS);

  const superAdmin = await prisma.user.upsert({
    where: { email: seedSuperAdmin.email },
    update: {
      name: seedSuperAdmin.name,
      password: passwordHash,
      role: seedSuperAdmin.role,
      authProvider: 'LOCAL',
      emailVerifiedAt: new Date(),
    },
    create: {
      email: seedSuperAdmin.email,
      name: seedSuperAdmin.name,
      password: passwordHash,
      role: seedSuperAdmin.role,
      authProvider: 'LOCAL',
      emailVerifiedAt: new Date(),
    },
  });

  const obsoleteUsers = await prisma.user.findMany({
    where: { email: { not: seedSuperAdmin.email } },
    select: { id: true },
  });

  if (obsoleteUsers.length > 0) {
    const obsoleteIds = obsoleteUsers.map(user => user.id);

    await prisma.prediction.deleteMany({
      where: { userId: { in: obsoleteIds } },
    });
    await prisma.pointHistory.deleteMany({
      where: { userId: { in: obsoleteIds } },
    });
    await prisma.poolUser.deleteMany({
      where: { userId: { in: obsoleteIds } },
    });
    await prisma.pool.updateMany({
      where: { ownerId: { in: obsoleteIds } },
      data: { ownerId: superAdmin.id },
    });
    await prisma.user.deleteMany({
      where: { id: { in: obsoleteIds } },
    });
  }

  // Championships / fixtures / teams come from football-data.org import.
  // Do not seed fake sports IDs — they conflict with provider externalIds.

  await prisma.$disconnect();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
