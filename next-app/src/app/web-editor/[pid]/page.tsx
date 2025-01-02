"use client";
import WebEditor from "@/components/Editor/WebEditor";
import useFetch from "@/hooks/useFetch";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { pid: string } }) => {
  const { pid } = params;
  const { data, isError, loading, error } = useFetch(
    `/api/projects/${pid}`,
    pid
  );
  const { push } = useRouter();

  const { status } = useSession();
  const isAuth = status === "authenticated";

  if (!isAuth) {
    push("/sign-in");
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