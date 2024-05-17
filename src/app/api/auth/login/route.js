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
    if (!user.isVerified) {
      return NextResponse.json(
        {
          message: "User is not verified, check your email for verification",
        },
        { status: 401 }
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
        { status: 201 }
      );
      response.cookies.set("token", authToken, {
        httpOnly: true,
        maxAge: 8 * 24 * 60 * 60,
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
    console.log(error.message);
  }
}
