import { API_URL, authHeaders, parseApiError } from '@/lib/api-client';

import type { RankingEntry } from '../types/ranking-entry';

export async function fetchRankingsRequest(
  poolId?: number,
): Promise<RankingEntry[]> {
  const query = poolId ? `?poolId=${poolId}` : '';
  const response = await fetch(`${API_URL}/rankings${query}`, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<RankingEntry[]>;
}
