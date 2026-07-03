import { API_URL, authHeaders, parseApiError } from '@/lib/api-client';

export interface PoolDelegateCandidate {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'PARTICIPANT';
}

export async function fetchPoolDelegatesRequest(): Promise<
  PoolDelegateCandidate[]
> {
  const response = await fetch(`${API_URL}/users/pool-delegates`, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<PoolDelegateCandidate[]>;
}
