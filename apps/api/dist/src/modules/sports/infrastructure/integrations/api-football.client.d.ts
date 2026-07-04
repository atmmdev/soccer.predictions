import { ConfigService } from '@nestjs/config';
import type { ApiFootballCountry, ApiFootballFixtureEvent, ApiFootballFixtureItem, ApiFootballLeagueItem, ApiFootballLineupItem } from './api-football.types.js';
export declare class ApiFootballClient {
    private readonly configService;
    private readonly apiKey;
    private readonly baseUrl;
    private readonly cache;
    constructor(configService: ConfigService);
    assertConfigured(): void;
    getCountries(): Promise<ApiFootballCountry[]>;
    getLeagues(country: string, season?: number): Promise<ApiFootballLeagueItem[]>;
    getLeagueById(leagueId: number, season: number): Promise<ApiFootballLeagueItem | null>;
    getFixtures(leagueId: number, season: number): Promise<ApiFootballFixtureItem[]>;
    getFixturesByIds(fixtureIds: number[]): Promise<ApiFootballFixtureItem[]>;
    getLineups(fixtureExternalId: number): Promise<ApiFootballLineupItem[]>;
    getFixtureEvents(fixtureExternalId: number): Promise<ApiFootballFixtureEvent[]>;
    private getCached;
    private fetchAllPages;
    private request;
}
