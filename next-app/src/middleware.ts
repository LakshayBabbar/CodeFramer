import { auth } from "@/auth"

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  if (!req.auth && pathname !== "/sign-in" && !pathname.startsWith("/api/auth/") && !pathname.startsWith("/api/projects") && !pathname.startsWith("/api/copilot") && !pathname.startsWith("/api/blogs")) {
    const newUrl = new URL("/sign-in", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  if (req.auth && pathname === "/sign-in") {
    const newUrl = new URL("/dashboard", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  if (req.auth?.user?.role !== "ADMIN" && (pathname.startsWith("/admin") || pathname.startsWith("/api/admin"))) {
    const newUrl = new URL("/unauthorized", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
})

export const config = {
  matcher: ["/api/:path*", "/dashboard", "/sign-in", "/admin/:path*", "/profile"],
}