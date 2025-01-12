import prisma from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = new URL(req.url).searchParams;
    const search = searchParams.get("search") || "";

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                createdAt: true,
                accounts: {
                    select: {
                        provider: true,
                    },
                },
            },
            where: {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        email: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ]
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return NextResponse.json(users, { status: 200 });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
