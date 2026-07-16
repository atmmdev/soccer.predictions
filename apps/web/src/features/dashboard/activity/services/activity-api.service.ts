import { API_URL, authFetch, parseApiError } from '@/lib/api-client';

import type { ActivityItem } from '../types/activity';

export async function fetchActivityRequest(
  limit?: number,
): Promise<ActivityItem[]> {
  const query =
    limit !== undefined ? `?limit=${encodeURIComponent(String(limit))}` : '';
  const response = await authFetch(`${API_URL}/activity${query}`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<ActivityItem[]>;
}
