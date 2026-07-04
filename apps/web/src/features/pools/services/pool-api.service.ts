import { API_URL, authFetch, parseApiError } from '@/lib/api-client';
import type { AuthUser } from '@/features/auth/types/auth';
import type { PoolScoringConfig } from '@/features/pools/types/scoring-rules';
import type { Championship } from '@/features/championships/types/championship';

export interface PoolResponse {
  id: number;
  name: string;
  championshipId: number;
  championshipName: string;
  championshipType: Championship['type'];
  season: number;
  participantsCount: number;
  predictionsCount: number;
  inviteCode: string;
  status: 'ACTIVE' | 'INACTIVE' | 'CLOSED';
  scoring: PoolScoringConfig;
  ownerId: number;
  isOwner: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePoolResponse {
  pool: PoolResponse;
  user: AuthUser;
}

export async function fetchPoolsRequest(): Promise<PoolResponse[]> {
  const response = await authFetch(`${API_URL}/pools`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<PoolResponse[]>;
}

export async function createPoolRequest(payload: {
  name: string;
  championshipId: number;
  scoring: PoolScoringConfig;
  delegateUserId?: number;
}): Promise<CreatePoolResponse> {
  const response = await authFetch(`${API_URL}/pools`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<CreatePoolResponse>;
}

export async function joinPoolRequest(inviteCode: string): Promise<PoolResponse> {
  const response = await authFetch(`${API_URL}/pools/join`, {
    method: 'POST',
    body: JSON.stringify({ inviteCode }),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<PoolResponse>;
}
