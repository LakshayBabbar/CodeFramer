import { connectDB } from "@/config/db";
import { NextResponse } from "next/server";
import Project from "@/models/projects";
import { headers } from "next/headers";
connectDB();

export async function GET(req, { params }) {
  try {
    const { pid } = params;
    const Headers = headers();
    const authData = await JSON.parse(Headers.get("authData"));
    const projectData = await Project.findOne({
      _id: pid,
      userId: authData.id,
    }).select("html css js _id");
    if (!projectData) {
      return NextResponse.json(
        {
          message: "Project not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(projectData);
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
export async function DELETE(req, { params }) {
  const { pid } = params;
  const Headers = headers();
  const authData = await JSON.parse(Headers.get("authData"));
  try {
    const project = await Project.deleteOne({ _id: pid, userId: authData.id });
    if (!project) {
      return NextResponse.json(
        {
          message: "Project not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Project is deleted successfully",
        success: true,
      },
      { status: 202 }
    );
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
export async function PUT(req, { params }) {
  try {
    const { pid } = params;
    const reqBody = await req.json();
    const { html, css, js } = await reqBody;
    const Headers = headers();
    const authData = await JSON.parse(Headers.get("authData"));
    const projectData = await Project.findOne({
      _id: pid,
      userId: authData.id,
    }).select("html css js");
    if (!projectData) {
      return NextResponse.json(
        {
          message: "Project not found",
        },
        { status: 404 }
      );
    }
    projectData.html = html;
    projectData.css = css;
    projectData.js = js;
    await projectData.save();
    return NextResponse.json({
      message: "Project is updated successfully",
      success: true,
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
