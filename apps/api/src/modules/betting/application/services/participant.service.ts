import { Injectable } from '@nestjs/common';
import type { PoolUserStatus } from '../../../../../generated/prisma/client.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';

export interface PoolParticipantItem {
  id: number;
  poolId: number;
  poolName: string;
  inviteCode: string;
  userId: number;
  name: string;
  email: string;
  isOwner: boolean;
  status: PoolUserStatus;
  joinedAt: string;
  predictionsCount: number;
}

@Injectable()
export class ParticipantService {
  constructor(private readonly prisma: PrismaService) {}

  async listForUser(user: AuthUser): Promise<PoolParticipantItem[]> {
    const poolFilter =
      user.role === 'SUPER_ADMIN'
        ? {}
        : {
            ownerId: user.id,
          };

    const members = await this.prisma.poolUser.findMany({
      where: {
        pool: poolFilter,
        user: {
          role: { not: 'SUPER_ADMIN' },
        },
      },
      include: {
        pool: {
          select: {
            id: true,
            name: true,
            inviteCode: true,
            ownerId: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: [
        { pool: { name: 'asc' } },
        { user: { name: 'asc' } },
      ],
    });

    if (members.length === 0) {
      return [];
    }

    const predictionCounts = await this.loadPredictionCounts(
      members.map(member => ({
        poolId: member.poolId,
        userId: member.userId,
      })),
    );

    return members.map(member => ({
      id: member.id,
      poolId: member.pool.id,
      poolName: member.pool.name,
      inviteCode: member.pool.inviteCode,
      userId: member.user.id,
      name: member.user.name,
      email: member.user.email,
      isOwner: member.pool.ownerId === member.user.id,
      status: member.status,
      joinedAt: member.joinedAt.toISOString(),
      predictionsCount:
        predictionCounts.get(`${member.poolId}:${member.userId}`) ?? 0,
    }));
  }

  private async loadPredictionCounts(
    keys: Array<{ poolId: number; userId: number }>,
  ): Promise<Map<string, number>> {
    const counts = new Map<string, number>();

    if (keys.length === 0) {
      return counts;
    }

    const poolIds = [...new Set(keys.map(key => key.poolId))];
    const predictions = await this.prisma.prediction.groupBy({
      by: ['poolId', 'userId'],
      where: {
        poolId: { in: poolIds },
      },
      _count: { _all: true },
    });

    for (const row of predictions) {
      counts.set(`${row.poolId}:${row.userId}`, row._count._all);
    }

    return counts;
  }
}
