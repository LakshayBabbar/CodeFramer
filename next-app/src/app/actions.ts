"use server";

export async function execute(body: { lang: string, code: string, inputs?: string }) {
    try {
        const res = await fetch(`${process.env.COMPILER_API}/execute/${body.lang}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...body, access_key: process.env.COMPILER_SECRET })
        });
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.error || "Unknown error occurred while executing the code.");
        }
        return result;
    } catch (error: any) {
        return { error: error.message };
    }
}