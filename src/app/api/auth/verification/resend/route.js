import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/mailer";
import { connectDB } from "@/config/db";
import User from "@/models/users";
import bcryptjs from "bcryptjs";
connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Fill all the required fields",
          success: false,
        },
        { status: 404 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not registered",
          success: false,
        },
        { status: 404 }
      );
    }
    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        {
          message: "Invalid Credentials",
          success: false,
        },
        { status: 401 }
      );
    }
    if (user.isVerified) {
      return NextResponse.json(
        {
          message: "User is already verified",
          success: false,
        },
        { status: 409 }
      );
    }

    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: user._id.toString(),
      username: user.username,
    });
    return NextResponse.json(
      {
        message: "Verification link is sent to the email",
        success: true,
        userId: user._id,
      },
      { status: 200 }
    );
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
