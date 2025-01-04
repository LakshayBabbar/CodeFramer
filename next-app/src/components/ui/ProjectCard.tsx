import { useToast } from "@/hooks/use-toast";
import useSend from "@/hooks/useSend";
import { QueryObserverResult } from "@tanstack/react-query";
import { MagicCard } from "./magic-card";
import { useTheme } from "next-themes";
import { Clock } from "lucide-react";
import { Trash } from "lucide-react";
import Link from "next/link";
import { capitalise } from "@/lib/helpers";

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
  const { fetchData, loading } = useSend();
  const { theme } = useTheme();

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

  const languages = data?.languages?.map((lang) => capitalise(lang.name)).join(", ");

  return (
    <MagicCard
      className="p-8 shadow-2xl w-full sm:w-80 dark:text-neutral-300 text-neutral-800"
      gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
    >
      <div className="flex flex-col gap-2 w-full">
        <p className="text-3xl line-clamp-1">{data?.name}</p>
        <p className="flex items-center gap-2"><Clock size={20} strokeWidth={2.5} />{data?.createdAt?.substring(0, 10)}</p>
        <p><strong>Type: </strong>{capitalise(data?.type)}</p>
        <p><strong>Language: </strong>{languages}</p>
        <div className="flex w-full justify-between">
          <Link href={data?.type === "COMPILER" ? `/compiler/${data?.languages[0]?.name}/${data?.id}` : `/web-editor/${data?.id}`} className="underline">Open</Link>
          <button onClick={deleteHandler} disabled={loading} aria-label="delete"><Trash size="17" strokeWidth={2.5} /></button>
        </div>
      </div>
    </MagicCard>
  );
};

export default ProjectCard;