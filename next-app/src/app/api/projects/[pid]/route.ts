import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "@/config/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { pid: string } }
) {
  try {
    const { pid } = params;
    const Headers = headers();
    const authData = await JSON.parse(Headers.get("authData") || "");

    const projectData = await prisma.project.findFirst({
      where: {
        id: pid,
        userId: authData.id,
      },
    });

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
  } finally {
    await prisma.$disconnect();
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
    const project = await prisma.project.delete({
      where: {
        id: pid,
        userId: authData.id,
      },
    });

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
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { pid: string } }
) {
  try {
    const { pid } = params;
    const { languages } = await req.json();
    const Headers = headers();
    const authData = await JSON.parse(Headers.get("authData") || "");

    const updatedProject = await prisma.project.update({
      where: {
        id: pid,
        userId: authData.id,
      },
      data: {
        languages,
      },
    });

    if (!updatedProject) {
      return NextResponse.json(
        {
          error: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Project is updated successfully",
      },
      { status: 202 }
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
