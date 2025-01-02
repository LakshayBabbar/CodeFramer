import { auth } from "@/auth"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/sign-in" && !req.nextUrl.pathname.startsWith("/api/auth/")) {
    const newUrl = new URL("/sign-in", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  if (req.auth && req.nextUrl.pathname === "/sign-in") {
    const newUrl = new URL("/dashboard", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ["/api/:path*", "/dashboard", "/sign-in"],
}