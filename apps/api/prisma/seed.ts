import { hash } from 'bcryptjs';
import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client.js';
import { createPrismaAdapter } from '../src/shared/prisma/create-prisma-adapter.js';

const PASSWORD_SALT_ROUNDS = 10;

const SEED_PASSWORD = 'WebAtm1979#';

const seedUsers = [
  {
    email: 'atmm.rj@gmail.com',
    name: 'Participante',
    role: 'PARTICIPANT' as const,
  },
  {
    email: 'atmmdev@gmail.com',
    name: 'Super Admin',
    role: 'SUPER_ADMIN' as const,
  },
  {
    email: 'atmmoreira.rj@gmail.com',
    name: 'Admin',
    role: 'ADMIN' as const,
  },
] as const;

async function main(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required to run seed');
  }

  const adapter = createPrismaAdapter(databaseUrl);
  const prisma = new PrismaClient({ adapter });
  const passwordHash = await hash(SEED_PASSWORD, PASSWORD_SALT_ROUNDS);
  const seedEmails = seedUsers.map(user => user.email);

  for (const user of seedUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        password: passwordHash,
        role: user.role,
        authProvider: 'LOCAL',
      },
      create: {
        email: user.email,
        name: user.name,
        password: passwordHash,
        role: user.role,
        authProvider: 'LOCAL',
      },
    });
  }

  const obsoleteUsers = await prisma.user.findMany({
    where: { email: { notIn: [...seedEmails] } },
    select: { id: true },
  });

  if (obsoleteUsers.length > 0) {
    const obsoleteIds = obsoleteUsers.map(user => user.id);
    const admin = await prisma.user.findUniqueOrThrow({
      where: { email: 'atmmoreira.rj@gmail.com' },
    });

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
      data: { ownerId: admin.id },
    });
    await prisma.user.deleteMany({
      where: { id: { in: obsoleteIds } },
    });
  }

  // Championships / fixtures / teams come from football-data.org import (BSA etc.).
  // Do not seed fake sports IDs — they conflict with provider externalIds.

  await prisma.$disconnect();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
