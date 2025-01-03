import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/db";
import { auth } from "@/auth";

export async function DELETE(req: NextRequest, props: { params: Promise<{ uid: string }> }) {
    const params = await props.params;
    try {
        const { uid } = params;
        const session = await auth();
        const userId = session?.user?.id;
        if (!userId || userId !== uid) {
            return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
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
        return NextResponse.json(
            { message: "Account closed successfully." },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}