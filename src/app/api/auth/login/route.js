import bcryptjs from "bcryptjs";
import User from "@/models/users";
import { NextResponse } from "next/server";
import { generateToken } from "@/utils/authToken";
import { connectDB } from "@/config/db";

connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
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
        process.env.ACCESS_SECRET_KEY
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
        sameSite: "strict",
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
      return response;
    } else {
      return NextResponse.json(
        {
          message: "Invalid Credentails",
        },
        { status: 401 }
      );
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
