"use client";;
import { use } from "react";
import WebEditor from "@/components/Editor/WebEditor";
import useFetch from "@/hooks/useFetch";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { useSession } from "next-auth/react";

const Page = (props: { params: Promise<{ pid: string }> }) => {
  const params = use(props.params);
  const { pid } = params;
  const { data, isError, loading, error } = useFetch(
    `/api/projects/${pid}`,
    pid
  );

  const { status } = useSession();
  const isAuth = status === "authenticated";

  if (!isAuth) {
    return <main className="w-full text-center mt-36 px-10 text-3xl font-light">
      <p>Unauthorized Access.</p>
    </main>
  }

  if (isError) {
    return (
      <div className="w-full text-center mt-36 px-10 font-xl font-thin">
        {error?.message}
      </div>
    );
  }
  if (loading) return <MultiStepLoader />;

  return isAuth ? <WebEditor data={data} /> : null;
};

export default Page;