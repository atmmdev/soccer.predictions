import type { AuthUser } from '@/features/auth/types/auth';
import type { PoolScoringConfig } from '@/features/pools/types/scoring-rules';

import { getAccessToken } from '@/features/auth/lib/auth-storage';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export interface PoolResponse {
  id: number;
  name: string;
  championshipId: number;
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

async function parseError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { message?: string | string[] };

    if (Array.isArray(body.message)) {
      return body.message[0] ?? 'Não foi possível concluir a operação';
    }

    if (body.message) {
      return body.message;
    }
  } catch {
    // ignore parse errors
  }

  return 'Não foi possível concluir a operação';
}

function authHeaders(): HeadersInit {
  const token = getAccessToken();

  if (!token) {
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export async function fetchPoolsRequest(): Promise<PoolResponse[]> {
  const response = await fetch(`${API_URL}/pools`, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json() as Promise<PoolResponse[]>;
}

export async function createPoolRequest(payload: {
  name: string;
  championshipId: number;
  scoring: PoolScoringConfig;
}): Promise<CreatePoolResponse> {
  const response = await fetch(`${API_URL}/pools`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json() as Promise<CreatePoolResponse>;
}

export async function joinPoolRequest(inviteCode: string): Promise<PoolResponse> {
  const response = await fetch(`${API_URL}/pools/join`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ inviteCode }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json() as Promise<PoolResponse>;
}
