import { auth } from "@/auth";
import prisma from "@/config/db";
import { revalidatePath } from "next/cache";
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
    const session = await auth();
    try {
        const blog = await prisma.blog.findUnique({
            where: {
                id: body.id
            }
        });

        if (!blog) {
            return NextResponse.json({ error: "Blog not found." }, { status: 404 });
        }
        if (session?.user.id !== blog?.authorId) {
            return NextResponse.json({ error: "You are not authorized to update this blog." }, { status: 403 });
        }

        await prisma.blog.update({
            where: {
                id: body.id
            },
            data: body
        })
        revalidatePath(`/blogs/${blog.slug}`);
        return NextResponse.json({ message: "Blog updated." }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export const DELETE = async (req: NextRequest) => {
    const body = await req.json();
    try {
        const session = await auth();
        const blog = await prisma.blog.findUnique({
            where: {
                id: body.id
            }
        });

        if (session?.user.id !== blog?.authorId) {
            return NextResponse.json({ error: "You are not authorized to delete this blog." }, { status: 403 });
        }

        await prisma.blog.delete({
            where: {
                id: body.id
            }
        });

        revalidatePath(`/blogs/${blog?.slug}`);
        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};