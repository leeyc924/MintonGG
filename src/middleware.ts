import { NextRequest, NextResponse } from 'next/server';
import { formatHeader } from '@utils-client';

export async function middleware(request: NextRequest) {
  try {
    const requestHeader = new Headers(request.headers);
    const headerInstance = formatHeader(requestHeader);
    const authResponse = await fetch(`${process.env['NEXT_PUBLIC_API_BASE_URL']}/auth/check`, {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...headerInstance },
    });

    if (authResponse.ok) {
      const data = await authResponse.json();
      const session = encodeURIComponent(JSON.stringify(data));
      requestHeader.set('session', session);

      return NextResponse.next({
        request: {
          headers: requestHeader,
        },
      });
    } else {
      if (authResponse.status === 401) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      return new Response('Error', { status: authResponse.status });
    }
  } catch (error) {
    console.log(`error`, error);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|manifest.json).*)'],
};
