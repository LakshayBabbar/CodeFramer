import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/authToken";
import prisma from "@/config/db";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 401 }
      );
    }

    const authToken = await generateToken(
      { id: user.id, username: user.username },
      process.env.ACCESS_SECRET_KEY || ""
    );

    const response = NextResponse.json(
      { message: "Logged in successfully", username: user.username },
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
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
