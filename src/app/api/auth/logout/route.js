import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = NextResponse.json(
      {
        message: "Logout successfully",
        success: true,
      },
      { status: 200 }
    );
    const expires = new Date(0);
    res.cookies.set("token", "undefined", {
      httpOnly: true,
      secure: true,
      expires: expires,
    });
    return res;
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        succss: false,
      },
      { status: 500 }
    );
  }
}
