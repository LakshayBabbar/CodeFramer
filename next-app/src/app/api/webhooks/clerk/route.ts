import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import prisma from '@/config/db'

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
    }
    const wh = new Webhook(SIGNING_SECRET)

    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt: WebhookEvent

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        return new Response('Error: Verification error', {
            status: 400,
        })
    }


    const eventType = evt.type

    // Handling 'user.created' event
    if (eventType === "user.created") {
        try {
            const { email_addresses, primary_email_address_id, username, first_name, last_name, id } = evt.data;

            // Safely find the primary email address
            const primaryEmail = email_addresses.find(
                (email) => email.id === primary_email_address_id
            );

            if (!primaryEmail) {
                console.error("No primary email found");
                return new Response("No primary email found", { status: 400 });
            }

            // Create the user in the database
            await prisma.user.create({
                data: {
                    id: id!,
                    username: username || "",
                    email: primaryEmail.email_address,
                    firstname: first_name || "",
                    lastname: last_name || "",
                    password: "",
                },
            });
        } catch (error) {
            console.error("Error creating user in database:", error);
            return new Response("Error creating user", { status: 500 });
        }
    }

    if (eventType === "user.deleted") {
        try {
            const { id } = evt.data;
            await prisma.user.delete({
                where: {
                    id: id!,
                },
            });
        } catch (error) {
            console.error("Error deleting user in database:", error);
            return new Response("Error deleting user", { status: 500 });
        }
    }

    if (eventType === "user.updated") {
        try {
            const { id, first_name, last_name, primary_email_address_id, email_addresses, username } = evt.data;
            await prisma.user.update({
                data: {
                    username: username || "",
                    firstname: first_name || "",
                    lastname: last_name || "",
                    email: email_addresses.find(
                        (email) => email.id === primary_email_address_id
                    )?.email_address,
                },
                where: {
                    id: id!,
                },
            });
        } catch (error) {
            console.error("Error updating user in database:", error);
            return new Response("Error updating user", { status: 500 });
        }
    }

    return new Response('Webhook received', { status: 200 })
}