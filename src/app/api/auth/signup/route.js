import bcryptjs from "bcryptjs";
import User from "@/models/users";
import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { sendEmail } from "@/utils/mailer";

connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return NextResponse.json(
        {
          message: "user is already registered",
        },
        { status: 409 }
      );
    }
    const supportedDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
    ];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          message: "Invalid email format.",
          success: false,
        },
        { status: 400 }
      );
    }
    const domain = email.split("@")[1];
    if (!supportedDomains.includes(domain)) {
      return NextResponse.json(
        {
          message: `Only ${supportedDomains.join(
            ", "
          )} are supported email providers`,
          success: false,
        },
        { status: 403 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username: username.replace(/\s+/g, "").toLowerCase(),
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    /*     savedUser &&
      (await sendEmail({
        email,
        emailType: "VERIFY",
        userId: savedUser._id.toString(),
        username,
      })); */
    return NextResponse.json({
      message: "Registered successfully",
      userId: savedUser._id,
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
