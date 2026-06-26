/** Subset of API Football v3 `/leagues` response used by the mapper. */
export interface ApiFootballLeagueResponse {
  league: {
    id: number;
    name: string;
    type: string;
    logo: string;
  };
  country: {
    name: string;
    flag: string;
  };
  seasons: Array<{
    year: number;
  }>;
}
