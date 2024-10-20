"use client";
import { Button } from "@/components/ui/button";
import CreateProject from "@/components/Modals/CreateProject";
import { useState } from "react";
import Footer from "@/components/Footer/Footer";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import {
  Code2Icon,
  ChevronRight,
  ShieldCheck,
  Bot,
  Users,
  Monitor,
} from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const words = ["Simplified", "Streamlined", "Effortless", "Seamless"];

  const features = [
    {
      title: "Smart Code Editor",
      description:
        "Speed up your workflow with real-time code suggestions and auto-completion, designed to enhance productivity.",
      icon: Code2Icon,
    },
    {
      title: "AI Assistance",
      description:
        "Get immediate help and code suggestions from our AI chatbot, streamlining your coding experience.",
      icon: Bot,
    },
    {
      title: "Secure Login",
      description:
        "Protect your account with advanced authentication methods, ensuring your data remains safe and secure.",
      icon: ShieldCheck,
    },
    {
      title: "Real-Time Output",
      description:
        "See the results of your code instantly as you type, allowing for immediate feedback and quicker debugging.",
      icon: Monitor,
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center">
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center mt-[20vh] mb-[10vh] gap-5 text-center w-full relative"
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
        <h1 className="text-6xl sm:text-[6rem] max-w-[40rem] font-[600] text-center text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-700">
          Code <br />
          <FlipWords
            words={words}
            className="text-slate-700 dark:text-slate-200"
          />
        </h1>
        <p className="w-4/5 md:w-[32rem] sm:text-xl dark:text-slate-300 text-slate-700">
          CodeFramer simplifies coding with
          <strong>
            {" "}
            no setup, offering fast, effortless development{" "}
          </strong>{" "}
          with autocompletion.
        </p>
        <div className="flex flex-col gap-4 w-3/5 sm:w-80">
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-br hover:shadow-md hover:bg-gradient-to-tl hover:from-indigo-500 hover:to-purple-700 ring-2 dark:ring-indigo-800 ring-indigo-300 from-indigo-500 to-purple-700 text-white rounded-3xl"
            size="lg"
          >
            Getting Started for free
          </Button>
          <Link
            href="/web-editor"
            className="font-[600] dark:text-slate-300 dark:hover:text-slate-200 flex items-center gap-1 hover:gap-2 justify-center transition-all ease-in-out duration-200"
          >
            Try our Editor
            <ChevronRight className="size-5" />
          </Link>
        </div>
      </motion.section>
      <section className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-xl md:text-4xl font-semibold px-4">
                <span className="font-[700] text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">
                  Harness Our
                </span>
                <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-slate-700 dark:text-slate-100">
                  Powerful Editor
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
            className="mx-auto rounded-2xl object-cover h-full object-left-top contrast-[114%] border"
            draggable={false}
          />
        </ContainerScroll>
      </section>
      <section>
        <h2 className="text-4xl font-bold text-center mb-10">
          Key{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">
            Features
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 justify-items-center gap-4">
          {features.map((feature, index) => (
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-5 dark:border dark:border-neutal-800 rounded-md shadow-xl w-4/5 sm:w-[20rem] h-64 flex flex-col items-center gap-2 bg-primary-foreground/25"
              key={index}
            >
              <feature.icon className="size-14" />
              <h3 className="text-xl font-[700]">{feature.title}</h3>
              <p className="dark:text-gray-400 text-gray-600 font-semibold text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="fixed bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full dark:bg-[rgba(172,100,255,0.6)] bg-[rgba(134,90,255,0.77)] opacity-50 blur-[80px]"></div>
      </div>
      <Footer />
      <CreateProject isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  );
}
