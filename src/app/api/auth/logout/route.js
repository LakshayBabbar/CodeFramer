export const revalidate = 0;
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const res = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });
    res.cookies.set("token", "", {
      httpOnly: true,
      secure: true,
      maxAge: 0,
    });
    return res;
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error: " + error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
