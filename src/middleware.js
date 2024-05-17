import { NextResponse } from "next/server";
import { verifyToken } from "./utils/authToken";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  if (request.nextUrl.pathname.startsWith("/api/projects")) {
    const { payload, error } = await verifyToken(
      token,
      process.env.ACCESS_SECRET_KEY
    );
    if (error) {
      return NextResponse.json(
        {
          message: "Could not Authenticate",
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
  } else if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const { error } = await verifyToken(token, process.env.ACCESS_SECRET_KEY);
    if (error) {
      return NextResponse.redirect(new URL("/auth?mode=login", request.url));
    }
    return NextResponse.next();
  } else if (request.nextUrl.pathname.startsWith("/auth")) {
    const { error } = await verifyToken(token, process.env.ACCESS_SECRET_KEY);
    if (error) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else if (request.nextUrl.pathname.startsWith("/api/auth/logout")) {
    const res = NextResponse.next();
    res.cookies.set("token", " ", {
      httpOnly: true,
      secure: true,
      maxAge: 0,
    });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/api/projects/:path*"],
};
