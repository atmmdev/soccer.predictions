import { API_URL, authFetch, parseApiError } from '@/lib/api-client';
import type { AuthUser } from '@/features/auth/types/auth';
import type { PoolScoringConfig } from '@/features/pools/types/scoring-rules';
import type { Championship } from '@/features/championships/types/championship';
import type { DiscoverMembershipStatus } from '../types/pool';

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

export interface DiscoverablePoolResponse {
  id: number;
  name: string;
  championshipName: string;
  championshipType: Championship['type'];
  season: number;
  participantsCount: number;
  ownerId: number;
  ownerName: string;
  status: 'ACTIVE' | 'INACTIVE' | 'CLOSED';
  membershipStatus: DiscoverMembershipStatus;
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

export async function fetchDiscoverablePoolsRequest(): Promise<
  DiscoverablePoolResponse[]
> {
  const response = await authFetch(`${API_URL}/pools/discover`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<DiscoverablePoolResponse[]>;
}

export async function requestPoolAccessRequest(
  poolId: number,
): Promise<DiscoverablePoolResponse> {
  const response = await authFetch(
    `${API_URL}/pools/${poolId}/request-access`,
    { method: 'POST' },
  );

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<DiscoverablePoolResponse>;
}

export async function approvePoolMemberRequest(
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

export async function rejectPoolMemberRequest(
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

export async function updatePoolStatusRequest(
  poolId: number,
  status: PoolResponse['status'],
): Promise<PoolResponse> {
  const response = await authFetch(`${API_URL}/pools/${poolId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<PoolResponse>;
}
