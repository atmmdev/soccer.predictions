import { Injectable, Logger } from '@nestjs/common';

import { ScoringService } from '../../../betting/application/services/scoring.service.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import { FootballDataClient } from '../../infrastructure/integrations/football-data.client.js';
import { buildFixtureUpdateData } from '../utils/fixture-sync.mapper.js';

@Injectable()
export class SyncFixturesService {
  private readonly logger = new Logger(SyncFixturesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly footballDataClient: FootballDataClient,
    private readonly scoringService: ScoringService,
  ) {}

  async syncChampionship(championshipId: number): Promise<number> {
    const championship = await this.prisma.championship.findUnique({
      where: { id: championshipId },
      include: {
        league: true,
      },
    });

    if (!championship) {
      return 0;
    }

    const remoteMatches = await this.footballDataClient.getCompetitionMatches(
      championship.league.externalId,
      championship.season,
    );

    let updated = 0;

    for (const remote of remoteMatches) {
      const result = await this.prisma.fixture.updateMany({
        where: { externalId: remote.id },
        data: buildFixtureUpdateData(remote),
      });

      updated += result.count;
    }

    await this.scoringService.syncScoresForChampionship(championshipId);

    return updated;
  }

  async syncActiveChampionships(mode: 'all' | 'live' = 'all'): Promise<void> {
    try {
      this.footballDataClient.assertConfigured();
    } catch {
      this.logger.warn('Football Data não configurada — sync ignorado');
      return;
    }

    const championships = await this.prisma.championship.findMany({
      where: { status: 'ACTIVE' },
      select: {
        id: true,
        season: true,
        league: { select: { externalId: true } },
      },
    });

    if (mode === 'live') {
      await this.syncLiveAcrossChampionships(championships);
      return;
    }

    for (const championship of championships) {
      await this.syncChampionship(championship.id);
    }
  }

  private async syncLiveAcrossChampionships(
    championships: Array<{
      id: number;
      season: number;
      league: { externalId: number };
    }>,
  ): Promise<void> {
    if (championships.length === 0) {
      return;
    }

    const competitionIds = [
      ...new Set(championships.map(item => item.league.externalId)),
    ];

    const remoteMatches = await this.footballDataClient.getMatches({
      status: 'IN_PLAY,PAUSED',
      competitions: competitionIds.join(','),
    });

    const championshipIdsToScore = new Set<number>();

    for (const remote of remoteMatches) {
      const result = await this.prisma.fixture.updateMany({
        where: { externalId: remote.id },
        data: buildFixtureUpdateData(remote),
      });

      if (result.count > 0) {
        const fixture = await this.prisma.fixture.findUnique({
          where: { externalId: remote.id },
          select: { championshipId: true },
        });

        if (fixture) {
          championshipIdsToScore.add(fixture.championshipId);
        }
      }
    }

    for (const championshipId of championshipIdsToScore) {
      await this.scoringService.syncScoresForChampionship(championshipId);
    }
  }
}
