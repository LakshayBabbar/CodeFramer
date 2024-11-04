import { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createPortal } from "react-dom";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import useSend from "@/hooks/useSend";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUPPORTED_LANGUAGES } from "@/lib/lang";

interface CreateProjectProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProject: React.FC<CreateProjectProps> = ({ isOpen, setIsOpen }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState<string>("");
  const [environment, setEnvironment] = useState<"web" | "compiler">("web");
  const [language, setLanguage] = useState("python");
  const { isAuth } = useAuth();
  const router = useRouter();
  const { fetchData, isError, error, loading, setIsError } = useSend();

  useEffect(() => {
    if (!isAuth && isOpen) {
      setIsOpen(false);
      router.push("/auth?mode=login");
    } else {
      modalRef.current = document.getElementById("modal") as HTMLDivElement;
    }
    if (!isOpen) setIsError(false);
  }, [isOpen, isAuth, router, setIsOpen, setIsError]);

  const dataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsError(false);
  };

  const projectHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetchData({
      url: "/api/projects/create",
      method: "POST",
      body: {
        name,
        type: environment,
        language,
      },
    });
    if (!res.error) {
      setIsOpen(false);
      router.push(
        environment === "web"
          ? `/web-editor/${res.pid}`
          : `/compiler/${language}/${res.pid}`
      );
    }
  };

  return isOpen && isAuth && modalRef.current
    ? createPortal(
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center backdrop-blur-xl z-[50]">
          <div className="w-11/12 sm:w-[30rem] p-6 dark:border rounded-xl dark:bg-slate-950 bg-slate-100 space-y-2 shadow-2xl">
            <h1 className="font-bold text-xl my-2">Create New</h1>
            <form onSubmit={projectHandler} className="space-y-4">
              <Input
                name="name"
                value={name}
                className="bg-transparent"
                placeholder="Name"
                onChange={dataHandler}
                required
              />
              <div className="flex justify-between gap-4">
                <Select
                  onValueChange={(val) =>
                    setEnvironment(val as "web" | "compiler")
                  }
                  required
                >
                  <SelectTrigger className="flex-grow">
                    <SelectValue placeholder="Environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web</SelectItem>
                    <SelectItem value="compiler">Compiler</SelectItem>
                  </SelectContent>
                </Select>
                {environment === "compiler" && (
                  <Select
                    onValueChange={(val: string) => setLanguage(val)}
                    required
                  >
                    <SelectTrigger className="flex-grow">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUPPORTED_LANGUAGES.map((lang, index) => {
                        return (
                          <SelectItem key={index} value={lang}>
                            {lang}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {isError && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex gap-4 justify-end">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>,
        modalRef.current
      )
    : null;
};

export default CreateProject;
