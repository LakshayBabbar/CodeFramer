"use client";
import CompilerEditor from "@/components/Editor/Compiler";
import useFetch from "@/hooks/useFetch";
import { useSession } from "next-auth/react";

const Compiler = ({ params }: { params: { pid: string } }) => {
  const { pid } = params;
  const { data, isError, error, loading } = useFetch(`/api/projects/${pid}`, pid);

  const { status } = useSession();
  const isAuth = status === "authenticated";

  if (!isAuth) {
    return <main className="flex h-screen w-full items-center justify-center text-3xl font-light">
      <p>Unauthorized Access</p>
    </main>
  }

  if (isError)
    return (
      <main className="flex h-screen w-full items-center justify-center text-3xl font-light">
        {error?.message}
      </main>
    );

  if (loading) return <div className="flex h-screen w-full items-center justify-center text-3xl font-light">Loading...</div>

  return (
    <CompilerEditor language={data?.languages[0]?.name} data={data} />
  )
}

export default Compiler;
