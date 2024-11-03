import { connectDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/projects";
import { headers } from "next/headers";
connectDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { pid: string } }
) {
  try {
    const { pid } = params;
    const Headers = headers();
    const authData = await JSON.parse(Headers.get("authData") || "");
    const projectData = await Project.findOne({
      _id: pid,
      userId: authData.id,
    }).select("-userId -__v -createdAt -updatedAt");
    if (!projectData) {
      return NextResponse.json(
        {
          error: "Project not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(projectData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { pid: string } }
) {
  const { pid } = params;
  const Headers = headers();
  const authData = await JSON.parse(Headers.get("authData") || "");
  try {
    const project = await Project.deleteOne({ _id: pid, userId: authData.id });
    if (!project) {
      return NextResponse.json(
        {
          error: "Project not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Project is deleted successfully",
      },
      { status: 202 }
    );
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { pid: string } }
) {
  try {
    const { pid } = params;
    const reqBody = await req.json();
    const Headers = headers();
    const authData = await JSON.parse(Headers.get("authData") || "");
    const projectData = await Project.findOne({
      _id: pid,
      userId: authData.id,
    }).select("html css js");
    if (!projectData) {
      return NextResponse.json(
        {
          error: "Project not found",
        },
        { status: 404 }
      );
    }
    projectData.languages = await reqBody.languages;
    await projectData.save();
    return NextResponse.json({
      message: "Project is updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
