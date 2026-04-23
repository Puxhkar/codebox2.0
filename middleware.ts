import NextAuth from "next-auth";
import { handlers } from "./auth";

// Temporary auth Config without DB for middleware edge compatibility
const authConfig = {
  providers: [], // Middleware doesn't need to invoke DB credentials provider, it just verifies the JWT
};

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/courses/") && pathname.split("/").length > 3; // roughly protects course content

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", req.nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(new URL("/sign-in", req.nextUrl));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
