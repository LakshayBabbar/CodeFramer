import { NextResponse } from "next/server";
import prisma from "@/config/db";

export async function GET() {
    try {
        const [
            totalUsers,
            totalOpenedInquiries,
            totalClosedInquiries,
            providerStats,
            totalProjects,
            projectStats,
            langStats,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.inquiries.count({
                where: { closed: false },
            }),
            prisma.inquiries.count({
                where: { closed: true },
            }),
            prisma.account.groupBy({
                by: ["provider"],
                _count: { provider: true },
            }),
            prisma.project.count(),
            prisma.project.groupBy({
                by: ["type"],
                _count: { type: true },
            }),
            prisma.language.groupBy({
                by: ["name"],
                _count: { name: true },
                where: {
                    project: {
                        type: "COMPILER",
                    },
                },
            }),
        ]);

        // Formatting the response
        const providers = providerStats.map((p) => ({
            name: p.provider,
            count: p._count.provider,
        }));

        const projectTypes = projectStats.map((proj) => ({
            name: proj.type,
            count: proj._count.type,
        }));

        const languages = langStats.map((lang) => ({
            name: lang.name,
            count: lang._count.name,
        }));

        return NextResponse.json({
            success: true,
            data: {
                totalUsers,
                totalProjects,
                totalOpenedInquiries,
                totalClosedInquiries,
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
