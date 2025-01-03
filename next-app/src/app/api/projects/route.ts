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
      include: {
        languages: true,
      }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        error: "An error occurred while fetching projects",
      },
      { status: 500 }
    );
  }
}
