import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Paths that should only be accessible when NOT logged in
  const authPaths = ['/login', '/register'];
  // Paths that should only be accessible when logged in
  const protectedPaths = ['/dashboard'];

  const isAuthPath = authPaths.some(path => pathname === path);
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  if (token) {
    // If logged in and trying to access login/register, redirect to dashboard
    if (isAuthPath) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else {
    // If NOT logged in and trying to access dashboard, redirect to login
    if (isProtectedPath) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  const response = NextResponse.next();

  // Prevent browser from caching dashboard pages (back-button protection after logout)
  // Critical for shared/school/public computers
  if (isProtectedPath) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
