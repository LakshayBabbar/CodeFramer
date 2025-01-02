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
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
