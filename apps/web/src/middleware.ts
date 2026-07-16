import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import {
  ACCESS_TOKEN_COOKIE,
  USER_ROLE_COOKIE,
  canAccessPath,
  isAuthPath,
  isProtectedPath,
} from '@/features/auth/config/auth';
import type { UserRole } from '@/features/auth/types/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const role = request.cookies.get(USER_ROLE_COOKIE)?.value as
    | UserRole
    | undefined;

  if (isProtectedPath(pathname) && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);

    return NextResponse.redirect(loginUrl);
  }

  if (token && isProtectedPath(pathname) && !canAccessPath(pathname, role)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isAuthPath(pathname) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/championships/:path*',
    '/pools/:path*',
    '/join/:path*',
    '/participants/:path*',
    '/matches/:path*',
    '/predictions/:path*',
    '/rankings/:path*',
    '/activity/:path*',
    '/statistics/:path*',
    '/notifications/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/help/:path*',
    '/login',
    '/register',
  ],
};
