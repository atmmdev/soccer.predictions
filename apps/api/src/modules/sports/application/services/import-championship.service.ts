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
import { mapStageToCupPhase } from '../utils/cup-phase.mapper.js';
import { mapFootballDataFixtureStatus } from '../utils/fixture-status.mapper.js';
import type { ImportChampionshipDto } from '../dtos/import-championship.dto.js';
import { FootballDataClient } from '../../infrastructure/integrations/football-data.client.js';
import type { FootballDataMatch } from '../../infrastructure/integrations/football-data.types.js';

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

const IMPORT_TRANSACTION_TIMEOUT_MS = 120_000;

@Injectable()
export class ImportChampionshipService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly footballDataClient: FootballDataClient,
  ) {}

  async import(dto: ImportChampionshipDto): Promise<ChampionshipListItem> {
    const competition = await this.footballDataClient.getCompetition(
      dto.leagueId,
    );

    if (!competition) {
      throw new NotFoundException(
        'Competição ou temporada não encontrada na Football Data API',
      );
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

    const matches = await this.footballDataClient.getCompetitionMatches(
      dto.leagueId,
      dto.season,
    );

    if (matches.length === 0) {
      throw new NotFoundException(
        'Nenhum jogo encontrado para esta competição e temporada',
      );
    }

    const championshipType: ChampionshipType =
      competition.type?.toUpperCase() === 'CUP' ? 'CUP' : 'LEAGUE';
    const currentYear = new Date().getFullYear();
    const isCurrentSeason = dto.season === currentYear;
    const status = dto.active ? 'ACTIVE' : 'INACTIVE';
    const countryName = competition.area?.name ?? '';
    const countryFlag = competition.area?.flag ?? competition.emblem ?? '';

    const championship = await this.prisma.$transaction(
      async tx => {
        const league = await tx.league.upsert({
          where: { externalId: dto.leagueId },
          update: {
            name: competition.name,
            country: countryName,
            type: competition.type ?? undefined,
          },
          create: {
            externalId: dto.leagueId,
            name: competition.name,
            country: countryName,
            type: competition.type ?? undefined,
          },
        });

        const createdChampionship = await tx.championship.create({
          data: {
            leagueId: league.id,
            season: dto.season,
            name: competition.name,
            country: countryName,
            flags: countryFlag,
            type: championshipType,
            status,
            isCurrentSeason,
            allowNewPools: isCurrentSeason && status === 'ACTIVE',
          },
        });

        await this.persistFixtures(tx, createdChampionship.id, matches);

        return createdChampionship;
      },
      {
        maxWait: 10_000,
        timeout: IMPORT_TRANSACTION_TIMEOUT_MS,
      },
    );

    return this.toListItem(championship);
  }

  private async persistFixtures(
    tx: Prisma.TransactionClient,
    championshipId: number,
    matches: FootballDataMatch[],
  ): Promise<void> {
    const teamsByExternalId = new Map<
      number,
      { externalId: number; name: string; logo: string }
    >();

    for (const match of matches) {
      if (match.homeTeam?.id) {
        teamsByExternalId.set(match.homeTeam.id, {
          externalId: match.homeTeam.id,
          name: match.homeTeam.name,
          logo: match.homeTeam.crest ?? '',
        });
      }

      if (match.awayTeam?.id) {
        teamsByExternalId.set(match.awayTeam.id, {
          externalId: match.awayTeam.id,
          name: match.awayTeam.name,
          logo: match.awayTeam.crest ?? '',
        });
      }
    }

    const teamIdByExternalId = new Map<number, number>();

    for (const team of teamsByExternalId.values()) {
      const upserted = await tx.team.upsert({
        where: { externalId: team.externalId },
        update: {
          name: team.name,
          logo: team.logo,
        },
        create: {
          externalId: team.externalId,
          name: team.name,
          logo: team.logo,
        },
      });

      teamIdByExternalId.set(team.externalId, upserted.id);
    }

    for (const match of matches) {
      const homeTeamId = teamIdByExternalId.get(match.homeTeam.id);
      const awayTeamId = teamIdByExternalId.get(match.awayTeam.id);

      if (!homeTeamId || !awayTeamId) {
        continue;
      }

      const status = mapFootballDataFixtureStatus(match.status);

      await tx.fixture.upsert({
        where: { externalId: match.id },
        update: {
          championshipId,
          homeTeamId,
          awayTeamId,
          date: new Date(match.utcDate),
          status,
          homeScore: match.score.fullTime.home,
          awayScore: match.score.fullTime.away,
          round: match.matchday,
          phase: mapStageToCupPhase(match.stage),
        },
        create: {
          externalId: match.id,
          championshipId,
          homeTeamId,
          awayTeamId,
          date: new Date(match.utcDate),
          status,
          homeScore: match.score.fullTime.home,
          awayScore: match.score.fullTime.away,
          round: match.matchday,
          phase: mapStageToCupPhase(match.stage),
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
