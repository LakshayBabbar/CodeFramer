import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/db";
import { auth } from "@/auth";

export async function GET(req: NextRequest, props: { params: Promise<{ pid: string }> }) {
  const params = await props.params;
  try {
    const { pid } = params;
    const session = await auth();
    const userId = session?.user?.id;

    const projectData = await prisma.project.findUnique({
      where: {
        id: pid,
      },
      include: {
        languages: true,
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
    if (!projectData?.isPublic && projectData?.userId !== userId) {
      throw new Error("You do not have permission to view this project.");
    }

    if (projectData.isPublic && userId && projectData.userId !== userId) {
      await prisma.project.update({
        where: { id: pid },
        data: {
          views: {
            increment: 1,
          }
        },
      })
    }

    return NextResponse.json({ ...projectData, isOwner: userId === projectData.userId }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ pid: string }> }) {
  const params = await props.params;
  const { pid } = params;
  const session = await auth();
  const userId = session?.user?.id;

  if (!session) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: pid,
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

    if (project.userId !== userId) {
      return NextResponse.json(
        {
          error: "You do not have permission to delete this project.",
        },
        { status: 403 }
      );
    }

    await prisma.project.delete({
      where: {
        id: pid,
        userId: userId || "",
      },
    });

    return NextResponse.json(
      {
        message: "Project is deleted successfully",
      },
      { status: 202 }
    );
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, props: { params: Promise<{ pid: string }> }) {
  const params = await props.params;
  try {
    const { pid } = params;
    const body = await req.json();
    const session = await auth();
    const userId = session?.user?.id;

    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const existingProject = await prisma.project.findUnique({
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

    if (body.languages) {
      if (
        !Array.isArray(body.languages) ||
        body.languages.some((lang: Language) => typeof lang.name !== "string" || typeof lang.code !== "string")
      ) {
        return NextResponse.json(
          { error: "Invalid languages data. Each language must have 'name' and 'code' fields." },
          { status: 400 }
        );
      }
      for (const lang of body.languages) {
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
    }
    else if (body.visibility !== undefined) {
      await prisma.project.update({
        where: { id: pid },
        data: { isPublic: body.visibility },
      });
    }

    return NextResponse.json(
      { message: "Project updated successfully" },
      { status: 202 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

interface Language {
  name: string;
  code?: string;
  inputs?: string;
}