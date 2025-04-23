import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google";
import { generateUniqueUsername } from "./lib/helpers";

export default {
    providers: [Google({
        async profile(profile) {
            const username = await generateUniqueUsername(profile.email.split("@")[0]);
            return {
                name: profile.name,
                email: profile.email,
                image: profile.picture,
                id: profile.sub,
                username
            }
        },
        allowDangerousEmailAccountLinking: true
    }), GitHub({
        async profile(profile) {
            const username = await generateUniqueUsername(profile.login);
            return {
                id: profile.id.toString(),
                name: profile.name,
                email: profile.email,
                image: profile.avatar_url,
                username
            }
        },
        allowDangerousEmailAccountLinking: true
    })],
} satisfies NextAuthConfig