"use server";
import { auth } from "@/auth";
import prisma from "@/config/db";
import { cookies } from "next/headers";
import { Resend } from "resend";

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

export async function getData({ url, cache = false }: { url: string; cache?: boolean }) {
    try {
        const token = await getToken();

        const res = await fetch(process.env.BASE_URL + url, {
            headers: {
                "Content-Type": "application/json",
                Cookie: `${token?.name}=${token?.value}`
            },
            cache: cache ? "force-cache" : "no-store",
        });

        const result = await res.json();
        if (!res.ok || result?.error) {
            throw new Error(result.error || "Unknown error occurred while fetching data.");
        }
        return result;
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function getToken() {
    const token = (await cookies()).get("authjs.session-token");
    return token;
}

export async function newSupportRequest(data: { name: string, email: string, message: string }) {
    try {
        const session = await auth();
        if (!session) {
            throw new Error("You need to login to send a support request.");
        }
        if (!data.name || !data.email || !data.message) {
            throw new Error("All fields are required.");
        }
        await prisma.inquiries.create({
            data: {
                name: data.name,
                email: data.email,
                message: data.message
            }
        });
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
            from: 'CodeFramer <onboarding@resend.dev>',
            to: ['lakshaybabbar0118@gmail.com'],
            subject: 'New support request from your codeframer',
            html: `Name: ${data.name}<br>Email: ${data.email}<br>Message: ${data.message}`,
        });

        if (error) {
            throw new Error(error.message || "Unknown error occurred while sending the support request.");
        }

        return { message: "Support request sent successfully." };
    } catch (error: any) {
        return { error: error.message };
    }
}

export const updateSupportRequest = async (id: string, type?: string) => {
    try {
        const session = await auth();
        if (session?.user?.role !== "ADMIN" || !session) {
            throw new Error("You need to login to update a support request.");
        }
        const inquiry = await prisma.inquiries.findUnique({
            where: { id }
        });
        if (!inquiry) {
            throw new Error("Support request not found.");
        }
        if (type === "close") {
            await prisma.inquiries.update({
                where: { id },
                data: { closed: true }
            });
            return { message: "Support request closed successfully." };
        }
        await prisma.inquiries.delete({
            where: { id }
        });
        return { message: "Support request deleted successfully." };
    } catch (error: any) {
        return { error: error.message };
    }
};

export const getServerState = async () => {
    try {
        const req = await fetch(`${process.env.COMPILER_API}/status`);
        if (!req.ok) {
            throw new Error("Something went wrong.");
        }
        const res = await req.json();
        return res;
    } catch (error: any) {
        return { error: error.message };
    }
};