import { auth } from "@/auth";
import prisma from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const session = await auth();
    try {
        const { title, content, tags, description } = body;
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");

        const tagsArray = tags.split(",").map((tag: string) => tag.trim());

        await prisma.blog.create({
            data: {
                title,
                content,
                tags: tagsArray,
                authorId: session?.user.id!,
                slug,
                description,
            }
        });

        return NextResponse.json({
            message: "Blog created successfully",
            slug
        }, { status: 201 });

    } catch (error: any) {
        console.log(error.message);
        if (error.code === "P2002") {
            return NextResponse.json({ error: "Blog with this title already exists." }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

export const PUT = async (req: NextRequest) => {
    const body = await req.json();
    try {
        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: body
        })
        return NextResponse.json(blog, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json();
        await prisma.blog.delete({
            where: {
                id: body.id
            }
        });
        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};