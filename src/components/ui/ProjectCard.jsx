import { Button } from "./button";
import Link from "next/link";
import { useToast } from "./use-toast";
import useSend from "@/hooks/useSend";
import { Code2Icon, Delete } from "lucide-react";

const ProjectCard = ({ data }) => {
  const { toast } = useToast();
  const { fetchData } = useSend();
  const deleteHandler = async () => {
    const res = await fetchData(`/api/projects/${data._id}`, "DELETE");
    const date = new Date().toString();
    toast({
      title: res.message,
      description: date,
    });
    data.refetch(true);
  };
  const languages = Object.keys(data?.languages).join(", ") || "";
  return (
    <div className="w-full sm:w-80 bg-card border p-6 flex gap-4 rounded-xl hover:border-primary transition-all duration-300 shadow-lg bg-slate-100 dark:bg-slate-950">
      <span className="text-2xl">
        <Code2Icon />
      </span>
      <div className="space-y-2">
        <h1 className="font-bold">{data.name}</h1>
        <p className="text-sm text-muted-foreground">
          Created at: <span>{data?.createdAt.substring(0, 10)}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Last updated: <span>{data?.updatedAt?.substring(0, 10)}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Type: <span>{data.type}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Languages: <span>{languages}</span>
        </p>
        <div className="flex gap-4 items-center">
          <Link
            href={
              data.type === "web"
                ? `/web-editor/${data._id}`
                : `/compiler/python/${data._id}`
            }
          >
            <Button size="sm" variant="outline" className="bg-transparent">
              Open
            </Button>
          </Link>
          <span className="text-red-500 cursor-pointer" onClick={deleteHandler}>
            <acronym title="Delete Project">
              <Delete />
            </acronym>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
