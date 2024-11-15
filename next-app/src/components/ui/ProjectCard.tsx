import { Button } from "./button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import useSend from "@/hooks/useSend";
import { Code2Icon, Delete } from "lucide-react";
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
  const { fetchData } = useSend();
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

  const languages = data.languages
    .map((lang) => lang.name.charAt(0).toUpperCase() + lang.name.slice(1))
    .join(", ");

  return (
    <div className="w-full sm:max-w-80 bg-card p-8 dark:bg-slate-900 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-3xl text-primary">
            <Code2Icon />
          </span>
          <h1 className="font-bold text-xl text-slate-900 dark:text-slate-100 line-clamp-1">
            {data.name}
          </h1>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p>
            <span className="font-semibold">Created at:&nbsp;</span>
            {data?.createdAt?.substring(0, 10)}
          </p>
          <p>
            <span className="font-semibold">Last updated:&nbsp;</span>
            {data?.updatedAt?.substring(0, 10)}
          </p>
          <p>
            <span className="font-semibold">Env:</span> {data.type}
          </p>
          <p>
            <span className="font-semibold">Languages:</span> {languages}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Link
            href={
              data.type === "WEB"
                ? `/web-editor/${data.id}`
                : `/compiler/${data?.languages[0].name}/${data.id}`
            }
          >
            <Button variant="outline" className="bg-transparent">
              Open
            </Button>
          </Link>
          <span
            className="text-red-500 hover:text-red-600 cursor-pointer transition-colors"
            onClick={deleteHandler}
            aria-label="Delete project"
          >
            <Delete className="w-6 h-6" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
