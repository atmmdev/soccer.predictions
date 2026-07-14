import { API_URL, authFetch, parseApiError } from '@/lib/api-client';

import type { PoolParticipant } from '../types/participant';

export async function fetchParticipantsRequest(): Promise<PoolParticipant[]> {
  const response = await authFetch(`${API_URL}/participants`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<PoolParticipant[]>;
}

export async function approveParticipantRequest(
  poolId: number,
  userId: number,
): Promise<{ userId: number; status: string }> {
  const response = await authFetch(
    `${API_URL}/pools/${poolId}/members/${userId}/approve`,
    { method: 'POST' },
  );

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<{ userId: number; status: string }>;
}

export async function rejectParticipantRequest(
  poolId: number,
  userId: number,
): Promise<{ userId: number; status: string }> {
  const response = await authFetch(
    `${API_URL}/pools/${poolId}/members/${userId}/reject`,
    { method: 'POST' },
  );

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<{ userId: number; status: string }>;
}
