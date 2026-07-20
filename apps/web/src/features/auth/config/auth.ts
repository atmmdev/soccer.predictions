import type { UserRole } from '../types/auth';

export const ACCESS_TOKEN_COOKIE = 'soccer_predictions_access_token';
export const USER_ROLE_COOKIE = 'soccer_predictions_user_role';
export const USER_NAME_COOKIE = 'soccer_predictions_user_name';

export const PROTECTED_PATH_PREFIXES = [
  '/dashboard',
  '/championships',
  '/pools',
  '/participants',
  '/matches',
  '/predictions',
  '/rankings',
  '/activity',
  '/statistics',
  '/notifications',
  '/profile',
  '/settings',
  '/help',
] as const;

export const ADMIN_PATH_PREFIXES = [
  '/championships',
  '/participants',
  '/settings',
] as const;

/** Rotas de desempenho pessoal — SUPER_ADMIN não palpita. */
export const PREDICTOR_ONLY_PATH_PREFIXES = ['/statistics'] as const;

export const AUTH_PATHS = ['/login', '/register'] as const;

const PRIVILEGED_ROLES: UserRole[] = ['ADMIN', 'SUPER_ADMIN'];
const PREDICTOR_ROLES: UserRole[] = ['ADMIN', 'PARTICIPANT'];

export function isPrivilegedRole(role: UserRole | undefined): boolean {
  return role !== undefined && PRIVILEGED_ROLES.includes(role);
}

export function isPredictorRole(role: UserRole | undefined): boolean {
  return role !== undefined && PREDICTOR_ROLES.includes(role);
}

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATH_PREFIXES.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isAdminOnlyPath(pathname: string): boolean {
  return ADMIN_PATH_PREFIXES.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isPredictorOnlyPath(pathname: string): boolean {
  return PREDICTOR_ONLY_PATH_PREFIXES.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isAuthPath(pathname: string): boolean {
  return (AUTH_PATHS as readonly string[]).includes(pathname);
}

export function canAccessPath(pathname: string, role: UserRole | undefined): boolean {
  if (isPredictorOnlyPath(pathname)) {
    return isPredictorRole(role);
  }

  if (!isAdminOnlyPath(pathname)) {
    return true;
  }

  return isPrivilegedRole(role);
}

export function parseUserRole(value: string | undefined): UserRole | undefined {
  if (value === 'SUPER_ADMIN' || value === 'ADMIN' || value === 'PARTICIPANT') {
    return value;
  }

  return undefined;
}
