import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/mailer";
import { connectDB } from "@/config/db";
import User from "@/models/users";
connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email } = await reqBody;
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
        message: "Verification link is send to the email",
        userId: user._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
  }
}
