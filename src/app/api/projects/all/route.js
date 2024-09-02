import { connectDB } from "@/config/db";
import { headers } from "next/headers";
import Project from "@/models/projects";
import { NextResponse } from "next/server";
connectDB();

export async function GET() {
  try {
    const Headers = headers();
    const authData = await JSON.parse(Headers.get("authData"));
    const projects = await Project.find({ userId: authData.id })
      .select("name description _id createdAt");
    if (projects.length === 0) {
      return NextResponse.json(
        {
          message: "You have not created any project yet",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(projects);
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
