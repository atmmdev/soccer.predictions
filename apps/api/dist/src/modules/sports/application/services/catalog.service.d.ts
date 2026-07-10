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
export declare class CatalogService {
    private readonly apiFootballClient;
    constructor(apiFootballClient: ApiFootballClient);
    listCountries(): Promise<CatalogCountry[]>;
    listLeagues(country: string, season?: number): Promise<CatalogLeague[]>;
}
