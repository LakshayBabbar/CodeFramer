"use client";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer/Footer";
import {
  Code2Icon,
} from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { FeaturesSection } from "@/components/ui/FeaturesSection";
import Link from "next/link";
import { Meteors } from "@/components/ui/meteors";
import ProjectCard, { ProjectCardProps } from "@/components/ui/ProjectCard";
import SearchBar from "@/components/Search/SearchBar";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [data, setData] = useState({ searchResults: { projects: [], totalPages: 1 }, loading: false, error: "" });
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page")!) || 1;
  const [pageNo, setPageNo] = useState(page);

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
            <span>CodeFramer</span>
          </HoverBorderGradient>
        </div>
        <h1 className="px-4 text-5xl sm:text-6xl xl:text-7xl font-bold md:w-[60%] text-center text-stone-800 drop-shadow-lg dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-neutral-300 dark:to-neutral-500">
          Build, Compile, and Create Effortlessly
        </h1>
        <p className="w-4/5 sm:w-[50%] text-center sm:text-xl text-neutral-600 dark:text-neutral-300">
          CodeFramer is your all-in-one online IDE and compiler for Python, C, C++, Node.js, Sql and web projects with real-time output and AI assistance.
        </p>
        <div className="flex gap-4">
          <Link href="/compiler/python"><Button
          >
            Try Compilers
          </Button></Link>
          <Link href="/web-editor"><Button variant="outline" >
            Try Web Editor
          </Button></Link>
        </div>
        <Meteors />
      </section>

      <section className="w-full py-10 sm:py-20 h-fit relative overflow-hidden">
        <FeaturesSection />
        <div className="absolute bottom-0 w-full h-[500px] bg-gradient-to-t from-gray-300 dark:from-neutral-900 to-transparent blur-2xl"></div>
      </section>
      <section id="snippets" className="px-5 py-10 sm:py-20 flex gap-10 flex-col text-center items-center w-full border-y">
        <div>
          <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">Explore Code Snippets & Web Projects</h4>
          <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">Browse a collection of publicly shared code snippets and web projects. Share your work, explore innovative solutions, and collaborate with the developer community.</p>
        </div>
        <SearchBar placeholder="Search Code Snippets and projects" setSearchResults={setData} url={`/api/projects/public?page=${page}&limit=8&search=`} />
        <div className="flex flex-wrap gap-4 justify-center">
          {!data?.loading ? data?.searchResults.projects?.length !== 0 ? data.searchResults.projects?.map((project: ProjectCardProps) => {
            return <ProjectCard key={project.id} data={project} />
          }) : <p>No Snippets founds.</p> : <p className="text-center">Loading...</p>}
        </div>
        <div className="space-x-4">
          {page > 1 && <Link href={`/?page=${page - 1}#snippets`} className="py-2 px-4 bg-primary text-primary-foreground rounded-md disabled:opacity-65 disabled:cursor-not-allowed">Previous</Link>}
          {page < data.searchResults.totalPages && <Link href={`/?page=${page + 1}#snippets`} className="py-2 px-4 text-primary bg-secondary rounded-md disabled:opacity-30 disabled:cursor-not-allowed">Next</Link>}
        </div>
      </section>
      <Footer />
      <div className="absolute -top-10 -left-10 w-3/5 sm:w-1/2 h-1/3 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-700 dark:to-purple-800 blur-[120px] -z-10 -rotate-12" />
    </main>
  );
}