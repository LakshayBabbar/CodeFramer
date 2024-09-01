"use client";
import { Button } from "@/components/ui/button";
import CreateProject from "@/components/Modals/CreateProject";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { Code2Icon, ChevronRight } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const words = ["Simplified", "Streamlined", "Effortless", "Seamless"];
  return (
    <main className="flex flex-col items-center justify-center">
      <motion.section
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center my-[20vh] gap-5 text-center w-full relative"
      >
        <div className="flex justify-center text-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-slate-950 bg-slate-100 text-black dark:text-white flex items-center space-x-2"
          >
            <Code2Icon />
            <span className="font-[500] ">CodeFramer</span>
          </HoverBorderGradient>
        </div>
        <h1 className="text-6xl sm:text-[6rem] max-w-[40rem] font-[600] text-center bg-clip-text text-transparent bg-gradient-to-r dark:from-slate-50 dark:to-slate-300 from-slate-950 to-slate-600">
          Code <br />
          <FlipWords
            words={words}
            className="text-slate-900 dark:text-slate-200"
          />
        </h1>
        <p className="w-4/5 md:w-[32rem] sm:text-xl dark:text-slate-300 font-[500]">
          CodeFramer simplifies coding with no setup, offering fast, effortless
          development with autocompletion.
        </p>
        <div className="flex flex-col gap-4 w-3/5 sm:w-80">
          <Button onClick={() => setIsOpen(true)} className="bg-indigo-700 hover:bg-indigo-600 text-white" size="lg">
            Getting Started for free
          </Button>
          <Link
            href="/web-editor"
            className="font-[600] dark:text-slate-300 dark:hover:text-slate-200 flex items-center gap-1 hover:gap-2 justify-center transition-all ease-in-out duration-200"
          >
            Try our Editor<ChevronRight className="size-5" />
          </Link>
        </div>
      </motion.section>
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-slate-800 dark:text-slate-200">
                Unleash the power of our <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Robust Editor
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`/editor.png`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top contrast-[114%] brightness-125"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      <div class="fixed top-0 -z-10 h-full w-full">
        <div class="fixed bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(172,100,255,0.6)] opacity-50 blur-[80px]"></div>
      </div>
      <Footer />
      <CreateProject isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  );
}
