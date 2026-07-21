import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { RoutesUrls } from "@/utils/enum/routes-url";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/specialist-user')) {
    const authSessionCookie = request.cookies.get('auth_session')?.value;
    
    if (!authSessionCookie) {
      return NextResponse.redirect(new URL(RoutesUrls.USER_TYPE, request.url));
    }

    try {
      const authData = JSON.parse(authSessionCookie);
      
      if (!authData?.accessToken || authData?.user?.role !== 'SPECIALIST') {
        return NextResponse.redirect(new URL(RoutesUrls.USER_TYPE, request.url));
      }
      
    } catch (error) {
      return NextResponse.redirect(new URL(RoutesUrls.USER_TYPE, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/specialist-user/:path*'],
};