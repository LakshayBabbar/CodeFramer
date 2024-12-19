import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();
    try {
        const response = await fetch(process.env.GEMINI_API || "", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt,
                            },
                        ],
                    },
                ],
            }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        let result = data.candidates[0]?.content?.parts[0]?.text || "";
        const regex = /```(?:\w+)?\n([\s\S]*?)```/g;
        const match = regex.exec(result);
        result = match ? match[1] : result;
        return NextResponse.json({ data: result }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}