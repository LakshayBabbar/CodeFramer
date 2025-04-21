import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/db";
import { auth } from "@/auth";

export async function PUT(req: NextRequest, props: { params: Promise<{ uid: string }> }) {
    try {
        const params = await props.params;
        const { uid } = params;
        const session = await auth();
        const userId = session?.user?.id;
        if (!userId && userId !== uid) {
            return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
        }
        const reqBody = await req.json();
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                username: reqBody.username.trim().toLowerCase(),
                email: reqBody.email.trim().toLowerCase(),
                name: reqBody.name,
            }
        });
        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }
        return NextResponse.json({ message: "Profile updated." }, { status: 200 });
    } catch (error: any) {
        if (error.message.includes("Unique constraint failed")) {
            return NextResponse.json({ error: "Email or Username already exists." }, { status: 409 });
        }
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
};

export async function DELETE(req: NextRequest, props: { params: Promise<{ uid: string }> }) {
    const params = await props.params;
    try {
        const { uid } = params;
        const session = await auth();
        const userId = session?.user?.id;
        if (!userId && userId !== uid) {
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