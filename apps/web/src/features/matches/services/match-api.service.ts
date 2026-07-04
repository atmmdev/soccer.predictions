import { API_URL, authFetch, parseApiError } from '@/lib/api-client';

import type { FixtureLineup } from '@/features/predictions/types/fixture-lineup';

import type { MatchFixtureItem } from '../types/match-fixture';

export async function fetchFixturesRequest(): Promise<MatchFixtureItem[]> {
  const response = await authFetch(`${API_URL}/fixtures`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<MatchFixtureItem[]>;
}

export async function fetchFixtureLineupRequest(
  fixtureId: number,
): Promise<FixtureLineup> {
  const response = await authFetch(`${API_URL}/fixtures/${fixtureId}/lineup`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<FixtureLineup>;
}
