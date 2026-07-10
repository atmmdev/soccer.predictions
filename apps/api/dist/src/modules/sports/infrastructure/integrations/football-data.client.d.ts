import { ConfigService } from '@nestjs/config';
import type { FootballDataCompetition, FootballDataMatch } from './football-data.types.js';
export declare class FootballDataClient {
    private readonly configService;
    private readonly token;
    private readonly baseUrl;
    private readonly cache;
    private lastRequestAt;
    private requestQueue;
    constructor(configService: ConfigService);
    assertConfigured(): void;
    listCompetitions(): Promise<FootballDataCompetition[]>;
    getCompetition(competitionIdOrCode: number | string): Promise<FootballDataCompetition>;
    getCompetitionMatches(competitionIdOrCode: number | string, season?: number): Promise<FootballDataMatch[]>;
    getMatches(params: {
        status?: string;
        dateFrom?: string;
        dateTo?: string;
        competitions?: string;
    }): Promise<FootballDataMatch[]>;
    private getCached;
    private request;
    private enqueue;
}
