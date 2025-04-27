import { MagicCard } from "./magic-card";
import { useTheme } from "next-themes";
import { Code2Icon, UserRound, AppWindow, Calendar } from "lucide-react";
import Link from "next/link";
import { capitalise } from "@/lib/helpers";
import AlertWrapper from "./AlertWrapper";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { IconDots } from "@tabler/icons-react";
import { Button } from "./button";
import { Skeleton } from "./skeleton";

export interface ProjectCardProps {
  data: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    type: string;
    isOwner: boolean;
    isPublic: boolean;
    user: { username: string };
    languages: { name: string; code: string }[];
  },
  controls: boolean;
  updateHandler?: (pid: string, isPublic: boolean) => void;
  delHandler?: (pid: string) => void;
}

const ProjectCard = ({ data, controls = false, updateHandler, delHandler }: ProjectCardProps) => {
  const { resolvedTheme: theme } = useTheme();
  const languages = data?.languages?.map((lang) => capitalise(lang.name)).join(", ");
  const listStyle = "flex gap-2 items-center text-sm"
  const icoSize = 16;
  const date = new Date(data?.createdAt).toLocaleDateString();

  return (
    <MagicCard
      className="p-6 drop-shadow-xl w-full md:w-80 dark:text-neutral-300 text-neutral-800"
      gradientColor={theme === "dark" ? "#262626" : "#e5e7eb"}
    >
      <div className="w-full flex justify-between gap-2">
        <p className="text-2xl line-clamp-1 text-start pr-5 hover:underline hover:underline-offset-4">
          <Link href={`/user/${data?.user?.username}/${data?.id}`}>{capitalise(data?.name)}</Link>
        </p>
        {controls && data.isOwner &&
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button aria-label="Project Menu" variant="ghost" size="sm"><IconDots /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <AlertWrapper handlerFn={() => delHandler?.(data.id)} size="sm" className="w-full flex justify-start">Delete</AlertWrapper>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateHandler?.(data.id, data.isPublic)}>
                {data.isPublic ? "Make Private" : "Make Public"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
      <ul className="space-y-2 mt-2">
        <li className={listStyle}><AppWindow size={icoSize} />{capitalise(data?.type)}</li>
        <li className={listStyle}><Code2Icon size={icoSize} />{languages}</li>
        <li className={listStyle}><UserRound size={icoSize} />{data?.user?.username}</li>
        <li className={listStyle}><Calendar size={icoSize} />{date}</li>
      </ul>
    </MagicCard >
  );
};

export default ProjectCard;


export const ProjectCardSkeleton = () => {
  return (
    <div className="w-full md:w-80 p-6 rounded-xl space-y-4 border bg-card">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-[200px]" />
        <Skeleton className="h-7 w-[40px]" />
      </div>
      <Skeleton className="h-4 w-[80px]" />
      <Skeleton className="h-4 w-[160px]" />
      <Skeleton className="h-4 w-[160px]" />
      <Skeleton className="h-4 w-[160px]" />
    </div>
  )
}