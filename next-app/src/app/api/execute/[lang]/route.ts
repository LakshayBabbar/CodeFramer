import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: { lang: string } }) => {
    try {
        const { lang } = params;
        const { code, inputs } = await req.json();
        const data = await fetch(`${process.env.COMPILER_API || ""}/execute/${lang}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code,
                inputs,
                access_key: process.env.COMPILER_SECRET,
            }),
        });
        const res = await data.json();
        if (res?.error) {
            throw new Error(res?.error);
        }
        return NextResponse.json(res);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Internal Server Error",
        }, { status: 500 });
    }
}