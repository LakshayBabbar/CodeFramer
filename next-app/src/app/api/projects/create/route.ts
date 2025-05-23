import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/db";
import { ProjectType } from "@prisma/client";
import template from "@/shared/template-web.json";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { name, type, language, isPublic } = reqBody;

    const session = await auth();
    const userId = session?.user?.id;

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!name || name.length < 5 || name.length > 30) {
      return NextResponse.json(
        { error: "Project name must be between 5 and 30 characters long." },
        { status: 400 }
      );
    }

    if (!type || (type === "COMPILER" && !language)) {
      return NextResponse.json(
        { error: "Missing required fields: name, type, or language (for COMPILER)" },
        { status: 400 }
      );
    }

    let languages: any[] = [];
    if (type === "COMPILER") {
      languages = [{ name: language, code: "" }];
    } else if (type === "WEB") {
      languages = template;
    }


    const existingProject = await prisma.project.findFirst({
      where: {
        name,
        userId: userId || "",
      },
    });

    if (existingProject) {
      return NextResponse.json(
        { error: "Project name is already taken. Please choose a different one." },
        { status: 409 }
      );
    }

    const newProject = await prisma.project.create({
      data: {
        name,
        type: type as ProjectType,
        userId: userId || "",
        languages: {
          create: languages,
        },
        isPublic: isPublic || false,
      },
    });

    return NextResponse.json(
      {
        message: "Project created successfully",
        pid: newProject.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating project:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
