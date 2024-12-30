"use client";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer/Footer";
import {
  Code2Icon,
  Layers,
  Monitor,
} from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { FeaturesSection } from "@/components/ui/FeaturesSection";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Spotlight, SpotLightItem } from "@/components/ui/spotlight";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center">
      <section className="mt-14 relative flex flex-col gap-8 py-20 h-fit w-full items-center justify-center overflow-hidden rounded-lg">
        <div className="flex justify-center text-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="px-4 py-1 flex items-center justify-center space-x-2"
          >
            <Code2Icon className="size-5" />
            <span className="font-mono">CodeFramer</span>
          </HoverBorderGradient>
        </div>
        <h1 className="px-4 text-5xl md:text-7xl font-bold md:w-[60%] text-center text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-600 dark:from-neutral-300 dark:to-neutral-500">
          Build, Compile, and Create Effortlessly
        </h1>
        <p className="w-4/5 sm:w-[50%] text-center sm:text-xl text-neutral-800 dark:text-neutral-300">
          CodeFramer is your all-in-one online IDE and compiler for Python, C, C++, Node.js, and web projects with real-time output and AI assistance.
        </p>
        <div className="flex gap-4">
          <Button
            onClick={() => router.push("/compiler/python")}
          >
            Try Compilers
          </Button>
          <Button variant="outline" onClick={() => router.push("/web-editor")}>
            Try Web Editor
          </Button>
        </div>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={0.5}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] sm:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 -z-10",
          )}
        />
      </section>

      <section className="w-full py-20 h-fit relative overflow-hidden">
        <FeaturesSection />
        <div className="absolute bottom-0 w-full h-[500px] bg-gradient-to-t from-neutral-300 dark:from-neutral-900 to-transparent blur-2xl"></div>
      </section>

      <section className="px-5 py-20 flex gap-10 flex-col text-center items-center w-full border-y">
        <div>
          <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">More Reasons to Choose CodeFramer</h4>
          <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">Explore even more features designed to elevate your coding experience and make development faster, smarter, and more efficient.</p>
        </div>
        <Spotlight className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full xl:w-3/4">
          {features.map((feature, idx) => {
            return <SpotLightItem key={idx} className="dark:text-neutral-300 text-neutral-700 drop-shadow-xl">
              <div className="relative z-10 rounded-lg p-4 bg-gradient-to-b from-neutral-50 to-neutral-200 dark:from-[#0c0c0c] dark:to-[#252525] w-full h-full mx-auto flex flex-col items-center justify-center text-center">
                <feature.icon size={140} strokeWidth={1.4} />
                <p className="text-2xl font-bold mt-4">{feature.title}</p>
                <p>{feature.description}</p>
              </div>
            </SpotLightItem>
          })}
        </Spotlight>
      </section>
      <Footer />
    </main>
  );
}


const features = [
  {
    title: "Smart Code Editor",
    description:
      "Enhance productivity with real-time code suggestions and auto-completion.",
    icon: Code2Icon,
  },
  {
    title: "Project Management",
    description:
      "Manage multiple projects of different languages and environments through the user dashboard.",
    icon: Layers,
  },
  {
    title: "Live Preview",
    description:
      "Get instant feedback and quicker debugging with real-time output as you type.",
    icon: Monitor,
  },
];