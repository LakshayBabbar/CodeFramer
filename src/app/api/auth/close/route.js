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
      return NextResponse.json(
        { message: "User not found.", success: false },
        { status: 404 }
      );
    }
    await User.findByIdAndDelete(authData?.id);
    await Project.deleteMany({ userId: authData?.id });
    return NextResponse.json(
      { message: "Account closed successfully.", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred: " + error?.message, success: false },
      { status: 500 }
    );
  }
}
