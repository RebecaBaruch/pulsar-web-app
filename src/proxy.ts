import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RoutesUrls } from "@/utils/enum/routes-url";

function isSpecialistSession(request: NextRequest): boolean {
  const authSessionCookie = request.cookies.get("auth_session")?.value;
  if (!authSessionCookie) return false;

  try {
    const authData = JSON.parse(authSessionCookie);
    return (
      Boolean(authData?.accessToken) && authData?.user?.role === "SPECIALIST"
    );
  } catch {
    return false;
  }
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === RoutesUrls.BASE_URL && isSpecialistSession(request)) {
    return NextResponse.redirect(
      new URL(RoutesUrls.SPECIALIST_HOME, request.url),
    );
  }

  if (pathname.startsWith("/specialist-user")) {
    const authSessionCookie = request.cookies.get("auth_session")?.value;

    if (!authSessionCookie) {
      return NextResponse.redirect(new URL(RoutesUrls.USER_TYPE, request.url));
    }

    try {
      const authData = JSON.parse(authSessionCookie);

      if (!authData?.accessToken || authData?.user?.role !== "SPECIALIST") {
        return NextResponse.redirect(new URL(RoutesUrls.USER_TYPE, request.url));
      }
    } catch {
      return NextResponse.redirect(new URL(RoutesUrls.USER_TYPE, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/specialist-user/:path*"],
};
