"use client";
import WebEditor from "@/components/Editor/WebEditor";
import useFetch from "@/hooks/useFetch";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

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
  if (loading) return <LoadingSpinner />;

  return <WebEditor data={data} />;
};

export default Page;
