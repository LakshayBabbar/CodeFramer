import { connectDB } from "@/config/db";
import { headers } from "next/headers";
import Project from "@/models/projects";
import { NextResponse } from "next/server";
connectDB();

export async function GET() {
  try {
    const Headers = headers();
    const authData = await JSON.parse(Headers.get("authData"));
    const projects = await Project.find({ userId: authData.id });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
