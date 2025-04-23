import NextAuth from "next-auth"
import authConfig from "./auth.config"

export const { auth } = NextAuth(authConfig)

export default auth(async function middleware(req) {
  const { pathname, origin } = req.nextUrl
  const isSignedIn = !!req.auth

  const isPublicApi =
    pathname.startsWith("/api/auth/") ||
    pathname.startsWith("/api/projects") ||
    pathname.startsWith("/api/copilot") ||
    pathname.startsWith("/api/blogs")

  const isSignInPage = pathname === "/sign-in"

  if (!isSignedIn && !isSignInPage && !isPublicApi) {
    return Response.redirect(new URL("/sign-in", origin))
  }

  if (isSignedIn && isSignInPage) {
    return Response.redirect(new URL("/dashboard", origin))
  }
})

export const config = {
  matcher: [
    "/api/:path*",
    "/dashboard",
    "/sign-in",
    "/admin/:path*",
    "/profile"
  ],
}