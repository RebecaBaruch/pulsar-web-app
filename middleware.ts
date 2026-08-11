import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/find-specialist",
  "/login/form",
  "/login/user-type",
  "/reset-password",
  "/forgot-password",
  "/client-register",
  "/specialist",
];

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth_session");
  const pathname = request.nextUrl.pathname;

  const isPublicPath = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!authCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/login/form";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/client-user/:path*", "/specialist-user/:path*"],
};
