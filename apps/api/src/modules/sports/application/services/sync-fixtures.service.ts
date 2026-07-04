import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import { mapApiFootballFixtureStatus } from '../utils/fixture-status.mapper.js';
import { ApiFootballClient } from '../../infrastructure/integrations/api-football.client.js';

@Injectable()
export class SyncFixturesService {
  private readonly logger = new Logger(SyncFixturesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly apiFootballClient: ApiFootballClient,
  ) {}

  async syncChampionship(championshipId: number): Promise<number> {
    const championship = await this.prisma.championship.findUnique({
      where: { id: championshipId },
      include: {
        league: true,
        fixtures: {
          select: { id: true, externalId: true },
        },
      },
    });

    if (!championship) {
      return 0;
    }

    const remoteFixtures = await this.apiFootballClient.getFixtures(
      championship.league.externalId,
      championship.season,
    );

    let updated = 0;

    for (const remote of remoteFixtures) {
      const result = await this.prisma.fixture.updateMany({
        where: { externalId: remote.fixture.id },
        data: {
          date: new Date(remote.fixture.date),
          status: mapApiFootballFixtureStatus(remote.fixture.status.short),
          homeScore: remote.goals.home,
          awayScore: remote.goals.away,
        },
      });

      updated += result.count;
    }

    return updated;
  }

  async syncActiveChampionships(mode: 'all' | 'live' = 'all'): Promise<void> {
    try {
      this.apiFootballClient.assertConfigured();
    } catch {
      this.logger.warn('API Football não configurada — sync ignorado');
      return;
    }

    const championships = await this.prisma.championship.findMany({
      where: { status: 'ACTIVE' },
      select: { id: true },
    });

    for (const championship of championships) {
      if (mode === 'live') {
        await this.syncLiveFixtures(championship.id);
        continue;
      }

      await this.syncChampionship(championship.id);
    }
  }

  private async syncLiveFixtures(championshipId: number): Promise<void> {
    const liveFixtures = await this.prisma.fixture.findMany({
      where: {
        championshipId,
        status: { in: ['SCHEDULED', 'LIVE'] },
      },
      select: { externalId: true },
      take: 40,
    });

    if (liveFixtures.length === 0) {
      return;
    }

    const remoteFixtures = await this.apiFootballClient.getFixturesByIds(
      liveFixtures.map(fixture => fixture.externalId),
    );

    for (const remote of remoteFixtures) {
      await this.prisma.fixture.updateMany({
        where: { externalId: remote.fixture.id },
        data: {
          date: new Date(remote.fixture.date),
          status: mapApiFootballFixtureStatus(remote.fixture.status.short),
          homeScore: remote.goals.home,
          awayScore: remote.goals.away,
        },
      });
    }
  }
}
