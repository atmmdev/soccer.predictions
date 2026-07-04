import {
  BadGatewayException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type {
  ApiFootballCountry,
  ApiFootballFixtureEvent,
  ApiFootballFixtureItem,
  ApiFootballLeagueItem,
  ApiFootballLineupItem,
  ApiFootballResponse,
} from './api-football.types.js';

interface CacheEntry<T> {
  expiresAt: number;
  value: T;
}

const CATALOG_CACHE_TTL_MS = 60 * 60 * 1000;

@Injectable()
export class ApiFootballClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly cache = new Map<string, CacheEntry<unknown>>();

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('API_FOOTBALL_KEY', '');
    this.baseUrl = this.configService.get<string>(
      'API_FOOTBALL_BASE_URL',
      'https://v3.football.api-sports.io',
    );
  }

  assertConfigured(): void {
    if (!this.apiKey) {
      throw new ServiceUnavailableException(
        'API Football não configurada. Defina API_FOOTBALL_KEY no .env da API.',
      );
    }
  }

  async getCountries(): Promise<ApiFootballCountry[]> {
    return this.getCached('countries', () =>
      this.fetchAllPages<ApiFootballCountry>('/countries'),
    );
  }

  async getLeagues(
    country: string,
    season?: number,
  ): Promise<ApiFootballLeagueItem[]> {
    const params: Record<string, string> = { country };

    if (season) {
      params.season = season.toString();
    }

    const cacheKey = `leagues:${country}:${season ?? 'all'}`;

    return this.getCached(cacheKey, () =>
      this.fetchAllPages<ApiFootballLeagueItem>('/leagues', params),
    );
  }

  async getLeagueById(
    leagueId: number,
    season: number,
  ): Promise<ApiFootballLeagueItem | null> {
    const response = await this.request<ApiFootballLeagueItem>('/leagues', {
      id: leagueId.toString(),
      season: season.toString(),
    });

    return response.response[0] ?? null;
  }

  async getFixtures(
    leagueId: number,
    season: number,
  ): Promise<ApiFootballFixtureItem[]> {
    return this.fetchAllPages<ApiFootballFixtureItem>('/fixtures', {
      league: leagueId.toString(),
      season: season.toString(),
    });
  }

  async getFixturesByIds(
    fixtureIds: number[],
  ): Promise<ApiFootballFixtureItem[]> {
    if (fixtureIds.length === 0) {
      return [];
    }

    const chunks: number[][] = [];

    for (let index = 0; index < fixtureIds.length; index += 20) {
      chunks.push(fixtureIds.slice(index, index + 20));
    }

    const results: ApiFootballFixtureItem[] = [];

    for (const chunk of chunks) {
      const response = await this.request<ApiFootballFixtureItem>('/fixtures', {
        ids: chunk.join('-'),
      });

      results.push(...response.response);
    }

    return results;
  }

  async getLineups(fixtureExternalId: number): Promise<ApiFootballLineupItem[]> {
    const response = await this.request<ApiFootballLineupItem>(
      '/fixtures/lineups',
      {
        fixture: fixtureExternalId.toString(),
      },
    );

    return response.response;
  }

  async getFixtureEvents(
    fixtureExternalId: number,
  ): Promise<ApiFootballFixtureEvent[]> {
    const response = await this.request<ApiFootballFixtureEvent>(
      '/fixtures/events',
      {
        fixture: fixtureExternalId.toString(),
      },
    );

    return response.response;
  }

  private async getCached<T>(
    key: string,
    loader: () => Promise<T>,
  ): Promise<T> {
    const cached = this.cache.get(key) as CacheEntry<T> | undefined;

    if (cached && cached.expiresAt > Date.now()) {
      return cached.value;
    }

    const value = await loader();

    this.cache.set(key, {
      value,
      expiresAt: Date.now() + CATALOG_CACHE_TTL_MS,
    });

    return value;
  }

  private async fetchAllPages<T>(
    path: string,
    params: Record<string, string> = {},
  ): Promise<T[]> {
    const items: T[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const response = await this.request<T>(path, {
        ...params,
        page: page.toString(),
      });

      items.push(...response.response);
      totalPages = response.paging?.total ?? 1;
      page += 1;
    } while (page <= totalPages);

    return items;
  }

  private async request<T>(
    path: string,
    params: Record<string, string> = {},
  ): Promise<ApiFootballResponse<T>> {
    this.assertConfigured();

    const url = new URL(`${this.baseUrl}${path}`);

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    const response = await fetch(url, {
      headers: {
        'x-apisports-key': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new BadGatewayException(
        `API Football retornou status ${response.status}`,
      );
    }

    const body = (await response.json()) as ApiFootballResponse<T>;

    if (body.errors && Object.keys(body.errors).length > 0) {
      const message = Object.values(body.errors).join(' ');

      throw new BadGatewayException(
        message || 'Erro ao consultar API Football',
      );
    }

    return body;
  }
}
