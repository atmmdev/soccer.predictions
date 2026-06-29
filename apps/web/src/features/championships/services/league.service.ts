import { leagues } from '../mocks/leagues';
import type { League } from '../types/league';

export function filterLeaguesByCountry(country: string): League[] {
  if (!country) {
    return [];
  }

  return leagues.filter(league => league.country === country);
}

export function findLeagueById(leagueId: number): League | undefined {
  return leagues.find(league => league.id === leagueId);
}
