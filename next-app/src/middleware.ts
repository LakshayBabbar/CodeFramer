import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/authToken";

const PROTECTED_API_PATHS = ["/api/projects", "/api/auth/close", "/api/copilot"];
const PROTECTED_APP_PATHS = ["/dashboard"];
const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY || "";

const isProtectedApiPath = (pathname: string) =>
  PROTECTED_API_PATHS.some((path) => pathname.startsWith(path));

const isProtectedAppPath = (pathname: string) =>
  PROTECTED_APP_PATHS.some((path) => pathname.startsWith(path));

const isProtectedCompilerPath = (pathname: string) => {
  return /^\/compiler\/[^/]+\/[^/]+$/.test(pathname);
};

const isProtectedWebEditorPath = (pathname: string) => {
  return /^\/web-editor\/[^/]+\/?$/.test(pathname);
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token =
    request.cookies.get("authToken")?.value ||
    request.headers.get("Authorization")?.split(" ")[1] ||
    "";

  if (isProtectedApiPath(pathname)) {
    const { payload, error } = await verifyToken(token, ACCESS_SECRET_KEY);

    if (error) {
      return NextResponse.json(
        { error: "Authentication failed. Please check your token." },
        { status: 401 }
      );
    }

    const headers = new Headers(request.headers);
    headers.set("authData", JSON.stringify(payload));

    return NextResponse.next({
      request: {
        headers,
      },
    });
  }

  if (
    (isProtectedAppPath(pathname) ||
      isProtectedCompilerPath(pathname) ||
      isProtectedWebEditorPath(pathname)) &&
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
    "/api/copilot",
    "/dashboard/:path*",
    "/web-editor/:path*",
    "/compiler/:path*",
  ],
};
