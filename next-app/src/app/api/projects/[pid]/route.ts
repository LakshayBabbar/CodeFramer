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

    if (
      !Array.isArray(languages) ||
      languages.some((lang) => typeof lang.name !== "string" || typeof lang.code !== "string")
    ) {
      return NextResponse.json(
        { error: "Invalid languages data. Each language must have 'name' and 'code' fields." },
        { status: 400 }
      );
    }

    const Headers = headers();
    const authData = JSON.parse(Headers.get("authData") || "{}");

    const existingProject = await prisma.project.findFirst({
      where: {
        id: pid,
        userId: authData.id,
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
          code: lang.code || null
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
  } finally {
    await prisma.$disconnect();
  }
}