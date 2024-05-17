import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Project from "@/models/projects";
import { connectDB } from "@/config/db";
connectDB();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const projectData = await reqBody;
    const headersList = headers();
    const authData = await JSON.parse(headersList.get("authData"));

    const isExists = await Project.findOne({
      name: projectData.name,
      userId: authData.id,
    });
    if (isExists) {
      return NextResponse.json(
        {
          message:
            "Project name is already taken, please choose a different one",
          success: false,
        },
        { status: 409 }
      );
    }
    const newProject = new Project({ ...projectData, userId: authData.id });
    await newProject.save();
    return NextResponse.json(
      {
        message: "Project is created successfully",
        pid: newProject._id,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
