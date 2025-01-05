"use server";
import { cookies } from "next/headers";

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

export async function getData({ url }: { url: string }) {
    try {
        const token = await getToken();
        const res = await fetch(process.env.BASE_URL + url, {
            headers: {
                "Content-Type": "application/json",
                Cookie: `${token?.name}=${token?.value}`
            }
        });
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.error || "Unknown error occurred while fetching data.");
        }
        return result;
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function getToken() {
    const cookie = (await cookies()).getAll();
    const token = cookie.find((c: any) => c.name.includes('authjs.session-token'));
    return token;
}