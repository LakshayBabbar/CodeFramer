import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { generateUniqueUsername } from "./lib/helpers"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./config/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
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
  }), Github({
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

  session: {
    strategy: "jwt"
  }, callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
      }
      if (trigger === "update" && session) {
        token.username = session.username;
        token.name = session.name;
        token.email = session.email;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as "USER" | "ADMIN";
      session.user.username = token.username as string;
      return session;
    },
  }
})