import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();
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
                        type: "OBJECT",
                        properties: { code: { type: "STRING" } },
                    },
                },
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch AI response");
        }

        const data = await response.json();
        const result = JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text || "");
        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}