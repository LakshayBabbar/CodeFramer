"use client";
import { useEffect, useState } from "react";
import CreateProject from "@/components/Modals/CreateProject";
import { useSelector } from "react-redux";
import ProjectCard from "@/components/ui/ProjectCard";
import { authState } from "@/store/features/Auth/authSlice";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import img from "@/../public/user.jpeg";
import useFetch from "@/hooks/useFetch";
import useSend from "@/hooks/useSend";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const { fetchData, isError: isErr, loading: load, error: err } = useSend();
  useEffect(() => {
    if (!isError) {
      setData(fetchedData);
    }
  }, [fetchedData, isError]);

  const closeAccountHandler = async () => {
    const con = confirm("Are you sure you want to close your account?");
    if (con) {
      const res = await fetchData("/api/auth/close", "DELETE");
      if (res.success) {
        localStorage.removeItem("authToken");
        dispatch(
          authState({
            isAuth: false,
            username: undefined,
          })
        );
        location.href = "/auth";
      }
    }
  };

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
        <hr className="border w-full" />
        <div className="flex flex-col items-center space-y-4 pb-10">
          <Button
            variant="destructive"
            onClick={closeAccountHandler}
            disabled={load}
          >
            Close Account
          </Button>
          {isErr && <p className="text-center text-red-600">{err}</p>}
          <p className="text-center max-w-96 text-yellow-600">
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
