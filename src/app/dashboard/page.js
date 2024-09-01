"use client";
import { useEffect, useState } from "react";
import CreateProject from "@/components/Modals/CreateProject";
import { useSelector } from "react-redux";
import ProjectCard from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import img from "@/../public/user.jpeg";
import useFetch from "@/hooks/useFetch";

const Page = () => {
  const { username } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: fetchedData,
    error,
    isError,
    loading,
    refetch,
  } = useFetch("/api/projects/all", "All_Projects");
  useEffect(() => {
    if (!isError) {
      setData(fetchedData);
    }
  }, [fetchedData, isError]);
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
      <section className="w-4/5 xl:w-3/4 space-y-10 mt-5">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-xl font-bold">Hello @{username}</h1>
          <p className="max-w-96 text-sm text-center">
            A comprehensive hub for project management, collaboration, and
            tracking progress seamlessly.
          </p>
        </div>
        <hr className="border w-full" />
        <div className="flex w-full justify-between items-center">
          <h2 className="text-xl font-bold">Your Project&apos;s</h2>
          <Button variant="outline" onClick={() => setIsOpen(true)} className="bg-transparent">
            Create New
          </Button>
        </div>
        {!loading ? (
          <>
            <div className="w-full grid xl:grid-cols-2 2xl:grid-cols-3 gap-5 justify-items-center xl:justify-items-start">
              {!isError &&
                data &&
                data.map((item) => {
                  return (
                    <ProjectCard key={item._id} data={{ ...item, refetch }} />
                  );
                })}
            </div>
            <p className="text-center mb-36">{isError && error.message}</p>
          </>
        ) : (
          <p className="text-center mb-40">Loading...</p>
        )}
      </section>
      <CreateProject isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  );
};

export default Page;
