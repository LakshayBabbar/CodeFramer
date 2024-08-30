import { NextResponse } from "next/server";
import { verifyToken } from "./utils/authToken";

export async function middleware(request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
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
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/projects/:path*"],
};
