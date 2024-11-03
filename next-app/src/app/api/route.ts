import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/lib/authToken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies?.get("authToken")?.value || "";
    const res = {
      message: "Welcome to CodeFramer",
      isAuth: false,
      username: "",
    };
    const { error, payload } = await verifyToken(
      token,
      process.env.ACCESS_SECRET_KEY || ""
    );
    if (error) {
      res.isAuth = false;
    } else {
      res.username = payload?.username as string;
      res.isAuth = true;
    }
    return NextResponse.json(res, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
