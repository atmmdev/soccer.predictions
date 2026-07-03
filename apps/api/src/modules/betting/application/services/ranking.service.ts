import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { ScoringService } from './scoring.service.js';

export interface RankingListItem {
  id: number;
  poolId: number;
  poolName: string;
  championshipName: string;
  name: string;
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

@Injectable()
export class RankingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scoringService: ScoringService,
  ) {}

  async listForUser(
    user: AuthUser,
    poolId?: number,
  ): Promise<RankingListItem[]> {
    const pools = await this.findAccessiblePools(user, poolId);

    if (pools.length === 0) {
      return [];
    }

    await this.scoringService.syncPoolsScores(pools.map(pool => pool.id));

    const rows: RankingListItem[] = [];

    for (const pool of pools) {
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
              role: true,
            },
          },
        },
        orderBy: {
          user: { name: 'asc' },
        },
      });

      for (const member of members) {
        const [pointHistory, predictionsCount] = await Promise.all([
          this.prisma.pointHistory.findMany({
            where: {
              poolId: pool.id,
              userId: member.userId,
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
            },
          }),
        ]);

        const aggregated = ScoringService.aggregateBreakdown(pointHistory);

        rows.push({
          id: member.userId,
          poolId: pool.id,
          poolName: pool.name,
          championshipName: pool.championship.name,
          name: member.user.name,
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

      if (right.points !== left.points) {
        return right.points - left.points;
      }

      return left.name.localeCompare(right.name);
    });
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
