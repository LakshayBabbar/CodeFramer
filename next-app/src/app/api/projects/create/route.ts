import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Project from "@/models/projects";
import { connectDB } from "@/config/db";
connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const projectData = await reqBody;
    if (!projectData.name || !projectData.type) {
      return NextResponse.json(
        {
          error: "Please provide all the required fields",
        },
        { status: 400 }
      );
    }
    if (projectData.type === "compiler" && !projectData.language) {
      return NextResponse.json(
        {
          error: "Please provide all the required fields",
        },
        { status: 400 }
      );
    }
    if (projectData.type === "compiler") {
      projectData.languages = projectData.languages || {};
      projectData.languages[projectData.language] = " ";
    }
    if (projectData.type === "web") {
      projectData.languages = {
        html: "<h1 id='heading'>Welcome to your first project</h1>",
        css: "#heading {\n\tcolor: blue;\n\tfont-size: 24px;\n}",
        js: "",
      };
    }
    const headersList = headers();
    const authData = await JSON.parse(headersList.get("authData") || "");

    const isExists = await Project.findOne({
      name: projectData.name,
      userId: authData.id,
    });
    if (isExists) {
      return NextResponse.json(
        {
          error: "Project name is already taken, please choose a different one",
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
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
