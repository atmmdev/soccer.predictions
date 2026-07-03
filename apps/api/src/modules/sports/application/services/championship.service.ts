import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../shared/prisma/prisma.service.js';

@Injectable()
export class ChampionshipService {
  constructor(private readonly prisma: PrismaService) {}

  listActive() {
    return this.prisma.championship.findMany({
      where: {
        status: 'ACTIVE',
        allowNewPools: true,
      },
      orderBy: [{ season: 'desc' }, { name: 'asc' }],
      select: {
        id: true,
        leagueId: true,
        name: true,
        country: true,
        flags: true,
        type: true,
        season: true,
        status: true,
      },
    });
  }
}
