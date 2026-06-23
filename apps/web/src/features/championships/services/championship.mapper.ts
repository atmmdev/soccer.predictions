import { Championship } from "../types/championship";

export function toChampionship(
  response: ApiFootballLeagueResponse,
): Championship {
  return {
    id: crypto.randomUUID(),
    leagueId: response.league.id,
    season: response.seasons[0].year,
    name: response.league.name,
    country: response.country.name,
    logoUrl: response.league.logo,
    flags: response.country.flag,
    type: response.league.type as 'LEAGUE' | 'CUP',
    status: 'ACTIVE',
  }
}
