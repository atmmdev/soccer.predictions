import { API_URL, authFetch, parseApiError } from '@/lib/api-client';

import type { RankingContext, RankingEntry } from '../types/ranking-entry';

export async function fetchRankingsRequest(options?: {
  poolId?: number;
  round?: number;
}): Promise<RankingEntry[]> {
  const params = new URLSearchParams();

  if (options?.poolId !== undefined) {
    params.set('poolId', String(options.poolId));
  }

  if (options?.round !== undefined) {
    params.set('round', String(options.round));
  }

  const query = params.toString();
  const response = await authFetch(
    `${API_URL}/rankings${query ? `?${query}` : ''}`,
  );

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<RankingEntry[]>;
}

export async function fetchRankingContextRequest(
  poolId: number,
): Promise<RankingContext> {
  const response = await authFetch(
    `${API_URL}/rankings/context?poolId=${poolId}`,
  );

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<RankingContext>;
}
