import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (req.nextauth.token) {
      if (
        req.nextUrl.pathname.startsWith("/manage") &&
        req.nextauth.token?.user?.role !== "ADMIN" &&
        req.nextauth.token?.user?.role === "USER"
      ) {
        return NextResponse.redirect(new URL("/protected", req.url));
      }

      if (
        req.nextUrl.pathname.startsWith("/protected") &&
        req.nextauth.token?.user?.role !== "USER" &&
        req.nextauth.token?.user?.role === "ADMIN"
      ) {
        return NextResponse.redirect(new URL("/manage", req.url));
      }

      if (req.nextauth.token?.user?.role === "ADMIN") {
        return NextResponse.rewrite(new URL("/manage", req.url));
      }

      if (req.nextauth.token?.user?.role === "USER") {
        return NextResponse.rewrite(new URL("/protected", req.url));
      }

      return NextResponse.next();
    } else {
      return NextResponse.rewrite(new URL("/signin", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/manage/:path*", "/protected/:path*"],
};
