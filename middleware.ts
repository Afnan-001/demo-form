import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect the form-responses route
  if (request.nextUrl.pathname.startsWith('/form-responses')) {
    const sessionCookie = request.cookies.get('admin-session');
    
    if (!sessionCookie) {
      // Redirect to login page
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Basic session validation (decode and check if not too old)
    try {
      const decoded = Buffer.from(sessionCookie.value, 'base64').toString();
      const [username, timestamp] = decoded.split(':');
      const sessionAge = Date.now() - parseInt(timestamp);
      
      // Session expires after 24 hours (24 * 60 * 60 * 1000 ms)
      if (sessionAge > 24 * 60 * 60 * 1000) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('admin-session');
        return response;
      }
      
      // Session is valid, allow access
      return NextResponse.next();
    } catch (error) {
      // Invalid session, redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('admin-session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/form-responses/:path*'
};