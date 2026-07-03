import { API_URL, authHeaders, parseApiError } from '@/lib/api-client';

import type { MatchFixtureItem } from '../types/match-fixture';

export async function fetchFixturesRequest(): Promise<MatchFixtureItem[]> {
  const response = await fetch(`${API_URL}/fixtures`, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<MatchFixtureItem[]>;
}
