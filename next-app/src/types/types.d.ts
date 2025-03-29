import NextAuth from "next-auth"
import { User } from "@prisma/client"

declare module "next-auth" {
    interface User {
        username?: string
        role?: "USER" | "ADMIN"
    }
    interface Session {
        user: User
    }
}