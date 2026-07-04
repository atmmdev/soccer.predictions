import { API_URL, authFetch, parseApiError } from '@/lib/api-client';

import type { MatchFixtureItem } from '../types/match-fixture';

export async function fetchFixturesRequest(): Promise<MatchFixtureItem[]> {
  const response = await authFetch(`${API_URL}/fixtures`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<MatchFixtureItem[]>;
}
