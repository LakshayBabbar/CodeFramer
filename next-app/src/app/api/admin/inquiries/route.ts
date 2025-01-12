import prisma from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const inquiries = await prisma.inquiries.findMany({});
        return NextResponse.json(inquiries);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred." }, { status: 500 });
    }
}