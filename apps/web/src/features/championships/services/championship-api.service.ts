import { API_URL, authHeaders, parseApiError } from '@/lib/api-client';

import type { Championship } from '../types/championship';

export async function fetchActiveChampionshipsRequest(): Promise<Championship[]> {
  const response = await fetch(`${API_URL}/championships`, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<Championship[]>;
}
