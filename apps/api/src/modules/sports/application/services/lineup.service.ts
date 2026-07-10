import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import { ApiFootballClient } from '../../infrastructure/integrations/api-football.client.js';
import { getTeamLogoPublicUrl } from '../utils/team-logo-url.js';

export interface FixtureLineupResponse {
  home: {
    team: {
      id: number;
      name: string;
      flag: string;
    };
    players: Array<{
      id: number;
      name: string;
      teamId: number;
    }>;
  };
  away: {
    team: {
      id: number;
      name: string;
      flag: string;
    };
    players: Array<{
      id: number;
      name: string;
      teamId: number;
    }>;
  };
}

@Injectable()
export class LineupService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly apiFootballClient: ApiFootballClient,
  ) {}

  async getFixtureLineup(fixtureId: number): Promise<FixtureLineupResponse> {
    const fixture = await this.prisma.fixture.findUnique({
      where: { id: fixtureId },
      include: {
        homeTeam: true,
        awayTeam: true,
      },
    });

    if (!fixture) {
      throw new NotFoundException('Jogo não encontrado');
    }

    const lineups = await this.apiFootballClient.getLineups(fixture.externalId);

    if (lineups.length < 2) {
      throw new NotFoundException('Escalação indisponível para este jogo');
    }

    const homeLineup =
      lineups.find(item => item.team.id === fixture.homeTeam.externalId) ??
      lineups[0];
    const awayLineup =
      lineups.find(item => item.team.id === fixture.awayTeam.externalId) ??
      lineups[1];

    return {
      home: this.mapSide(homeLineup, fixture.homeTeam.externalId),
      away: this.mapSide(awayLineup, fixture.awayTeam.externalId),
    };
  }

  private mapSide(
    lineup: {
      team: { id: number; name: string; logo: string };
      startXI: Array<{ player: { id: number; name: string } }>;
      substitutes: Array<{ player: { id: number; name: string } }>;
    },
    teamExternalId: number,
  ): FixtureLineupResponse['home'] {
    const players = [...lineup.startXI, ...lineup.substitutes].map(entry => ({
      id: entry.player.id,
      name: entry.player.name,
      teamId: teamExternalId,
    }));

    return {
      team: {
        id: teamExternalId,
        name: lineup.team.name,
        flag: getTeamLogoPublicUrl(teamExternalId),
      },
      players,
    };
  }
}
