import bcryptjs from "bcryptjs";
import User from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/authToken";
import { connectDB } from "@/config/db";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 }
      );
    }
    const isValid = await bcryptjs.compare(password, user.password);
    if (isValid) {
      const authToken = await generateToken(
        {
          id: user._id,
          username: user.username,
        },
        process.env.ACCESS_SECRET_KEY || ""
      );
      const response = NextResponse.json(
        {
          message: "Logged in successfully",
          username: user.username,
        },
        { status: 200 }
      );
      response.cookies.set("authToken", authToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
      return response;
    } else {
      return NextResponse.json(
        {
          error: "Invalid Credentails",
        },
        { status: 401 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
