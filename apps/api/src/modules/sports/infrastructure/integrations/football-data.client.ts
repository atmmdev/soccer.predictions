import {
  BadGatewayException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type {
  FootballDataCompetition,
  FootballDataCompetitionsResponse,
  FootballDataMatch,
  FootballDataMatchesResponse,
} from './football-data.types.js';

interface CacheEntry<T> {
  expiresAt: number;
  value: T;
}

const CATALOG_CACHE_TTL_MS = 60 * 60 * 1000;
const MIN_REQUEST_INTERVAL_MS = 6_500;

@Injectable()
export class FootballDataClient {
  private readonly token: string;
  private readonly baseUrl: string;
  private readonly cache = new Map<string, CacheEntry<unknown>>();
  private lastRequestAt = 0;
  private requestQueue: Promise<void> = Promise.resolve();

  constructor(private readonly configService: ConfigService) {
    this.token = this.configService.get<string>('FOOTBALL_DATA_TOKEN', '');
    this.baseUrl = this.configService.get<string>(
      'FOOTBALL_DATA_BASE_URL',
      'https://api.football-data.org/v4',
    );
  }

  assertConfigured(): void {
    if (!this.token) {
      throw new ServiceUnavailableException(
        'Football Data não configurada. Defina FOOTBALL_DATA_TOKEN no .env da API.',
      );
    }
  }

  async listCompetitions(): Promise<FootballDataCompetition[]> {
    return this.getCached('competitions', async () => {
      const response =
        await this.request<FootballDataCompetitionsResponse>('/competitions');
      return response.competitions ?? [];
    });
  }

  async getCompetition(
    competitionIdOrCode: number | string,
  ): Promise<FootballDataCompetition> {
    return this.request<FootballDataCompetition>(
      `/competitions/${competitionIdOrCode}`,
    );
  }

  async getCompetitionMatches(
    competitionIdOrCode: number | string,
    season?: number,
  ): Promise<FootballDataMatch[]> {
    const params: Record<string, string> = {};

    if (season) {
      params.season = season.toString();
    }

    const response = await this.request<FootballDataMatchesResponse>(
      `/competitions/${competitionIdOrCode}/matches`,
      params,
    );

    return response.matches ?? [];
  }

  async getMatches(params: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    competitions?: string;
  }): Promise<FootballDataMatch[]> {
    const query: Record<string, string> = {};

    if (params.status) {
      query.status = params.status;
    }

    if (params.dateFrom) {
      query.dateFrom = params.dateFrom;
    }

    if (params.dateTo) {
      query.dateTo = params.dateTo;
    }

    if (params.competitions) {
      query.competitions = params.competitions;
    }

    const response = await this.request<FootballDataMatchesResponse>(
      '/matches',
      query,
    );

    return response.matches ?? [];
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

  private async request<T>(
    path: string,
    params: Record<string, string> = {},
  ): Promise<T> {
    this.assertConfigured();

    const url = new URL(`${this.baseUrl}${path}`);

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    return this.enqueue(async () => {
      let response: Response;

      try {
        response = await fetch(url, {
          headers: {
            'X-Auth-Token': this.token,
          },
        });
      } catch (error) {
        const detail =
          error instanceof Error ? error.message : 'falha de rede desconhecida';

        throw new BadGatewayException(
          `Não foi possível conectar à Football Data API: (${detail}).`,
        );
      }

      if (!response.ok) {
        let detail = `status ${response.status}`;

        try {
          const body = (await response.json()) as {
            message?: string;
            errorCode?: number;
          };
          if (body.message) {
            detail = body.message;
          }
        } catch {
          // ignore parse errors
        }

        throw new BadGatewayException(
          `Football Data API retornou erro: ${detail}`,
        );
      }

      return (await response.json()) as T;
    });
  }

  private enqueue<T>(task: () => Promise<T>): Promise<T> {
    const run = this.requestQueue.then(async () => {
      const waitMs = Math.max(
        0,
        MIN_REQUEST_INTERVAL_MS - (Date.now() - this.lastRequestAt),
      );

      if (waitMs > 0) {
        await new Promise(resolve => setTimeout(resolve, waitMs));
      }

      this.lastRequestAt = Date.now();
      return task();
    });

    this.requestQueue = run.then(
      () => undefined,
      () => undefined,
    );

    return run;
  }
}
