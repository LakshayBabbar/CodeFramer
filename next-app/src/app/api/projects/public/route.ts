import { NextResponse, NextRequest } from "next/server";
import prisma from "@/config/db";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        const userId = session?.user.id;
        const searchParams = req.nextUrl.searchParams;
        const limit = searchParams.get('limit') as string;
        const search = searchParams.get("search") || "";
        const page = parseInt(searchParams.get('page') || '1');
        const limitValue = parseInt(limit) || 10;
        const skip = (page - 1) * limitValue;

        const totalCount = await prisma.project.count({
            where: {
                isPublic: true,
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        languages: {
                            some: {
                                name: {
                                    contains: search,
                                    mode: "insensitive",
                                }
                            }
                        }
                    }
                ]
            }
        });

        const totalPages = Math.ceil(totalCount / limitValue);
        console.log(search)
        const projects = await prisma.project.findMany({
            select: {
                id: true,
                name: true,
                user: {
                    select: {
                        username: true,
                        id: true
                    }
                },
                isPublic: true,
                type: true,
                languages: {
                    select: {
                        name: true
                    }
                },
                createdAt: true,
            },
            where: {
                isPublic: true,
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        languages: {
                            some: {
                                name: {
                                    contains: search,
                                    mode: "insensitive",
                                }
                            }
                        }
                    },
                    {
                        user: {
                            username: {
                                contains: search,
                                mode: "insensitive",
                            },
                        }
                    }
                ]
            },
            orderBy: {
                views: "desc"
            },
            take: limitValue,
            skip: skip,
        });

        const filteredProjects = projects.map(project => {
            return { ...project, isOwner: userId === project.user.id };
        });

        return NextResponse.json({
            projects: filteredProjects,
            totalPages
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
