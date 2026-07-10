import { Injectable } from '@nestjs/common';

import { ApiFootballClient } from '../../infrastructure/integrations/api-football.client.js';

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

@Injectable()
export class CatalogService {
  constructor(private readonly apiFootballClient: ApiFootballClient) {}

  async listCountries(): Promise<CatalogCountry[]> {
    const countries = await this.apiFootballClient.getCountries();

    return countries
      .map(country => ({
        name: country.name,
        code: country.code ?? '',
        flag: country.flag ?? '',
      }))
      .filter(country => country.name.length > 0)
      .sort((left, right) => left.name.localeCompare(right.name));
  }

  async listLeagues(
    country: string,
    season?: number,
  ): Promise<CatalogLeague[]> {
    const leagues = await this.apiFootballClient.getLeagues(country, season);

    return leagues
      .map(item => ({
        leagueId: item.league.id,
        name: item.league.name,
        type:
          item.league.type.toLowerCase() === 'cup'
            ? ('CUP' as const)
            : ('LEAGUE' as const),
        country: item.country.name,
        code: item.country.code ?? '',
        flag: item.country.flag ?? '',
        seasons: item.seasons
          .map(entry => entry.year)
          .sort((left, right) => right - left),
      }))
      .sort((left, right) => left.name.localeCompare(right.name));
  }
}
