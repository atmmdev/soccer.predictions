import { hash } from 'bcryptjs';
import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client.js';
import { createPrismaAdapter } from '../src/shared/prisma/create-prisma-adapter.js';

const PASSWORD_SALT_ROUNDS = 10;

const defaultScoring = {
  base: {
    exactScore: 4,
    winnerScore: 2,
    loserScore: 1,
    correctWinner: 1,
    drawWithoutExactScore: 2,
    playerGoal: 1,
    playerHatTrickMultiplier: 2,
  },
  cupPhases: null,
};

function minutesFromNow(minutes: number): Date {
  return new Date(Date.now() + minutes * 60_000);
}

async function main(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required to run seed');
  }

  const adapter = createPrismaAdapter(databaseUrl);
  const prisma = new PrismaClient({ adapter });
  const passwordHash = await hash('admin123', PASSWORD_SALT_ROUNDS);
  const participantHash = await hash('participante123', PASSWORD_SALT_ROUNDS);

  const superAdmin = await prisma.user.upsert({
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

  const participant = await prisma.user.upsert({
    where: { email: 'participante@participante.com' },
    update: {
      name: 'Participante Demo',
      password: participantHash,
      role: 'ADMIN',
      authProvider: 'LOCAL',
    },
    create: {
      email: 'participante@participante.com',
      name: 'Participante Demo',
      password: participantHash,
      role: 'ADMIN',
      authProvider: 'LOCAL',
    },
  });

  const league = await prisma.league.upsert({
    where: { externalId: 71 },
    update: {
      name: 'Brasileirão Série A',
      country: 'Brasil',
      type: 'League',
    },
    create: {
      externalId: 71,
      name: 'Brasileirão Série A',
      country: 'Brasil',
      type: 'League',
    },
  });

  const championship = await prisma.championship.upsert({
    where: { id: 1 },
    update: {
      leagueId: league.id,
      season: 2026,
      name: 'Brasileirão Série A',
      country: 'Brasil',
      flags: '🇧🇷',
      type: 'LEAGUE',
      status: 'ACTIVE',
      isCurrentSeason: true,
      allowNewPools: true,
    },
    create: {
      id: 1,
      leagueId: league.id,
      season: 2026,
      name: 'Brasileirão Série A',
      country: 'Brasil',
      flags: '🇧🇷',
      type: 'LEAGUE',
      status: 'ACTIVE',
      isCurrentSeason: true,
      allowNewPools: true,
    },
  });

  const teamData = [
    { externalId: 1001, name: 'Flamengo' },
    { externalId: 1002, name: 'Palmeiras' },
    { externalId: 1003, name: 'Grêmio' },
    { externalId: 1004, name: 'Internacional' },
    { externalId: 1005, name: 'São Paulo' },
    { externalId: 1006, name: 'Corinthians' },
    { externalId: 1007, name: 'Botafogo' },
    { externalId: 1008, name: 'Vasco' },
  ] as const;

  const teams = await Promise.all(
    teamData.map(team =>
      prisma.team.upsert({
        where: { externalId: team.externalId },
        update: { name: team.name, country: 'Brasil' },
        create: {
          externalId: team.externalId,
          name: team.name,
          country: 'Brasil',
        },
      }),
    ),
  );

  const teamByExternalId = Object.fromEntries(
    teams.map(team => [team.externalId, team]),
  );

  const fixtures = [
    {
      externalId: 200101,
      homeTeamId: teamByExternalId[1001].id,
      awayTeamId: teamByExternalId[1002].id,
      date: minutesFromNow(60 * 24 * 5),
      status: 'SCHEDULED' as const,
      round: 12,
      homeScore: null,
      awayScore: null,
    },
    {
      externalId: 200102,
      homeTeamId: teamByExternalId[1005].id,
      awayTeamId: teamByExternalId[1006].id,
      date: minutesFromNow(60 * 24 * 5 + 180),
      status: 'SCHEDULED' as const,
      round: 12,
      homeScore: null,
      awayScore: null,
    },
    {
      externalId: 200105,
      homeTeamId: teamByExternalId[1003].id,
      awayTeamId: teamByExternalId[1004].id,
      date: minutesFromNow(12),
      status: 'SCHEDULED' as const,
      round: 12,
      homeScore: null,
      awayScore: null,
    },
    {
      externalId: 200106,
      homeTeamId: teamByExternalId[1007].id,
      awayTeamId: teamByExternalId[1008].id,
      date: minutesFromNow(-30),
      status: 'LIVE' as const,
      round: 12,
      homeScore: 1,
      awayScore: 0,
    },
    {
      externalId: 200104,
      homeTeamId: teamByExternalId[1001].id,
      awayTeamId: teamByExternalId[1006].id,
      date: minutesFromNow(-60 * 24 * 7),
      status: 'FINISHED' as const,
      round: 11,
      homeScore: 2,
      awayScore: 1,
    },
  ];

  for (const fixture of fixtures) {
    await prisma.fixture.upsert({
      where: { externalId: fixture.externalId },
      update: {
        championshipId: championship.id,
        homeTeamId: fixture.homeTeamId,
        awayTeamId: fixture.awayTeamId,
        date: fixture.date,
        status: fixture.status,
        round: fixture.round,
        homeScore: fixture.homeScore,
        awayScore: fixture.awayScore,
      },
      create: {
        externalId: fixture.externalId,
        championshipId: championship.id,
        homeTeamId: fixture.homeTeamId,
        awayTeamId: fixture.awayTeamId,
        date: fixture.date,
        status: fixture.status,
        round: fixture.round,
        homeScore: fixture.homeScore,
        awayScore: fixture.awayScore,
      },
    });
  }

  const demoPool = await prisma.pool.upsert({
    where: { inviteCode: 'DEMO2026' },
    update: {
      ownerId: participant.id,
      championshipId: championship.id,
      name: 'Bolão Demo',
      status: 'ACTIVE',
      scoring: defaultScoring,
    },
    create: {
      ownerId: participant.id,
      championshipId: championship.id,
      name: 'Bolão Demo',
      inviteCode: 'DEMO2026',
      status: 'ACTIVE',
      scoring: defaultScoring,
    },
  });

  await prisma.poolUser.deleteMany({
    where: { userId: superAdmin.id },
  });
  await prisma.prediction.deleteMany({
    where: { userId: superAdmin.id },
  });

  await prisma.poolUser.upsert({
    where: {
      poolId_userId: {
        poolId: demoPool.id,
        userId: participant.id,
      },
    },
    update: { status: 'ACTIVE' },
    create: {
      poolId: demoPool.id,
      userId: participant.id,
      status: 'ACTIVE',
    },
  });

  const fixtureSaoPauloCorinthians = await prisma.fixture.findUniqueOrThrow({
    where: { externalId: 200102 },
  });
  const fixtureFlamengoCorinthians = await prisma.fixture.findUniqueOrThrow({
    where: { externalId: 200104 },
  });

  await prisma.prediction.upsert({
    where: {
      poolId_userId_fixtureId: {
        poolId: demoPool.id,
        userId: participant.id,
        fixtureId: fixtureSaoPauloCorinthians.id,
      },
    },
    update: {
      predictedHomeScore: 2,
      predictedAwayScore: 1,
      selectedPlayerId: null,
    },
    create: {
      poolId: demoPool.id,
      userId: participant.id,
      fixtureId: fixtureSaoPauloCorinthians.id,
      predictedHomeScore: 2,
      predictedAwayScore: 1,
      selectedPlayerId: null,
    },
  });

  await prisma.prediction.upsert({
    where: {
      poolId_userId_fixtureId: {
        poolId: demoPool.id,
        userId: participant.id,
        fixtureId: fixtureFlamengoCorinthians.id,
      },
    },
    update: {
      predictedHomeScore: 1,
      predictedAwayScore: 1,
      selectedPlayerId: null,
    },
    create: {
      poolId: demoPool.id,
      userId: participant.id,
      fixtureId: fixtureFlamengoCorinthians.id,
      predictedHomeScore: 1,
      predictedAwayScore: 1,
      selectedPlayerId: null,
    },
  });

  await prisma.$disconnect();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
