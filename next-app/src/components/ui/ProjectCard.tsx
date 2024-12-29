import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import useSend from "@/hooks/useSend";
import { Code2Icon, Clock, Trash2 } from "lucide-react";
import { QueryObserverResult } from "@tanstack/react-query";

export interface ProjectCardProps {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  languages: { name: string; code: string }[];
  refetch: () => Promise<QueryObserverResult<any, Error>>;
}

const ProjectCard = ({ data }: { data: ProjectCardProps }) => {
  const { toast } = useToast();
  const { fetchData, loading, isError } = useSend();
  const deleteHandler = async () => {
    const res = await fetchData({
      url: `/api/projects/${data.id}`,
      method: "DELETE",
    });
    const date = new Date().toString();
    toast({
      title: res.message || res.error,
      description: date,
    });
    if (!res.error) {
      await data.refetch();
    }
  };

  return (
    <div className={`w-full sm:max-w-80 p-8 bg-gradient-to-b from-slate-100 to-slate-200  dark:from-slate-900 dark:to-slate-950 rounded-2xl drop-shadow-xl border-2 space-y-2 dark:text-slate-200 ${isError && "border border-red-500"} dark:border-slate-950 hover:border-2 hover:border-slate-600 hover:dark:border-neutral-500 transition-all duration-300`}>
      <div>
        <Code2Icon size={50} className="dark:bg-slate-900 bg-slate-200 p-2 rounded-md" />
      </div>
      <p className="text-2xl line-clamp-2">{data?.name}</p>
      <p className="flex gap-2 items-center"><Clock size={15} strokeWidth={2} />{data?.createdAt?.substring(0, 10)}</p>
      <div className="flex justify-between items-center">
        <Link href={`${data.type === "WEB" ? "/web-editor/" : `/compiler/${data?.languages[0]?.name}/`}${data?.id}`} className="underline underline-offset-2">Open</Link>
        <button aria-label="delete project" onClick={deleteHandler} disabled={loading}><Trash2 size={16} /></button>
      </div>
    </div>
  );
};

export default ProjectCard;
