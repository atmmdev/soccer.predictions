export const ACCESS_TOKEN_COOKIE = 'soccer_predictions_access_token';
export const ACCESS_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export const PROTECTED_PATH_PREFIXES = [
  '/dashboard',
  '/championships',
  '/pools',
  '/participants',
  '/matches',
  '/predictions',
  '/rankings',
  '/statistics',
  '/notifications',
  '/profile',
  '/settings',
  '/help',
] as const;

export const AUTH_PATHS = ['/login', '/register'] as const;

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATH_PREFIXES.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isAuthPath(pathname: string): boolean {
  return (AUTH_PATHS as readonly string[]).includes(pathname);
}
