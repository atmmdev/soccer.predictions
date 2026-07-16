import type { AuthResponse } from '../types/auth';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export class AuthApiError extends Error {
  readonly code?: string;
  readonly status: number;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'AuthApiError';
    this.status = status;
    this.code = code;
  }
}

async function parseError(response: Response): Promise<AuthApiError> {
  try {
    const body = (await response.json()) as {
      message?: string | string[] | { code?: string; message?: string };
      code?: string;
      error?: string;
    };

    if (typeof body.code === 'string' && typeof body.message === 'string') {
      return new AuthApiError(body.message, response.status, body.code);
    }

    if (
      body.message &&
      typeof body.message === 'object' &&
      !Array.isArray(body.message)
    ) {
      const nested = body.message;
      return new AuthApiError(
        nested.message ?? 'Não foi possível concluir a operação',
        response.status,
        nested.code ?? body.code,
      );
    }

    if (Array.isArray(body.message)) {
      return new AuthApiError(
        body.message[0] ?? 'Não foi possível concluir a operação',
        response.status,
        body.code,
      );
    }

    if (typeof body.message === 'string') {
      return new AuthApiError(body.message, response.status, body.code);
    }
  } catch {
    // ignore parse errors
  }

  return new AuthApiError(
    'Não foi possível concluir a operação',
    response.status,
  );
}

export type RegisterResponse =
  | AuthResponse
  | {
      message: string;
      requiresEmailVerification: true;
      email: string;
    };

export async function loginRequest(payload: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return response.json() as Promise<AuthResponse>;
}

export async function registerRequest(payload: {
  name: string;
  email: string;
  password: string;
}): Promise<RegisterResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return response.json() as Promise<RegisterResponse>;
}

export async function fetchMeRequest(accessToken: string): Promise<AuthResponse['user']> {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  const body = (await response.json()) as { user: AuthResponse['user'] };

  return body.user;
}

export async function updateProfileRequest(
  accessToken: string,
  payload: {
    name: string;
    phone?: string | null;
    avatarDataUrl?: string | null;
  },
): Promise<AuthResponse['user']> {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  const body = (await response.json()) as { user: AuthResponse['user'] };

  return body.user;
}

export async function forgotPasswordRequest(email: string): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return response.json() as Promise<{ message: string }>;
}

export async function resetPasswordRequest(payload: {
  token: string;
  password: string;
}): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return response.json() as Promise<{ message: string }>;
}

export async function verifyEmailRequest(token: string): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return response.json() as Promise<AuthResponse>;
}

export async function resendVerificationRequest(
  email: string,
): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/auth/resend-verification`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return response.json() as Promise<{ message: string }>;
}
