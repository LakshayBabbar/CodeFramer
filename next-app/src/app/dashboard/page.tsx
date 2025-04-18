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
      <div className="px-5 w-fit space-y-10 mb-10 mt-5">
        <div className="h-44 flex flex-col w-full bg-dot-black dark:bg-dot-white/[0.8] relative items-center">
          <Image
            src={sessionData?.user?.image || "/user.webp"}
            width={120}
            height={120}
            className="rounded-full absolute -bottom-10"
            alt="user image"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="mt-2 text-xl font-bold text-center">
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
        {!loading ? data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4">
            {data?.map((item: ProjectCardProps['data']) => {
              return (
                <ProjectCard key={item.id} data={{ ...item, refetch }} controls={true} />
              );
            })}
          </div>
        ) : <div className="w-[80vw] text-center">
          <p>No Project found.</p>
        </div> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4">
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
          </div>
        )}
      </div>
      <CreateProject isOpen={isOpen} setIsOpen={setIsOpen} />
      <Footer />
    </main>
  );
};

export default Page;