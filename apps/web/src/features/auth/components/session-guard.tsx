'use client';

import { useEffect } from 'react';

import { expireAuthSessionAndRedirect } from '@/features/auth/lib/expire-auth-session';
import { hasActiveClientSession } from '@/features/auth/lib/auth-storage';

/**
 * Garante que cookies órfãos (ex.: sessão persistente antiga) não mantenham
 * o usuário em rotas protegidas sem token válido na sessão atual.
 */
export function SessionGuard() {
  useEffect(() => {
    if (!hasActiveClientSession()) {
      expireAuthSessionAndRedirect();
    }
  }, []);

  return null;
}
