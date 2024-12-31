"use client";
import { useState } from "react";
import CreateProject from "@/components/Modals/CreateProject";
import ProjectCard, { ProjectCardProps } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import img from "@/../public/user.jpeg";
import useFetch from "@/hooks/useFetch";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@clerk/nextjs";

const Page = () => {
  const { isSignedIn: isAuth, session } = useSession();
  const username = session?.user?.fullName;
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, isError, loading, refetch } = useFetch(
    "/api/projects/all",
    "All_Projects"
  );

  if (isError) {
    return (
      <main>
        <p className="text-center mt-32">{error?.message}</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col w-full justify-center items-center gap-10">
      <section className="h-60 flex flex-col w-full sm:w-3/4 bg-dot-black dark:bg-dot-white/[0.8] relative items-center">
        <Image
          src={img}
          width={120}
          height={120}
          className="rounded-full absolute -bottom-10"
          alt="user image"
        />
      </section>
      <section className="w-4/5 xl:w-4/5 space-y-10 mt-5">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-xl font-bold text-center">
            Welcome, @{username}
          </h1>
          <p className="max-w-[35rem] text-sm text-center">
            Your centralized platform for efficient project management, seamless
            collaboration, and real-time progress tracking. Empowering you to
            achieve more with less effort.
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
              <p className="text-center mb-36">{isError && error?.message}</p>
            </>
          ) : (
            <>
              {Array.from({ length: 6 }).map((_, i) => {
                return (
                  <div key={i} className="w-full sm:max-w-80 p-8 rounded-xl space-y-4 dark:bg-neutral-950 drop-shadow-xl bg-neutral-400">
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
      <CreateProject isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  );
};

export default Page;
