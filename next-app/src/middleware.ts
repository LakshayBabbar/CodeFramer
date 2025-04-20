import { auth } from "@/auth"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/sign-in" && !req.nextUrl.pathname.startsWith("/api/auth/") && !req.nextUrl.pathname.startsWith("/api/projects") && !req.nextUrl.pathname.startsWith("/api/copilot") && !req.nextUrl.pathname.startsWith("/api/blogs")) {
    const newUrl = new URL("/sign-in", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  if (req.auth && req.nextUrl.pathname === "/sign-in") {
    const newUrl = new URL("/dashboard", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  if (req.auth?.user?.role !== "ADMIN" && (req.nextUrl.pathname.startsWith("/admin") || req.nextUrl.pathname.startsWith("/api/admin") || req.nextUrl.pathname.startsWith("/api/admin/blog"))) {
    const newUrl = new URL("/unauthorized", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
})

export const config = {
  matcher: ["/api/:path*", "/dashboard", "/sign-in", "/admin/:path*", "/profile"],
}