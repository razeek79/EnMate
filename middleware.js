import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session tracking markers synchronously on each routing step
  const { data: { session } } = await supabase.auth.getSession();

  // If a non-logged-in user tries to access any /admin page, redirect them home
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      const homeUrl = new URL('/', req.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*']
};