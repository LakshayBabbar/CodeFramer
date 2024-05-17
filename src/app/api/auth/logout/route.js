import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json(
    {
      message: "Logout successfully",
    },
    { status: 200 }
  );
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    maxAge: 0,
  });
  return res;
}
