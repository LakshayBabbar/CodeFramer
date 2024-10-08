import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/authToken";

export async function GET(req) {
  try {
    const token = req.cookies?.get("authToken")?.value;
    const res = {
      message: "Welcome to CodeFramer",
    };
    const { error, payload } = await verifyToken(
      token,
      process.env.ACCESS_SECRET_KEY
    );
    if (error) {
      res.isAuth = false;
    } else {
      res.username = payload.username;
      res.isAuth = true;
    }
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 500 }
    );
  } finally {
    fetch(process.env.COMPILER_URL + "/status");
  }
}
