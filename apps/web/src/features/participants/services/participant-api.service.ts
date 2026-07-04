import { API_URL, authFetch, parseApiError } from '@/lib/api-client';

import type { PoolParticipant } from '../types/participant';

export async function fetchParticipantsRequest(): Promise<PoolParticipant[]> {
  const response = await authFetch(`${API_URL}/participants`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<PoolParticipant[]>;
}
