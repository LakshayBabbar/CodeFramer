import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const token = await request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        {
          message: "Not authenticate",
          success: false,
        },
        { status: 400 }
      );
    } else {
      const res = NextResponse.json(
        {
          message: "Logout successfully",
          success: true,
        },
        { status: 200 }
      );
      const expires = new Date(0);
      res.cookies.set("token", "", {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: "None",
        path: "/",
      });
      return res;
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
