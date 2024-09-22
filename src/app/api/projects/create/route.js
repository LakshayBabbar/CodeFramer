import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Project from "@/models/projects";
import { connectDB } from "@/config/db";
connectDB();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const projectData = await reqBody;
    if (!projectData.name || !projectData.type) {
      return NextResponse.json(
        {
          message: "Please provide all the required fields",
          success: false,
        },
        { status: 400 }
      );
    }
    if (projectData.type === "compiler" && !projectData.language) {
      return NextResponse.json(
        {
          message: "Please provide all the required fields",
          success: false,
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
        success: false,
      },
      { status: 500 }
    );
  }
}
