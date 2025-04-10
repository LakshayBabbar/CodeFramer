import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
    try {
        const dailyLimit = (await cookies()).get("copilot-limit")?.value || 0;
        const { prompt } = await req.json();
        const session = await auth();
        if (!session && Number(dailyLimit) >= 3) {
            return NextResponse.json(
                {
                    error: "Daily usage limit exceeded. Please log in to continue accessing this feature."
                },
                { status: 429 }
            );
        }

        const response = await fetch(process.env.CODE_AI_API || "", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    response_mime_type: "application/json",
                    response_schema: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                languageName: { type: "string" },
                                updatedCode: { type: "string" }
                            },
                        },
                    },
                },
            }),
        });
        if (!response.ok) {
            throw new Error("Failed to fetch AI response");
        }

        const data = await response.json();
        const result = JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text || []);
        let res = NextResponse.json(result, { status: 200 });

        res.cookies.set("copilot-limit", String(Number(dailyLimit) + 1), {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });
        return res;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}