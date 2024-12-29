export const revalidate = 0;

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "@/config/db";

export async function DELETE() {
  try {
    const Headers = headers();
    const authData = await JSON.parse(Headers.get("authData") || "");

    const user = await prisma.user.findUnique({
      where: {
        id: authData?.id,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    })

    const res = NextResponse.json(
      { message: "Account closed successfully." },
      { status: 200 }
    );
    res.cookies.set("authToken", " ", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      expires: new Date(0),
    });
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
