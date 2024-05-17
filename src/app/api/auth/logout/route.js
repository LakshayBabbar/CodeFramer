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
    res.cookies.set("token", "null", {
      httpOnly: true,
      maxAge: 0,
    });
    return res;
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
