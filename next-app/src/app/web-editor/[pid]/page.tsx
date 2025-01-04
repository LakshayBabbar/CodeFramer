"use client";
import WebEditor from "@/components/Editor/WebEditor";
import useFetch from "@/hooks/useFetch";
import { useSession } from "next-auth/react";
import { use } from "react";

const WebEditorPage = ({
  params,
}: {
  params: Promise<{ pid: string }>
}) => {
  const { pid } = use(params);
  const { status } = useSession();
  const { data, isError, error, loading } = useFetch(`/api/projects/${pid}`, "all_projects");
  const isAuth = status === "authenticated";
  if (!isAuth) {
    return <main className="flex h-screen w-full items-center justify-center text-3xl font-light">
      <p>Unauthorized Access.</p>
    </main>
  }

  if (loading)
    return (
      <main className="flex h-screen w-full items-center justify-center text-2xl font-light">
        Loading...
      </main>
    );

  if (isError)
    return (
      <main className="flex h-screen w-full items-center justify-center text-2xl font-light">
        {error?.message}
      </main>
    );

  return isAuth ? (<WebEditor data={data} />) : null;
};

export default WebEditorPage;