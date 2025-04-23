import { auth } from "@/auth";
import prisma from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized access." }, { status: 401 })
        }
        const inquiries = await prisma.inquiries.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                message: true,
                createdAt: true,
            }
        });
        return NextResponse.json(inquiries);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred." }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized access." }, { status: 401 })
        }
        const { id } = await request.json();
        if (!id) {
            return NextResponse.json({ error: "ID is required." }, { status: 400 });
        }
        await prisma.inquiries.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Inquiry deleted successfully." });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred." }, { status: 500 });
    }
}