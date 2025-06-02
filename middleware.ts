import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Check if the request is for Hotjar's static assets
  if (request.nextUrl.hostname === 'static.hotjar.com') {
    // Add cache control headers for Hotjar's static assets
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    )
    response.headers.set(
      'Surrogate-Control',
      'public, max-age=31536000, immutable'
    )
    response.headers.set(
      'Surrogate-Key',
      'hotjar-static'
    )
  }

  return response
}

export const config = {
  matcher: [
    // Match Hotjar's static assets
    '/:path*',
  ],
} 