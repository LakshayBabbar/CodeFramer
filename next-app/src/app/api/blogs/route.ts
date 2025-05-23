import { NextResponse } from "next/server"
import prisma from "@/config/db";

export const GET = async () => {
    try {
        const blogs = await prisma.blog.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                featured: true,
                slug: true,
                thumbnail: true,
                User: {
                    select: {
                        username: true,
                    }
                },
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        if (!blogs) {
            return NextResponse.json({
                error: "No blogs found",
            }, { status: 404 })
        }
        return NextResponse.json(blogs, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}