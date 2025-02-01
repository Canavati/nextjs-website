import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Regex for static files
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') || // Next.js system files
    pathname.startsWith('/api') || // API routes
    pathname.startsWith('/static') || // Static files
    PUBLIC_FILE.test(pathname) // Public files
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );

  // Cache control for different types of content
  if (pathname.startsWith('/images/')) {
    // Cache images for a longer time
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  } else if (
    pathname.includes('.js') ||
    pathname.includes('.css') ||
    pathname.includes('.woff2')
  ) {
    // Cache static assets
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  } else {
    // Default caching strategy for other routes
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, must-revalidate'
    );
  }

  return response;
}

// Configure which paths should be processed by this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}; 