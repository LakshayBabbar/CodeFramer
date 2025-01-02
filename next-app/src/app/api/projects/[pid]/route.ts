import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/db";
import { auth } from "@/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { pid: string } }
) {
  try {
    const { pid } = params;
    const session = await auth();
    const userId = session?.user?.id;

    const projectData = await prisma.project.findFirst({
      where: {
        id: pid,
        userId: userId || "",
      },
      include: {
        languages: true,
      }
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
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { pid: string } }
) {
  const { pid } = params;
  const session = await auth();
  const userId = session?.user?.id;

  try {
    const project = await prisma.project.delete({
      where: {
        id: pid,
        userId: userId || "",
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
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { pid: string } }
) {
  try {
    const { pid } = params;
    const { languages } = await req.json();

    if (
      !Array.isArray(languages) ||
      languages.some((lang) => typeof lang.name !== "string" || typeof lang.code !== "string")
    ) {
      return NextResponse.json(
        { error: "Invalid languages data. Each language must have 'name' and 'code' fields." },
        { status: 400 }
      );
    }

    const session = await auth();
    const userId = session?.user?.id;

    const existingProject = await prisma.project.findFirst({
      where: {
        id: pid,
        userId: userId || "",
      },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found or you do not have permission to edit this project." },
        { status: 404 }
      );
    }

    for (const lang of languages) {
      await prisma.language.updateMany({
        where: {
          name: lang.name,
          projectId: pid,
        },
        data: {
          code: lang.code || null,
          inputs: lang.inputs || null,
        },
      });
    }

    return NextResponse.json(
      {
        message: "Project updated successfully",
      },
      { status: 202 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}