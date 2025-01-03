"use client";;
import { use } from "react";
import CompilerEditor from "@/components/Editor/Compiler";
import useFetch from "@/hooks/useFetch";
import { useSession } from "next-auth/react";

const Compiler = (props: { params: Promise<{ pid: string }> }) => {
  const params = use(props.params);
  const { pid } = params;
  const { data, isError, error } = useFetch(`/api/projects/${pid}`, pid);

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

  return (
    <CompilerEditor language={data?.languages[0]?.name} data={data} />
  )
}

export default Compiler;
