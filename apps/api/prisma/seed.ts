import { hash } from 'bcryptjs';
import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client.js';
import { createPrismaAdapter } from '../src/shared/prisma/create-prisma-adapter.js';

const PASSWORD_SALT_ROUNDS = 10;
const SEED_PASSWORD = 'WebAtm1979#';

const SEED_SUPER_ADMIN = {
  email: 'atmmdev@gmail.com',
  name: 'Super Admin',
  role: 'SUPER_ADMIN' as const,
};

async function main(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required to run seed');
  }

  const adapter = createPrismaAdapter(databaseUrl);
  const prisma = new PrismaClient({ adapter });
  const passwordHash = await hash(SEED_PASSWORD, PASSWORD_SALT_ROUNDS);

  const superAdmin = await prisma.user.upsert({
    where: { email: SEED_SUPER_ADMIN.email },
    update: {
      name: SEED_SUPER_ADMIN.name,
      password: passwordHash,
      role: SEED_SUPER_ADMIN.role,
      authProvider: 'LOCAL',
      emailVerifiedAt: new Date(),
    },
    create: {
      email: SEED_SUPER_ADMIN.email,
      name: SEED_SUPER_ADMIN.name,
      password: passwordHash,
      role: SEED_SUPER_ADMIN.role,
      authProvider: 'LOCAL',
      emailVerifiedAt: new Date(),
    },
  });

  const obsoleteUsers = await prisma.user.findMany({
    where: { email: { not: SEED_SUPER_ADMIN.email } },
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
