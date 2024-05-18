import { FaCode } from "react-icons/fa6";
import { Button } from "./button";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { useToast } from "./use-toast";
import useSend from "@/hooks/useSend";

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
  return (
    <div className="w-full xl:w-[30rem] 2xl:w-[25rem] bg-card border p-6 flex gap-4 rounded-xl hover:border hover:border-primary transition-all duration-300 shadow-lg">
      <span className="text-2xl">
        <FaCode />
      </span>
      <div className="space-y-2">
        <h1 className="font-bold">{data.name}</h1>
        <p className="line-clamp-2 text-sm">{data.description}</p>
        <p className="text-sm text-muted-foreground">
          Created at: <span>{data.createdAt.substring(0, 10)}</span>
        </p>
        <div className="flex gap-4 items-center">
          <Link href={`/web-editor/${data._id}`}>
            <Button size="sm" variant="outline">
              Open
            </Button>
          </Link>
          <span className="text-red-500 cursor-pointer" onClick={deleteHandler}>
            <MdDeleteOutline />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
