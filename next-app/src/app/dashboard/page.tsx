"use client";
import { useState } from "react";
import CreateProject from "@/components/Modals/CreateProject";
import ProjectCard, { ProjectCardProps, ProjectCardSkeleton } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
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
      <div className="px-5 w-fit space-y-10 mb-10">
        <div className="h-44 flex flex-col w-full relative items-center">
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
                <ProjectCardSkeleton key={i} />
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