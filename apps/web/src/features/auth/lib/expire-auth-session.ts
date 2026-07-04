import { clearAuthSession } from './auth-storage';

const SESSION_EXPIRED_MESSAGE = 'Sessão expirada. Faça login novamente.';

let isRedirectingToLogin = false;

export function expireAuthSessionAndRedirect(): never {
  if (typeof window !== 'undefined' && !isRedirectingToLogin) {
    const isLoginPage = window.location.pathname.startsWith('/login');

    clearAuthSession();

    if (!isLoginPage) {
      isRedirectingToLogin = true;
      const loginUrl = new URL('/login', window.location.origin);
      loginUrl.searchParams.set('reason', 'session_expired');
      window.location.assign(loginUrl.toString());
    }
  }

  throw new Error(SESSION_EXPIRED_MESSAGE);
}

export { SESSION_EXPIRED_MESSAGE };
