import { Injectable, Logger } from '@nestjs/common';

import { ScoringService } from '../../../betting/application/services/scoring.service.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import { ApiFootballClient } from '../../infrastructure/integrations/api-football.client.js';
import { mapEventsToGoalScorers } from '../utils/fixture-goal-scorers.js';
import {
  buildFixtureUpdateData,
  isFinishedFixtureStatus,
} from '../utils/fixture-sync.mapper.js';

@Injectable()
export class SyncFixturesService {
  private readonly logger = new Logger(SyncFixturesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly apiFootballClient: ApiFootballClient,
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

    const remoteFixtures = await this.apiFootballClient.getFixtures(
      championship.league.externalId,
      championship.season,
    );

    let updated = 0;

    for (const remote of remoteFixtures) {
      const goalScorers = await this.resolveGoalScorers(remote);

      const result = await this.prisma.fixture.updateMany({
        where: { externalId: remote.fixture.id },
        data: buildFixtureUpdateData(remote, goalScorers),
      });

      updated += result.count;
    }

    await this.scoringService.syncScoresForChampionship(championshipId);

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
      const goalScorers = await this.resolveGoalScorers(remote);

      await this.prisma.fixture.updateMany({
        where: { externalId: remote.fixture.id },
        data: buildFixtureUpdateData(remote, goalScorers),
      });
    }

    await this.scoringService.syncScoresForChampionship(championshipId);
  }

  private async resolveGoalScorers(
    remote: Parameters<typeof buildFixtureUpdateData>[0],
  ) {
    if (!isFinishedFixtureStatus(remote.fixture.status.short)) {
      return undefined;
    }

    try {
      const events = await this.apiFootballClient.getFixtureEvents(
        remote.fixture.id,
      );

      return mapEventsToGoalScorers(events);
    } catch (error) {
      this.logger.warn(
        `Não foi possível carregar gols do fixture ${remote.fixture.id}`,
        error,
      );

      return undefined;
    }
  }
}
