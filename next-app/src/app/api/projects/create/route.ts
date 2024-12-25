import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "@/config/db";
import { ProjectType } from "@prisma/client";
import template from "@/shared/template.json";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { name, type, language } = reqBody;

    if (!name || !type || (type === "COMPILER" && !language)) {
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

    const headersList = headers();
    const authData = JSON.parse(headersList.get("authData") || "{}");

    if (!authData || !authData.id) {
      return NextResponse.json(
        { error: "Unauthorized request. Missing user authentication data." },
        { status: 401 }
      );
    }

    const existingProject = await prisma.project.findFirst({
      where: {
        name,
        userId: authData.id,
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
        userId: authData.id,
        languages: {
          create: languages,
        },
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
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
