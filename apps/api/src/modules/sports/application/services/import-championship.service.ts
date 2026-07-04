import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type {
  ChampionshipType,
  Prisma,
} from '../../../../../generated/prisma/client.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import {
  mapApiFootballFixtureStatus,
  parseFixtureRound,
} from '../utils/fixture-status.mapper.js';
import type { ImportChampionshipDto } from '../dtos/import-championship.dto.js';
import { ApiFootballClient } from '../../infrastructure/integrations/api-football.client.js';
import type { ApiFootballFixtureItem } from '../../infrastructure/integrations/api-football.types.js';

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
export class ImportChampionshipService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly apiFootballClient: ApiFootballClient,
  ) {}

  async import(dto: ImportChampionshipDto): Promise<ChampionshipListItem> {
    const leagueData = await this.apiFootballClient.getLeagueById(
      dto.leagueId,
      dto.season,
    );

    if (!leagueData) {
      throw new NotFoundException('Liga ou temporada não encontrada na API Football');
    }

    const existingLeague = await this.prisma.league.findUnique({
      where: { externalId: dto.leagueId },
      include: {
        championships: {
          where: { season: dto.season },
        },
      },
    });

    if (existingLeague?.championships.length) {
      throw new ConflictException(
        'Este campeonato já foi importado para a temporada selecionada',
      );
    }

    const fixtures = await this.apiFootballClient.getFixtures(
      dto.leagueId,
      dto.season,
    );

    if (fixtures.length === 0) {
      throw new NotFoundException(
        'Nenhum jogo encontrado para esta liga e temporada',
      );
    }

    const championshipType: ChampionshipType =
      leagueData.league.type.toLowerCase() === 'cup' ? 'CUP' : 'LEAGUE';
    const currentYear = new Date().getFullYear();
    const isCurrentSeason = dto.season === currentYear;
    const status = dto.active ? 'ACTIVE' : 'INACTIVE';

    const championship = await this.prisma.$transaction(async tx => {
      const league = await tx.league.upsert({
        where: { externalId: dto.leagueId },
        update: {
          name: leagueData.league.name,
          country: leagueData.country.name,
          type: leagueData.league.type,
        },
        create: {
          externalId: dto.leagueId,
          name: leagueData.league.name,
          country: leagueData.country.name,
          type: leagueData.league.type,
        },
      });

      const createdChampionship = await tx.championship.create({
        data: {
          leagueId: league.id,
          season: dto.season,
          name: leagueData.league.name,
          country: leagueData.country.name,
          flags: leagueData.country.flag ?? '',
          type: championshipType,
          status,
          isCurrentSeason,
          allowNewPools: isCurrentSeason && status === 'ACTIVE',
        },
      });

      await this.persistFixtures(tx, createdChampionship.id, fixtures);

      return createdChampionship;
    });

    return this.toListItem(championship);
  }

  private async persistFixtures(
    tx: Prisma.TransactionClient,
    championshipId: number,
    fixtures: ApiFootballFixtureItem[],
  ): Promise<void> {
    for (const item of fixtures) {
      const homeTeam = await tx.team.upsert({
        where: { externalId: item.teams.home.id },
        update: {
          name: item.teams.home.name,
          logo: item.teams.home.logo,
        },
        create: {
          externalId: item.teams.home.id,
          name: item.teams.home.name,
          logo: item.teams.home.logo,
        },
      });

      const awayTeam = await tx.team.upsert({
        where: { externalId: item.teams.away.id },
        update: {
          name: item.teams.away.name,
          logo: item.teams.away.logo,
        },
        create: {
          externalId: item.teams.away.id,
          name: item.teams.away.name,
          logo: item.teams.away.logo,
        },
      });

      const status = mapApiFootballFixtureStatus(item.fixture.status.short);

      await tx.fixture.upsert({
        where: { externalId: item.fixture.id },
        update: {
          championshipId,
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          date: new Date(item.fixture.date),
          status,
          homeScore: item.goals.home,
          awayScore: item.goals.away,
          round: parseFixtureRound(item.league.round),
        },
        create: {
          externalId: item.fixture.id,
          championshipId,
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          date: new Date(item.fixture.date),
          status,
          homeScore: item.goals.home,
          awayScore: item.goals.away,
          round: parseFixtureRound(item.league.round),
        },
      });
    }
  }

  private toListItem(championship: {
    id: number;
    leagueId: number;
    season: number;
    name: string;
    country: string;
    flags: string;
    type: ChampionshipType;
    status: 'ACTIVE' | 'INACTIVE';
  }): ChampionshipListItem {
    return {
      id: championship.id,
      leagueId: championship.leagueId,
      season: championship.season,
      name: championship.name,
      country: championship.country,
      flags: championship.flags,
      type: championship.type,
      status: championship.status,
    };
  }
}
