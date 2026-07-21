import { Injectable, NotFoundException } from '@nestjs/common';
import type { ChampionshipType, Prisma } from '../../../../../generated/prisma/client.js';

import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { compareRankingStandings } from '../utils/compare-ranking-standings.js';
import { ScoringService } from './scoring.service.js';

export interface RankingListItem {
  id: number;
  poolId: number;
  poolName: string;
  championshipName: string;
  championshipType: ChampionshipType;
  name: string;
  email: string;
  avatarDataUrl: string | null;
  points: number;
  predictionsCount: number;
  scoringAchievements: {
    exactScore: number;
    winnerScore: number;
    loserScore: number;
    correctWinner: number;
    drawWithoutExactScore: number;
    playerGoal: number;
    playerHatTrick: number;
  };
  isCurrentUser: boolean;
}

export interface RankingContext {
  poolId: number;
  championshipType: ChampionshipType;
  championshipName: string;
  rounds: number[];
}

@Injectable()
export class RankingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scoringService: ScoringService,
  ) {}

  async listForUser(
    user: AuthUser,
    poolId?: number,
    round?: number,
  ): Promise<RankingListItem[]> {
    const pools = await this.findAccessiblePools(user, poolId);

    if (pools.length === 0) {
      return [];
    }

    await this.scoringService.syncPoolsScores(pools.map(pool => pool.id));

    const rows: RankingListItem[] = [];

    for (const pool of pools) {
      const roundFilter = this.resolveRoundFilter(pool.championship.type, round);

      const members = await this.prisma.poolUser.findMany({
        where: {
          poolId: pool.id,
          status: 'ACTIVE',
          user: { role: { not: 'SUPER_ADMIN' } },
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatarDataUrl: true,
              role: true,
            },
          },
        },
        orderBy: {
          user: { name: 'asc' },
        },
      });

      for (const member of members) {
        const fixtureFilter: Prisma.FixtureWhereInput | undefined =
          roundFilter !== undefined
            ? { round: { lte: roundFilter } }
            : undefined;

        const [pointHistory, predictionsCount] = await Promise.all([
          this.prisma.pointHistory.findMany({
            where: {
              poolId: pool.id,
              userId: member.userId,
              ...(fixtureFilter ? { fixture: fixtureFilter } : {}),
            },
            select: {
              points: true,
              breakdown: true,
            },
          }),
          this.prisma.prediction.count({
            where: {
              poolId: pool.id,
              userId: member.userId,
              ...(fixtureFilter ? { fixture: fixtureFilter } : {}),
            },
          }),
        ]);

        const aggregated = ScoringService.aggregateBreakdown(pointHistory);

        rows.push({
          id: member.userId,
          poolId: pool.id,
          poolName: pool.name,
          championshipName: pool.championship.name,
          championshipType: pool.championship.type,
          name: member.user.name,
          email: member.user.email,
          avatarDataUrl: member.user.avatarDataUrl,
          points: aggregated.points,
          predictionsCount,
          scoringAchievements: aggregated.achievements,
          isCurrentUser: member.userId === user.id,
        });
      }
    }

    return rows.sort((left, right) => {
      if (left.poolName !== right.poolName) {
        return left.poolName.localeCompare(right.poolName);
      }

      return compareRankingStandings(
        {
          points: left.points,
          exactScore: left.scoringAchievements.exactScore,
          name: left.name,
        },
        {
          points: right.points,
          exactScore: right.scoringAchievements.exactScore,
          name: right.name,
        },
      );
    });
  }

  async getContextForPool(
    user: AuthUser,
    poolId: number,
  ): Promise<RankingContext> {
    const pool = await this.findAccessiblePoolById(poolId, user);

    const fixtureRounds = await this.prisma.fixture.findMany({
      where: {
        championshipId: pool.championshipId,
        round: { not: null },
      },
      select: { round: true },
      distinct: ['round'],
      orderBy: { round: 'asc' },
    });

    const rounds = fixtureRounds
      .map(fixture => fixture.round)
      .filter((value): value is number => typeof value === 'number');

    return {
      poolId: pool.id,
      championshipType: pool.championship.type,
      championshipName: pool.championship.name,
      rounds,
    };
  }

  async getPoolMemberPositions(
    poolIds: number[],
    options?: { syncScores?: boolean },
  ): Promise<Map<string, number>> {
    const positions = new Map<string, number>();

    if (poolIds.length === 0) {
      return positions;
    }

    if (options?.syncScores !== false) {
      await this.scoringService.syncPoolsScores(poolIds);
    }

    for (const poolId of poolIds) {
      const members = await this.prisma.poolUser.findMany({
        where: {
          poolId,
          status: 'ACTIVE',
          user: { role: { not: 'SUPER_ADMIN' } },
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      const ranked = await Promise.all(
        members.map(async member => {
          const pointHistory = await this.prisma.pointHistory.findMany({
            where: {
              poolId,
              userId: member.userId,
            },
            select: {
              points: true,
              breakdown: true,
            },
          });

          const aggregated = ScoringService.aggregateBreakdown(pointHistory);

          return {
            userId: member.userId,
            name: member.user.name,
            points: aggregated.points,
            exactScore: aggregated.achievements.exactScore,
          };
        }),
      );

      ranked.sort((left, right) => compareRankingStandings(left, right));

      ranked.forEach((entry, index) => {
        positions.set(`${poolId}:${entry.userId}`, index + 1);
      });
    }

    return positions;
  }

  private resolveRoundFilter(
    championshipType: ChampionshipType,
    round?: number,
  ): number | undefined {
    if (
      championshipType !== 'LEAGUE' ||
      round === undefined ||
      !Number.isInteger(round) ||
      round < 1
    ) {
      return undefined;
    }

    return round;
  }

  private async findAccessiblePools(user: AuthUser, poolId?: number) {
    if (poolId !== undefined) {
      const pool = await this.findAccessiblePoolById(poolId, user);

      return [pool];
    }

    if (user.role === 'SUPER_ADMIN') {
      return this.prisma.pool.findMany({
        orderBy: { createdAt: 'desc' },
        include: { championship: true },
      });
    }

    return this.prisma.pool.findMany({
      where: {
        OR: [
          { ownerId: user.id },
          {
            poolUsers: {
              some: {
                userId: user.id,
                status: 'ACTIVE',
              },
            },
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: { championship: true },
    });
  }

  private async findAccessiblePoolById(poolId: number, user: AuthUser) {
    if (user.role === 'SUPER_ADMIN') {
      const pool = await this.prisma.pool.findUnique({
        where: { id: poolId },
        include: { championship: true },
      });

      if (!pool) {
        throw new NotFoundException('Bolão não encontrado');
      }

      return pool;
    }

    const pool = await this.prisma.pool.findFirst({
      where: {
        id: poolId,
        OR: [
          { ownerId: user.id },
          {
            poolUsers: {
              some: {
                userId: user.id,
                status: 'ACTIVE',
              },
            },
          },
        ],
      },
      include: { championship: true },
    });

    if (!pool) {
      throw new NotFoundException('Bolão não encontrado');
    }

    return pool;
  }
}
