import { API_URL, authFetch, parseApiError } from '@/lib/api-client';

import type { Championship } from '../types/championship';

export async function fetchActiveChampionshipsRequest(): Promise<Championship[]> {
  const response = await authFetch(`${API_URL}/championships`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<Championship[]>;
}
