import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE_SECONDS,
  USER_NAME_COOKIE,
  USER_ROLE_COOKIE,
} from '../config/auth';
import type { AuthUser, UserRole } from '../types/auth';

const USER_KEY = 'soccer_predictions_user';

function setAccessTokenCookie(token: string): void {
  document.cookie = `${ACCESS_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${ACCESS_TOKEN_MAX_AGE_SECONDS}; SameSite=Lax`;
}

function setUserRoleCookie(role: UserRole): void {
  document.cookie = `${USER_ROLE_COOKIE}=${encodeURIComponent(role)}; path=/; max-age=${ACCESS_TOKEN_MAX_AGE_SECONDS}; SameSite=Lax`;
}

function setUserNameCookie(name: string): void {
  document.cookie = `${USER_NAME_COOKIE}=${encodeURIComponent(name)}; path=/; max-age=${ACCESS_TOKEN_MAX_AGE_SECONDS}; SameSite=Lax`;
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

export function saveAuthSession(accessToken: string, user: AuthUser): void {
  localStorage.setItem(ACCESS_TOKEN_COOKIE, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
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
  localStorage.removeItem(ACCESS_TOKEN_COOKIE);
  localStorage.removeItem(USER_KEY);
  clearAccessTokenCookie();
  clearUserRoleCookie();
  clearUserNameCookie();
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
