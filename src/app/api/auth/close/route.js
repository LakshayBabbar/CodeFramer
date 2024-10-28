export const revalidate = 0;

import Project from "@/models/projects";
import User from "@/models/users";
import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { headers } from "next/headers";
connectDB();

export async function DELETE() {
  try {
    const Headers = headers();
    const authData = await JSON.parse(Headers.get("authData"));
    const user = await User.findOne({ _id: authData?.id });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    await User.findByIdAndDelete(authData?.id);
    await Project.deleteMany({ userId: authData?.id });
    const res = NextResponse.json(
      { message: "Account closed successfully." },
      { status: 200 }
    );
    res.cookies.set("authToken", " ", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      expires: new Date(0),
    });
    return res;
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
