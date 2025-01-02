"use client";
import CompilerEditor from "@/components/Editor/Compiler";
import useFetch from "@/hooks/useFetch";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const Compiler = ({ params }: { params: { pid: string } }) => {
  const { pid } = params;
  const access_key = process.env.NEXT_PUBLIC_ACCESS_KEY || "";
  const { data, isError, error, loading } = useFetch(`/api/projects/${pid}`, pid);

  const { push } = useRouter();

  const { status } = useSession();
  const isAuth = status === "authenticated";

  if (!isAuth) {
    push("/sign-in");
  }

  if (isError)
    return (
      <main className="flex h-screen w-full items-center justify-center text-3xl font-light">
        {error?.message}
      </main>
    );

  if (loading) return <div>Loading...</div>

  return isAuth ? (
    <CompilerEditor language={data?.languages[0]?.name} data={data} access_key={access_key} />
  ) : null;
}

export default Compiler;
