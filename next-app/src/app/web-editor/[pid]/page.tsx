"use client";
import WebEditor from "@/components/Editor/WebEditor";
import useFetch from "@/hooks/useFetch";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

const Page = ({ params }: { params: { pid: string } }) => {
  const { pid } = params;
  const { data, isError, loading, error } = useFetch(
    `/api/projects/${pid}`,
    pid
  );

  if (isError) {
    return (
      <div className="w-full text-center mt-36 px-10 font-xl font-thin">
        {error?.message}
      </div>
    );
  }
  if (loading) return <MultiStepLoader />;

  return <WebEditor data={data} />;
};

export default Page;
