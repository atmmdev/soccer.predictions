import { Injectable } from '@nestjs/common';
import type { FixtureStatus } from '../../../../../generated/prisma/client.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';

export interface FixtureListItem {
  id: number;
  championshipName: string;
  round: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED';
  officialHomeScore: number | null;
  officialAwayScore: number | null;
}

@Injectable()
export class FixtureService {
  constructor(private readonly prisma: PrismaService) {}

  async listForUser(user: AuthUser): Promise<FixtureListItem[]> {
    const championshipIds = await this.resolveAccessibleChampionshipIds(user);

    if (championshipIds.length === 0) {
      return [];
    }

    const fixtures = await this.prisma.fixture.findMany({
      where: {
        championshipId: { in: championshipIds },
        status: { in: ['SCHEDULED', 'LIVE', 'FINISHED'] },
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        championship: true,
      },
      orderBy: { date: 'asc' },
    });

    return fixtures.map(fixture => ({
      id: fixture.id,
      championshipName: fixture.championship.name,
      round: fixture.round ?? 0,
      homeTeam: fixture.homeTeam.name,
      awayTeam: fixture.awayTeam.name,
      date: fixture.date.toISOString(),
      status: this.toMatchStatus(fixture.status),
      officialHomeScore: fixture.homeScore,
      officialAwayScore: fixture.awayScore,
    }));
  }

  private async resolveAccessibleChampionshipIds(
    user: AuthUser,
  ): Promise<number[]> {
    if (user.role === 'SUPER_ADMIN') {
      const championships = await this.prisma.championship.findMany({
        select: { id: true },
      });

      return championships.map(championship => championship.id);
    }

    const pools = await this.prisma.pool.findMany({
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
      select: { championshipId: true },
    });

    return [...new Set(pools.map(pool => pool.championshipId))];
  }

  private toMatchStatus(
    status: FixtureStatus,
  ): 'SCHEDULED' | 'LIVE' | 'FINISHED' {
    if (status === 'LIVE') {
      return 'LIVE';
    }

    if (status === 'FINISHED') {
      return 'FINISHED';
    }

    return 'SCHEDULED';
  }
}
