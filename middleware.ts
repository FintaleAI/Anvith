import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Admin route protection middleware.
 *
 * - All /admin/* routes require a valid admin_token cookie.
 * - /admin/login is the only exception (it's the gate itself).
 * - If someone lands on /admin or /admin/ they are redirected to /admin/dashboard.
 * - If already logged in and visiting /admin/login, they go straight to /admin/dashboard.
 *
 * Note: Edge runtime cannot run `jsonwebtoken` (Node crypto).
 * Cookie presence is checked here; full JWT signature verification
 * still happens inside each page via `getAdminSession()`.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply to /admin routes
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const token = request.cookies.get("admin_token")?.value;
  const isLoginPage = pathname === "/admin/login";

  // Already logged in → skip the login page, go to dashboard
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Not logged in → send to login page (except when already going there)
  if (!isLoginPage && !token) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
