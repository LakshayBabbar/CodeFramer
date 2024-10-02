export const revalidate = 0;

import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const response = NextResponse.json(
      {
        message: "Logged out successfully",
      },
      {
        status: 200,
      }
    );
    response.cookies.set("authToken", " ", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
