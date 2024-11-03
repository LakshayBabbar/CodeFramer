"use client";
import { useState } from "react";
import CreateProject from "@/components/Modals/CreateProject";
import useAuth from "@/hooks/useAuth";
import ProjectCard, { ProjectCardProps } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import img from "@/../public/user.jpeg";
import useFetch from "@/hooks/useFetch";
import useSend from "@/hooks/useSend";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AlertWrapper from "@/components/ui/AlertWrapper";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const { username, setUsername, SetIsAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, isError, loading, refetch } = useFetch(
    "/api/projects/all",
    "All_Projects"
  );
  const { toast } = useToast();
  const router = useRouter();

  const reqData = useSend();

  const closeAccountHandler = async () => {
    const res = await reqData.fetchData({
      url: "/api/auth/close",
      method: "DELETE",
    });

    toast({
      title: res.error || res.message,
      description: new Date().toString(),
    });

    if (!res.error) {
      SetIsAuth(false);
      setUsername("");
      router.push("/");
    }
  };

  if (isError) {
    return (
      <main>
        <p className="text-center mt-32">{error?.message}</p>
      </main>
    );
  }
  if (loading) return <LoadingSpinner />;

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
            variant="outline"
            onClick={() => setIsOpen(true)}
            className="bg-transparent"
          >
            Create New
          </Button>
        </div>
        {!loading ? (
          <>
            <div className="w-full flex flex-wrap gap-4">
              {data?.length > 0 ? (
                data?.map((item: ProjectCardProps) => {
                  return (
                    <ProjectCard key={item._id} data={{ ...item, refetch }} />
                  );
                })
              ) : (
                <p className="text-center w-full">No project found.</p>
              )}
            </div>
            <p className="text-center mb-36">{isError && error?.message}</p>
          </>
        ) : (
          <p className="text-center mb-40">Loading...</p>
        )}
        <hr className="border w-full" />
        <div className="flex flex-col items-center space-y-4 pb-10">
          <AlertWrapper handlerFn={closeAccountHandler} conformText={username}>
            Close Account
          </AlertWrapper>
          {reqData.isError && (
            <p className="text-center text-red-600">{reqData.error}</p>
          )}
          <p className="text-center max-w-96 text-amber-700 font-[600]">
            Note: Clicking this button will permanently close your account and
            delete all associated data.
          </p>
        </div>
      </section>
      <CreateProject isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  );
};

export default Page;
