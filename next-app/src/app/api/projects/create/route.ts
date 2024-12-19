import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "@/config/db";
import { ProjectType } from "@prisma/client";
import template from "@/shared/template.json"

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { name, type, language } = reqBody;

    let languages = {};
    if (type === "COMPILER") {
      languages = [{ name: language, code: " " }];
    } else if (type === "WEB") {
      languages = template
    }

    const headersList = headers();
    const authData = JSON.parse(headersList.get("authData") || "{}");

    const existingProject = await prisma.project.findFirst({
      where: {
        name,
        userId: authData.id,
      },
    });

    if (existingProject) {
      return NextResponse.json(
        {
          error: "Project name is already taken, please choose a different one",
        },
        { status: 409 }
      );
    }

    const newProject = await prisma.project.create({
      data: {
        name,
        type: type as ProjectType,
        userId: authData.id,
        languages: languages as any,
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
