import { signIn } from "@/auth"
import Image from "next/image"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { IconBrandGithub, IconBrandGoogleFilled } from "@tabler/icons-react";
import { Metadata } from "next";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "CodeFramer Sign-In: Access Your Online IDE & Project Dashboard",
  description: "Sign in to CodeFramer and access your personalized online IDE, project dashboard, and coding environments. Manage your projects, collaborate, and start coding right away.",
}

export default function SignIn() {
  return <>
    <main className="flex items-center justify-between h-screen w-full">
      <div className="w-1/2 h-full hidden md:block">
        <Image src="/sign-in.webp" width={1000} height={1000} alt="Sign in to codeframer" className="size-full object-cover aspect-square" />
      </div>
      <div className="md:w-1/2 h-screen flex items-center justify-center md:justify-start md:items-start">
        <div className="space-y-4 md:w-4/5 md:mt-36 text-center md:text-left place-items-center md:place-items-start px-10">
          <h1 className="text-5xl font-bold">Welcome To CodeFramer</h1>
          <p className="text-xl dark:text-neutral-300 text-neutral-700">CodeFramer is your all-in-one online IDE and compiler for Python, C, C++, Node.js, Sql and web projects with real-time output and AI assistance.</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <form
              action={async () => {
                "use server"
                await signIn("github", { redirectTo: "/dashboard" })
              }}
            >
              <HoverBorderGradient className="flex gap-2 py-2"><IconBrandGithub />Continue with Github</HoverBorderGradient>
            </form>
            <form
              action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/dashboard" })
              }}
            >
              <HoverBorderGradient className="bg-neutral-100 text-black flex gap-2 py-2"><IconBrandGoogleFilled />Continue with Google</HoverBorderGradient>
            </form>
          </div>
          <div className="-z-10 w-1/2 h-1/3 md:w-1/3 fixed rounded-full md:h-1/4 -rotate-12 -right-10 bottom-0 bg-gradient-to-br from-purple-600 to-blue-800 dark:blur-[200px] blur-[150px]" />
        </div>
      </div>
    </main>
    <Footer />
  </>
} 