import prisma from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ slug: string | undefined }> }) => {
    try {
        const { slug } = await params;
        const blog = await prisma.blog.findUnique({
            where: {
                slug
            },
            select: {
                id: true,
                title: true,
                description: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                slug: true,
                tags: true,
                User: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                    }
                }
            }
        });
        if (!blog) {
            return NextResponse.json({
                error: "Blog not found"
            }, { status: 404 });
        }
        return NextResponse.json(blog, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}