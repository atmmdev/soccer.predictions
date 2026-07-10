import { Injectable } from '@nestjs/common';

import { FootballDataClient } from '../../infrastructure/integrations/football-data.client.js';
import type { FootballDataCompetition } from '../../infrastructure/integrations/football-data.types.js';

export interface CatalogCountry {
  name: string;
  code: string;
  flag: string;
}

export interface CatalogLeague {
  leagueId: number;
  name: string;
  type: 'LEAGUE' | 'CUP';
  country: string;
  code: string;
  flag: string;
  seasons: number[];
}

function seasonYear(startDate: string | null | undefined): number | null {
  if (!startDate) {
    return null;
  }

  const year = Number.parseInt(startDate.slice(0, 4), 10);
  return Number.isFinite(year) ? year : null;
}

function competitionSeasons(competition: FootballDataCompetition): number[] {
  const years = new Set<number>();

  for (const season of competition.seasons ?? []) {
    const year = seasonYear(season.startDate);
    if (year) {
      years.add(year);
    }
  }

  const current = seasonYear(competition.currentSeason?.startDate);
  if (current) {
    years.add(current);
  }

  if (years.size === 0) {
    years.add(new Date().getFullYear());
  }

  return [...years].sort((left, right) => right - left);
}

function mapCompetitionType(
  type: string | null | undefined,
): 'LEAGUE' | 'CUP' {
  return type?.toUpperCase() === 'CUP' ? 'CUP' : 'LEAGUE';
}

@Injectable()
export class CatalogService {
  constructor(private readonly footballDataClient: FootballDataClient) {}

  async listCountries(): Promise<CatalogCountry[]> {
    const competitions = await this.footballDataClient.listCompetitions();
    const byName = new Map<string, CatalogCountry>();

    for (const competition of competitions) {
      const name = competition.area?.name?.trim();
      if (!name) {
        continue;
      }

      if (!byName.has(name)) {
        byName.set(name, {
          name,
          code: competition.area?.code ?? '',
          flag: competition.area?.flag ?? '',
        });
      }
    }

    return [...byName.values()].sort((left, right) =>
      left.name.localeCompare(right.name),
    );
  }

  async listLeagues(
    country: string,
    season?: number,
  ): Promise<CatalogLeague[]> {
    const competitions = await this.footballDataClient.listCompetitions();

    return competitions
      .filter(competition => competition.area?.name === country)
      .map(competition => {
        const seasons = competitionSeasons(competition).filter(year =>
          season ? year === season : true,
        );

        return {
          leagueId: competition.id,
          name: competition.name,
          type: mapCompetitionType(competition.type),
          country: competition.area?.name ?? country,
          code: competition.area?.code ?? '',
          flag: competition.area?.flag ?? competition.emblem ?? '',
          seasons:
            seasons.length > 0
              ? seasons
              : competitionSeasons(competition),
        };
      })
      .filter(league => league.seasons.length > 0)
      .sort((left, right) => left.name.localeCompare(right.name));
  }
}
