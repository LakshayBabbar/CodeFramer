import { NextResponse } from "next/server";
import prisma from "@/config/db";

export async function GET() {
    try {
        // Total users
        const totalUsers = await prisma.user.count();

        // Provider statistics
        const providerStats = await prisma.account.groupBy({
            by: ["provider"],
            _count: {
                provider: true,
            },
        });
        const providers = providerStats.map((p) => ({
            name: p.provider,
            count: p._count.provider,
        }));

        // Total projects and project type stats
        const totalProjects = await prisma.project.count();
        const projectStats = await prisma.project.groupBy({
            by: ["type"],
            _count: {
                type: true,
            },
        });
        const projectTypes = projectStats.map((proj) => ({
            name: proj.type,
            count: proj._count.type,
        }));

        // Language statistics for COMPILER projects
        const langStats = await prisma.language.groupBy({
            by: ["name"],
            _count: {
                name: true,
            },
            where: {
                project: {
                    type: {
                        equals: "COMPILER",
                    },
                },
            },
        });
        const languages = langStats.map((lang) => ({
            name: lang.name,
            count: lang._count.name,
        }));

        // Final response
        return NextResponse.json({
            success: true,
            data: {
                totalUsers,
                totalProjects,
                providers,
                projectTypes,
                languages,
            },
        });
    } catch (error) {
        console.error("Error fetching statistics:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Internal server error.",
            },
            { status: 500 }
        );
    }
}
