import { getAccessToken } from '@/features/auth/lib/auth-storage';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export async function parseApiError(response: Response): Promise<string> {
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

export function authHeaders(): HeadersInit {
  const token = getAccessToken();

  if (!token) {
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export function getFetchErrorMessage(
  error: unknown,
  fallback = 'Não foi possível concluir a operação.',
): string {
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return 'Não foi possível conectar à API. Verifique se o backend está rodando na porta 3001 e se o Docker (MySQL) está ativo.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
