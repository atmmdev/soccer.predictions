import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE_SECONDS,
} from '../config/auth';
import type { AuthUser } from '../types/auth';

const USER_KEY = 'soccer_predictions_user';

function setAccessTokenCookie(token: string): void {
  document.cookie = `${ACCESS_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${ACCESS_TOKEN_MAX_AGE_SECONDS}; SameSite=Lax`;
}

function clearAccessTokenCookie(): void {
  document.cookie = `${ACCESS_TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export function saveAuthSession(accessToken: string, user: AuthUser): void {
  localStorage.setItem(ACCESS_TOKEN_COOKIE, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  setAccessTokenCookie(accessToken);
}

export function clearAuthSession(): void {
  localStorage.removeItem(ACCESS_TOKEN_COOKIE);
  localStorage.removeItem(USER_KEY);
  clearAccessTokenCookie();
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN_COOKIE);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = localStorage.getItem(USER_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}
