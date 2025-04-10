import { signIn } from "@/auth"
import { IconBrandGithub, IconBrandGoogleFilled } from "@tabler/icons-react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export const metadata: Metadata = {
  title: "CodeFramer Sign-In: Access Your Online IDE & Project Dashboard",
  description: "Sign in to CodeFramer and access your personalized online IDE, project dashboard, and coding environments. Manage your projects, collaborate, and start coding right away.",
  keywords: "CodeFramer, sign in, online IDE, project dashboard, coding environments, code collaboration",
}

export default function SignIn() {
  return <>
    <main className="flex items-center justify-between h-screen w-full overflow-hidden">
      <div className="w-full md:w-1/2 xl:w-2/5 h-screen px-5 flex items-center justify-center">
        <div className="space-y-4 max-w-96">
          <h1 className="text-5xl font-light">Your Dev Space in the Cloud.</h1>
          <p>Log in to start coding, compiling, and creating—all from your browser.</p>
          <div className="flex flex-wrap gap-4">
            <form
              action={async () => {
                "use server"
                await signIn("github", { redirectTo: "/dashboard" })
              }}
            >
              <Button variant="outline" size="lg" className="rounded-2xl"><IconBrandGithub />Github</Button>
            </form>
            <form
              action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/dashboard" })
              }}
            >
              <Button size="lg" className="rounded-2xl"><IconBrandGoogleFilled />Google</Button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-1/2 xl:w-3/5 h-screen hidden md:block">
        <BackgroundGradientAnimation>
          <div className="absolute z-50 inset-0 flex flex-col items-center justify-center">
            <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 font-bold px-4 pointer-events-none text-3xl text-center md:text-6xl lg:text-7xl">
              CodeFramer
            </p>
            <p className="text-xl mt-2 bg-clip-text font-semibold text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">Write Code Anywhere, Anytime.</p>
          </div>
        </BackgroundGradientAnimation>
      </div>
    </main>
  </>
} 