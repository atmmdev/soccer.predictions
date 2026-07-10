import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type { ChampionshipType } from '../../../../../generated/prisma/client.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';

export interface ChampionshipListItem {
  id: number;
  leagueId: number;
  season: number;
  name: string;
  country: string;
  flags: string;
  type: ChampionshipType;
  status: 'ACTIVE' | 'INACTIVE';
}

@Injectable()
export class ChampionshipService {
  constructor(private readonly prisma: PrismaService) {}

  listAll(): Promise<ChampionshipListItem[]> {
    return this.prisma.championship
      .findMany({
        orderBy: [{ season: 'desc' }, { name: 'asc' }],
        select: {
          id: true,
          leagueId: true,
          season: true,
          name: true,
          country: true,
          flags: true,
          type: true,
          status: true,
        },
      })
      .then(rows => rows.map(row => ({ ...row })));
  }

  listActive(): Promise<ChampionshipListItem[]> {
    return this.prisma.championship
      .findMany({
        where: {
          status: 'ACTIVE',
          allowNewPools: true,
        },
        orderBy: [{ season: 'desc' }, { name: 'asc' }],
        select: {
          id: true,
          leagueId: true,
          season: true,
          name: true,
          country: true,
          flags: true,
          type: true,
          status: true,
        },
      })
      .then(rows => rows.map(row => ({ ...row })));
  }

  async updateStatus(
    championshipId: number,
    active: boolean,
  ): Promise<ChampionshipListItem> {
    const championship = await this.prisma.championship.findUnique({
      where: { id: championshipId },
      select: {
        id: true,
        leagueId: true,
        season: true,
        name: true,
        country: true,
        flags: true,
        type: true,
        status: true,
      },
    });

    if (!championship) {
      throw new NotFoundException('Campeonato não encontrado');
    }

    const status = active ? 'ACTIVE' : 'INACTIVE';

    if (championship.status === status) {
      return championship;
    }

    const isCurrentSeason = championship.season === new Date().getFullYear();

    return this.prisma.championship.update({
      where: { id: championshipId },
      data: {
        status,
        isCurrentSeason,
        allowNewPools: active && isCurrentSeason,
      },
      select: {
        id: true,
        leagueId: true,
        season: true,
        name: true,
        country: true,
        flags: true,
        type: true,
        status: true,
      },
    });
  }
}
