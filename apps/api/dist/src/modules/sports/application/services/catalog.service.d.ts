import { FootballDataClient } from '../../infrastructure/integrations/football-data.client.js';
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
export declare class CatalogService {
    private readonly footballDataClient;
    constructor(footballDataClient: FootballDataClient);
    listCountries(): Promise<CatalogCountry[]>;
    listLeagues(country: string, season?: number): Promise<CatalogLeague[]>;
}
