import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/config/db";

export async function GET() {
  try {
    const Headers = headers();
    const authData = await JSON.parse(Headers.get("authData") || "");
    const projects = await prisma.project.findMany({
      where: {
        userId: authData.id,
      },
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
