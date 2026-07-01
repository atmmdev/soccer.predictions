import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import {
  ACCESS_TOKEN_COOKIE,
  isAuthPath,
  isProtectedPath,
} from '@/features/auth/config/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

  if (isProtectedPath(pathname) && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);

    return NextResponse.redirect(loginUrl);
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
    '/participants/:path*',
    '/matches/:path*',
    '/predictions/:path*',
    '/rankings/:path*',
    '/statistics/:path*',
    '/notifications/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/help/:path*',
    '/login',
    '/register',
  ],
};
