import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/db";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const checkUser = await prisma.user.findUnique({
      where: { email },
    });
    if (checkUser) {
      return NextResponse.json(
        { error: "User is already registered" },
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
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const domain = email.split("@")[1];
    if (!supportedDomains.includes(domain)) {
      return NextResponse.json(
        {
          error: `Only ${supportedDomains.join(
            ", "
          )} are supported email providers`,
        },
        { status: 403 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username: username.trim().toLowerCase(),
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Registered successfully",
        userId: newUser.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
