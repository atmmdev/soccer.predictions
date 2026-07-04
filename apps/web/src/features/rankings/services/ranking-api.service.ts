import { API_URL, authFetch, parseApiError } from '@/lib/api-client';

import type { RankingEntry } from '../types/ranking-entry';

export async function fetchRankingsRequest(
  poolId?: number,
): Promise<RankingEntry[]> {
  const query = poolId ? `?poolId=${poolId}` : '';
  const response = await authFetch(`${API_URL}/rankings${query}`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<RankingEntry[]>;
}
