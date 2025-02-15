import { auth } from "@/auth";
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "./constants/routes";
import { NextResponse } from "next/server";
import { isAdmin } from "./lib/utils";

export default auth((req) => {
  const { pathname, origin } = req.nextUrl;
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

  if (!req.auth && isProtected) {
    const newUrl = new URL("/login", origin);
    return NextResponse.redirect(newUrl);
  }

  if (req.auth && !isAdmin(req.auth.user.role) && pathname === "/dashboard") {
    const newUrl = new URL("/", origin);
    return NextResponse.redirect(newUrl);
  }

  if (req.auth && isPublic) {
    const redirectUrl = req.auth.user.role === "admin" ? "/dashboard" : "/";
    const newUrl = new URL(redirectUrl, origin);
    return NextResponse.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
