import {
  ACCESS_TOKEN_COOKIE,
  parseUserRole,
  USER_NAME_COOKIE,
  USER_ROLE_COOKIE,
} from '../config/auth';
import type { AuthUser, UserRole } from '../types/auth';

const USER_KEY = 'soccer_predictions_user';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const prefix = `${name}=`;
  const entry = document.cookie
    .split('; ')
    .find(row => row.startsWith(prefix));

  if (!entry) {
    return null;
  }

  return decodeURIComponent(entry.slice(prefix.length));
}

/** Cookies de sessão (sem max-age) — expiram ao fechar o navegador. */
function setAccessTokenCookie(token: string): void {
  document.cookie = `${ACCESS_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; SameSite=Lax`;
}

function setUserRoleCookie(role: UserRole): void {
  document.cookie = `${USER_ROLE_COOKIE}=${encodeURIComponent(role)}; path=/; SameSite=Lax`;
}

function setUserNameCookie(name: string): void {
  document.cookie = `${USER_NAME_COOKIE}=${encodeURIComponent(name)}; path=/; SameSite=Lax`;
}

function clearAccessTokenCookie(): void {
  document.cookie = `${ACCESS_TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

function clearUserRoleCookie(): void {
  document.cookie = `${USER_ROLE_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

function clearUserNameCookie(): void {
  document.cookie = `${USER_NAME_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

/** Remove tokens legados de localStorage (modo persistente anterior). */
function clearLegacyPersistentStorage(): void {
  localStorage.removeItem(ACCESS_TOKEN_COOKIE);
  localStorage.removeItem(USER_KEY);
}

export function saveAuthSession(accessToken: string, user: AuthUser): void {
  clearLegacyPersistentStorage();
  sessionStorage.setItem(ACCESS_TOKEN_COOKIE, accessToken);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  setAccessTokenCookie(accessToken);
  setUserRoleCookie(user.role);
  setUserNameCookie(user.name);
}

export function updateStoredUser(user: AuthUser): void {
  const token = getAccessToken();

  if (!token) {
    return;
  }

  saveAuthSession(token, user);
}

export function clearAuthSession(): void {
  sessionStorage.removeItem(ACCESS_TOKEN_COOKIE);
  sessionStorage.removeItem(USER_KEY);
  clearLegacyPersistentStorage();
  clearAccessTokenCookie();
  clearUserRoleCookie();
  clearUserNameCookie();
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    readCookie(ACCESS_TOKEN_COOKIE) ??
    sessionStorage.getItem(ACCESS_TOKEN_COOKIE)
  );
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = sessionStorage.getItem(USER_KEY);

  if (raw) {
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      // fallback abaixo
    }
  }

  const token = getAccessToken();
  const role = parseUserRole(readCookie(USER_ROLE_COOKIE) ?? undefined);
  const name = readCookie(USER_NAME_COOKIE);

  if (!token || !role || !name) {
    return null;
  }

  return {
    id: 0,
    email: '',
    name,
    role,
  };
}

export function hasActiveClientSession(): boolean {
  return getAccessToken() !== null;
}
