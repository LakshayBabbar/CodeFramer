"use client";
import { useState } from "react";
import CreateProject from "@/components/Modals/CreateProject";
import ProjectCard, { ProjectCardProps } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";

const Page = () => {
  const { data: sessionData } = useSession();
  const username = sessionData?.user?.username;
  const [isOpen, setIsOpen] = useState(false);
  const { data, isError, loading, refetch } = useFetch(
    "/api/projects",
    "All_Projects"
  );

  if (isError) {
    return (
      <main>
        <p className="text-center mt-32">Something went wrong,&nbsp;Please try again later.</p>
      </main>
    );
  }

  return !isError && (
    <main className="flex flex-col w-full justify-center items-center gap-10">
      <section className="h-44 flex flex-col w-full sm:w-3/4 bg-dot-black dark:bg-dot-white/[0.8] relative items-center">
        <Image
          src={sessionData?.user?.image || "/user.webp"}
          width={120}
          height={120}
          className="rounded-full absolute -bottom-10"
          alt="user image"
        />
      </section>
      <section className="w-4/5 xl:w-4/5 space-y-10 mt-5">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-xl font-bold text-center">
            Welcome, {username}
          </h1>
          <p className="max-w-[35rem] text-sm text-center">
            Your centralized platform for efficient project management and real-time progress tracking, empowering you to achieve more with less effort.
          </p>
        </div>
        <hr className="border w-full" />
        <div className="flex w-full justify-between items-center">
          <h2 className="text-xl font-bold">Your Project&apos;s</h2>
          <Button
            onClick={() => setIsOpen(true)}
          >
            Create New
          </Button>
        </div>
        <div className="w-full flex flex-wrap gap-4">
          {!loading ? (
            <>
              {data?.length > 0 ? (
                data?.map((item: ProjectCardProps) => {
                  return (
                    <ProjectCard key={item.id} data={{ ...item, refetch }} />
                  );
                })
              ) : (
                <p className="text-center w-full">No project found.</p>
              )}
            </>
          ) : (
            <>
              {Array.from({ length: 6 }).map((_, i) => {
                return (
                  <div key={i} className="w-full sm:max-w-80 p-8 rounded-xl space-y-4">
                    <Skeleton className="h-10 w-[200px]" />
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-4 w-[120px]" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-6 w-[60px]" />
                      <Skeleton className="h-6 w-[20px]" />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>
      <Footer />
      <CreateProject isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  );
};

export default Page;