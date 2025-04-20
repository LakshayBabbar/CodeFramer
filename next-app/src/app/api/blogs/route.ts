import { NextResponse } from "next/server"
import prisma from "@/config/db";

export const GET = async () => {
    try {
        const blogs = await prisma.blog.findMany({});
        if (!blogs) {
            return NextResponse.json({
                error: "No blogs found",
            }, { status: 404 })
        }
        return NextResponse.json(blogs, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}