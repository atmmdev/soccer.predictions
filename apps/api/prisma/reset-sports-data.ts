import 'dotenv/config';

import { PrismaClient } from '../generated/prisma/client.js';
import { createPrismaAdapter } from '../src/shared/prisma/create-prisma-adapter.js';

/**
 * Clears imported sports data so championships can be reimported
 * with football-data.org external IDs.
 */
async function main(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required');
  }

  const prisma = new PrismaClient({
    adapter: createPrismaAdapter(databaseUrl),
  });

  await prisma.pointHistory.deleteMany();
  await prisma.prediction.deleteMany();
  await prisma.poolUser.deleteMany();
  await prisma.pool.deleteMany();
  await prisma.fixture.deleteMany();
  await prisma.championship.deleteMany();
  await prisma.team.deleteMany();
  await prisma.league.deleteMany();

  console.log('Sports data reset OK (pools/predictions/fixtures/teams/leagues)');
  await prisma.$disconnect();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
