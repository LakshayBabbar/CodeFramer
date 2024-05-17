"use client";
import { Button } from "@/components/ui/button";
import CreateProject from "@/components/Modals/CreateProject";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <main className="flex justify-center dark:bg-grid-white/[0.06] bg-grid-black/[0.08]">
      <div className=" my-36 flex flex-col justify-center md:w-3/4 gap-10">
        <section className="flex flex-col items-center justify-center gap-5 text-center w-full relative py-10">
          <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 from-neutral-800 to-neutral-500  bg-opacity-50">
            Streamline and Simplify Your Coding
          </h1>
          <p className="w-4/5 md:w-[50rem]">
            CodeFramer makes coding simple and fast with no setup or
            installation required. Enjoy autocompletion and streamline your
            development process effortlessly.
          </p>
          <div className="space-x-4">
            <Button onClick={() => setIsOpen(true)}>Get Started</Button>
            <Button
              variant="outline"
              onClick={() => router.push("/auth?mode=signup")}
            >
              SignUp
            </Button>
          </div>
          <div className="absolute sm:h-[30rem] sm:w-5 dark:bg-primary bg-neutral-900 rounded-full blur-[100px] -rotate-45 bottom-0 left-10 -z-1" />{" "}
          <div className="absolute sm:h-[30rem] sm:w-5 dark:bg-primary bg-neutral-900 rounded-full blur-[100px] -rotate-45 top-0 right-0 -z-1" />
        </section>
        <marquee scrollamount="3" behavior="alternate">
          <ul className="flex gap-24 sm:gap-32 w-full text-3xl sm:text-4xl font-extrabold italic text-neutral-400 animate-scroll">
            <li>PYTHON</li>
            <li>JAVA</li>
            <li>C++</li>
            <li>JAVASCRIPT</li>
            <li>HTML5</li>
            <li>CSS3</li>
          </ul>
        </marquee>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 justify-items-center items-center gap-10 shadow-xl w-full">
          <div className="mt-10 w-4/5 md:w-auto bg-secondary rounded-lg p-5 space-y-5">
            <h1 className="text-2xl font-bold">Web Environment</h1>
            <p className="text-sm">
              Try our editor to experiment freely with features. Note that work
              won't be saved in try mode. Sign in for full functionality and
              secure storage of your creative projects, accessible from any
              device.
            </p>
            <Button onClick={() => router.push("/web-editor")}>
              Try the Editor
            </Button>
          </div>
          <div className="mt-10 w-4/5 md:w-auto  bg-secondary rounded-lg p-5 space-y-5 relative shadow-xl">
            <h1 className="text-2xl font-bold">Code Collaboration</h1>
            <span className="absolute p-1 text-sm bg-primary rounded-md -top-8 -right-2 text-white dark:text-black shadow-lg">
              Comming Soon
            </span>
            <p className="text-sm">
              Try our editor to experiment freely with features. Note that work
              won't be saved in try mode. Sign in for full functionality and
              secure storage of your creative projects, accessible from any
              device.
            </p>
            <Button className="bg-neutral-500 hover:bg-neutral-500 cursor-not-allowed">
              Start Collaboration
            </Button>
          </div>
          <div className="mt-10 w-4/5 md:w-auto bg-secondary rounded-lg p-5 space-y-5 relative shadow-xl">
            <h1 className="text-2xl font-bold">Online Compilers</h1>
            <span className="absolute p-1 text-sm bg-primary rounded-md -top-8 -right-2 text-white dark:text-black shadow-lg">
              Comming Soon
            </span>
            <p className="text-sm">
              Try our editor to experiment freely with features. Note that work
              won't be saved in try mode. Sign in for full functionality and
              secure storage of your creative projects, accessible from any
              device.
            </p>
            <Button className="bg-neutral-500 hover:bg-neutral-500 cursor-not-allowed">
              Try Compilers
            </Button>
          </div>
        </div>
      </div>
      <CreateProject isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  );
}
