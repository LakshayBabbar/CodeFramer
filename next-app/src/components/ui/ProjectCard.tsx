import { useToast } from "@/hooks/use-toast";
import useSend from "@/hooks/useSend";
import { QueryObserverResult } from "@tanstack/react-query";
import { MagicCard } from "./magic-card";
import { useTheme } from "next-themes";
import { Clock, Trash, EyeClosed, Eye } from "lucide-react";
import Link from "next/link";
import { capitalise } from "@/lib/helpers";

export interface ProjectCardProps {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  isOwner: boolean;
  isPublic: boolean;
  user: { username: string };
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

  const updateHandler = async () => {
    const res = await fetchData({
      url: `/api/projects/${data.id}`,
      method: "PUT",
      body: { visibility: !data.isPublic },
    });
    toast({
      title: res.error ? "Something went wrong" : "Visibility updated",
      description: `${data.name} is now ${data.isPublic ? "private" : "public"}`,
    });
    if (!res.error) {
      await data.refetch();
    }
  };

  const languages = data?.languages?.map((lang) => capitalise(lang.name)).join(", ");
  const Icon = data.isPublic ? Eye : EyeClosed;
  return (
    <MagicCard
      className="p-8 drop-shadow-xl w-full md:w-80 dark:text-neutral-300 text-neutral-800"
      gradientColor={theme === "dark" || theme === "system" ? "#262626" : "#e5e7eb"}
    >
      <div className="flex flex-col gap-2 w-full items-start">
        <p className="text-3xl line-clamp-1">{data?.name}</p>
        <p className="flex items-center gap-2"><Clock size={20} strokeWidth={2.5} />{data?.createdAt?.substring(0, 10)}</p>
        <p><strong>Type: </strong>{capitalise(data?.type)}</p>
        <p><strong>Language: </strong>{languages}</p>
        <p><strong>Author: </strong>{data?.user?.username}</p>
        <div className="flex w-full justify-between">
          <Link href={`/user/${data?.user?.username}/${data?.id}`} className="underline">Open</Link>
          {data.isOwner && <div className="flex gap-4 items-center">
            <button onClick={deleteHandler} disabled={loading} aria-label="delete"><Trash size="17" strokeWidth={2.5} /></button>
            <Icon size={20} className="cursor-pointer" onClick={updateHandler} />
          </div>}
        </div>
      </div>
    </MagicCard>
  );
};

export default ProjectCard;