import { connectDB } from "@/config/db";
import User from "@/models/users";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {
  const reqBody = await request.json();
  const { token } = reqBody;

  try {
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExp: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Token is invalid or expired" },
        { status: 403 }
      );
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExp = undefined;
    await user.save();
    return NextResponse.json({
      message: "Email is verified successfully",
      success: true,
    });
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
