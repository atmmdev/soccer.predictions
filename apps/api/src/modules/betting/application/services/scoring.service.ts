import { Injectable } from '@nestjs/common';
import type { Prisma } from '../../../../../generated/prisma/client.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import {
  calculateMatchScore,
  mergeAchievements,
  parsePoolScoringConfig,
  type ScoringAchievementCounts,
} from '../utils/scoring-calculator.js';

@Injectable()
export class ScoringService {
  constructor(private readonly prisma: PrismaService) {}

  async syncPoolScores(poolId: number): Promise<void> {
    const pool = await this.prisma.pool.findUnique({
      where: { id: poolId },
      select: { id: true, scoring: true, championshipId: true },
    });

    if (!pool) {
      return;
    }

    const fixtures = await this.prisma.fixture.findMany({
      where: {
        championshipId: pool.championshipId,
        status: 'FINISHED',
        homeScore: { not: null },
        awayScore: { not: null },
      },
      select: { id: true, homeScore: true, awayScore: true },
    });

    const scoring = parsePoolScoringConfig(pool.scoring);

    for (const fixture of fixtures) {
      await this.scoreFixture(poolId, fixture.id, scoring, {
        homeScore: fixture.homeScore!,
        awayScore: fixture.awayScore!,
      });
    }
  }

  async syncPoolsScores(poolIds: number[]): Promise<void> {
    for (const poolId of poolIds) {
      await this.syncPoolScores(poolId);
    }
  }

  private async scoreFixture(
    poolId: number,
    fixtureId: number,
    scoring: ReturnType<typeof parsePoolScoringConfig>,
    actual: { homeScore: number; awayScore: number },
  ): Promise<void> {
    const predictions = await this.prisma.prediction.findMany({
      where: { poolId, fixtureId },
    });

    if (predictions.length === 0) {
      return;
    }

    await this.prisma.pointHistory.deleteMany({
      where: { poolId, fixtureId },
    });

    const rows: Prisma.PointHistoryCreateManyInput[] = [];

    for (const prediction of predictions) {
      const result = calculateMatchScore(
        prediction.predictedHomeScore,
        prediction.predictedAwayScore,
        actual.homeScore,
        actual.awayScore,
        scoring.base,
      );

      if (result.points === 0) {
        continue;
      }

      rows.push({
        poolId,
        userId: prediction.userId,
        fixtureId,
        points: result.points,
        achievementType: this.resolvePrimaryAchievement(result.achievements),
        breakdown: result.achievements as unknown as Prisma.InputJsonValue,
      });
    }

    if (rows.length > 0) {
      await this.prisma.pointHistory.createMany({ data: rows });
    }
  }

  private resolvePrimaryAchievement(
    achievements: ScoringAchievementCounts,
  ): Prisma.PointHistoryCreateManyInput['achievementType'] {
    if (achievements.exactScore > 0) {
      return 'EXACT_SCORE';
    }

    if (achievements.winnerScore > 0) {
      return 'WINNER_SCORE';
    }

    if (achievements.loserScore > 0) {
      return 'LOSER_SCORE';
    }

    if (achievements.drawWithoutExactScore > 0) {
      return 'DRAW_WITHOUT_EXACT_SCORE';
    }

    if (achievements.correctWinner > 0) {
      return 'CORRECT_WINNER';
    }

    if (achievements.playerHatTrick > 0) {
      return 'PLAYER_HAT_TRICK';
    }

    if (achievements.playerGoal > 0) {
      return 'PLAYER_GOAL';
    }

    return null;
  }

  static aggregateBreakdown(
    entries: Array<{ breakdown: unknown | null; points: number }>,
  ): { points: number; achievements: ScoringAchievementCounts } {
    let achievements = {
      exactScore: 0,
      winnerScore: 0,
      loserScore: 0,
      correctWinner: 0,
      drawWithoutExactScore: 0,
      playerGoal: 0,
      playerHatTrick: 0,
    };

    let points = 0;

    for (const entry of entries) {
      points += entry.points;

      if (!entry.breakdown || typeof entry.breakdown !== 'object') {
        continue;
      }

      achievements = mergeAchievements(
        achievements,
        entry.breakdown as ScoringAchievementCounts,
      );
    }

    return { points, achievements };
  }
}
