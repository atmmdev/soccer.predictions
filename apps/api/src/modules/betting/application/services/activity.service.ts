import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';

export type ActivityType = 'participant' | 'prediction' | 'pool' | 'result';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  occurredAt: string;
}

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;
const PER_SOURCE_LIMIT = 50;

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async listForUser(
    user: AuthUser,
    limitQuery?: number,
  ): Promise<ActivityItem[]> {
    const limit = this.normalizeLimit(limitQuery);
    const pools = await this.findAccessiblePools(user);

    if (pools.length === 0) {
      return [];
    }

    const poolIds = pools.map(pool => pool.id);
    const championshipIds = [
      ...new Set(pools.map(pool => pool.championshipId)),
    ];

    const [participants, predictions, createdPools, finishedFixtures] =
      await Promise.all([
        this.prisma.poolUser.findMany({
          where: {
            poolId: { in: poolIds },
            status: 'ACTIVE',
          },
          orderBy: { joinedAt: 'desc' },
          take: PER_SOURCE_LIMIT,
          include: {
            user: { select: { id: true, name: true } },
            pool: { select: { id: true, name: true } },
          },
        }),
        this.prisma.prediction.findMany({
          where: { poolId: { in: poolIds } },
          orderBy: { createdAt: 'desc' },
          take: PER_SOURCE_LIMIT,
          include: {
            user: { select: { id: true, name: true } },
            fixture: {
              include: {
                homeTeam: { select: { name: true } },
                awayTeam: { select: { name: true } },
              },
            },
          },
        }),
        this.prisma.pool.findMany({
          where: { id: { in: poolIds } },
          orderBy: { createdAt: 'desc' },
          take: PER_SOURCE_LIMIT,
          include: {
            owner: { select: { id: true, name: true } },
          },
        }),
        this.prisma.fixture.findMany({
          where: {
            championshipId: { in: championshipIds },
            status: 'FINISHED',
          },
          orderBy: { updatedAt: 'desc' },
          take: PER_SOURCE_LIMIT,
          include: {
            homeTeam: { select: { name: true } },
            awayTeam: { select: { name: true } },
            championship: { select: { name: true } },
          },
        }),
      ]);

    const items: ActivityItem[] = [
      ...participants.map(row => ({
        id: `participant:${row.id}`,
        type: 'participant' as const,
        title: 'Novo participante cadastrado',
        description: `${row.user.name} entrou no bolão ${row.pool.name}`,
        occurredAt: row.joinedAt.toISOString(),
      })),
      ...predictions.map(row => ({
        id: `prediction:${row.id}`,
        type: 'prediction' as const,
        title: 'Novo palpite registrado',
        description: `${row.user.name} registrou palpite no jogo ${row.fixture.homeTeam.name} x ${row.fixture.awayTeam.name}`,
        occurredAt: row.createdAt.toISOString(),
      })),
      ...createdPools.map(row => ({
        id: `pool:${row.id}`,
        type: 'pool' as const,
        title: 'Bolão criado',
        description: `${row.name} foi criado por ${row.owner.name}`,
        occurredAt: row.createdAt.toISOString(),
      })),
      ...finishedFixtures.map(row => {
        const homeScore = row.homeScore ?? 0;
        const awayScore = row.awayScore ?? 0;

        return {
          id: `result:${row.id}`,
          type: 'result' as const,
          title: 'Resultado finalizado',
          description: `${row.homeTeam.name} ${homeScore} x ${awayScore} ${row.awayTeam.name} - ${row.championship.name}`,
          occurredAt: row.updatedAt.toISOString(),
        };
      }),
    ];

    return items
      .sort(
        (left, right) =>
          new Date(right.occurredAt).getTime() -
          new Date(left.occurredAt).getTime(),
      )
      .slice(0, limit);
  }

  private normalizeLimit(limitQuery?: number): number {
    if (limitQuery === undefined || !Number.isFinite(limitQuery)) {
      return DEFAULT_LIMIT;
    }

    return Math.min(MAX_LIMIT, Math.max(1, Math.trunc(limitQuery)));
  }

  private async findAccessiblePools(user: AuthUser) {
    if (user.role === 'SUPER_ADMIN') {
      return this.prisma.pool.findMany({
        select: { id: true, championshipId: true },
        orderBy: { createdAt: 'desc' },
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
      select: { id: true, championshipId: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
