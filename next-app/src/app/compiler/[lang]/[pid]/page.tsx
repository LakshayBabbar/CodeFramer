"use client";
import CompilerEditor from "@/components/Editor/Compiler";
import useFetch from "@/hooks/useFetch";
import { useSession } from "next-auth/react";
import { use } from "react";

const Compiler = (props: { params: Promise<{ pid: string }> }) => {
  const { pid } = use(props.params);
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

  return isAuth ? (
    <CompilerEditor language={data?.languages[0]?.name} data={data} />
  ) : null;
}

export default Compiler;