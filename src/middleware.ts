import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/authToken";

export async function middleware(request: NextRequest) {
  const token =
    request.cookies.get("authToken")?.value ||
    request.headers.get("Authorization")?.split(" ")[1] ||
    "";
  if (
    request.nextUrl.pathname.startsWith("/api/projects") ||
    request.nextUrl.pathname.startsWith("/api/auth/close")
  ) {
    const { payload, error } = await verifyToken(
      token,
      process.env.ACCESS_SECRET_KEY || ""
    );
    if (error) {
      return NextResponse.json(
        {
          error: "Could not Authenticate",
        },
        { status: 401 }
      );
    }
    const headers = new Headers(request.headers);
    headers.set("authData", JSON.stringify(payload));
    const response = NextResponse.next({
      request: {
        headers,
      },
    });
    return response;
  } else if (
    (request.nextUrl.pathname.startsWith("/chat") ||
      request.nextUrl.pathname.startsWith("/dashboard")) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/auth?mode=login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/projects/:path*",
    "/api/auth/close",
    "/chat",
    "/dashboard/:path*",
  ],
};
