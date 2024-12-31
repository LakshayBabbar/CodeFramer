import { NextResponse } from "next/server";
import prisma from "@/config/db";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    await auth.protect();
    const { userId } = await auth();
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
  } finally {
    await prisma.$disconnect();
  }
}
