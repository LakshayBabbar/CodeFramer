import { NextResponse } from "next/server";
import prisma from "@/config/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const projects = await prisma.project.findMany({
      where: {
        userId: userId || "",
      },
      select: {
        id: true,
        createdAt: true,
        name: true,
        type: true,
        user: {
          select: {
            username: true,
          },
        },
        isPublic: true,
        languages: {
          select: {
            name: true,
          }
        }
      }
    });
    const filteredProjects = projects.map((project) => {
      return { ...project, isOwner: true }
    });
    return NextResponse.json(filteredProjects, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        error: "An error occurred while fetching projects",
      },
      { status: 500 }
    );
  }
}
