import { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import useSend from "@/hooks/useSend";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateProject = ({ isOpen, setIsOpen }) => {
  const ref = useRef(null);
  const [name, setName] = useState("");
  const [environment, setEnvironment] = useState("web");
  const [language, setLanguage] = useState("python");
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useRouter();
  const { fetchData, isError, error, loading, setIsError } = useSend();

  useEffect(() => {
    if (!isAuth && isOpen) {
      setIsOpen(false);
      navigate.push("/auth?mode=login");
    } else {
      ref.current = document.getElementById("modal");
    }
    !isOpen && setIsError(false);
  }, [isOpen, isAuth, navigate, setIsOpen, setIsError]);

  const dataHandler = (e) => {
    setName(e.target.value);
    setIsError(false);
  };
  const projectHandler = async (e) => {
    e.preventDefault();
    const res = await fetchData("/api/projects/create", "POST", {
      name,
      type: environment,
      language,
    });
    if (!res.error) {
      setIsOpen(false);
      navigate.push(
        environment === "web"
          ? `/web-editor/${res.pid}`
          : `/compiler/${language}/${res.pid}`
      );
    }
  };
  return isOpen && isAuth && ref.current
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
                <Select onValueChange={(val) => setEnvironment(val)} required>
                  <SelectTrigger className="flex-grow">
                    <SelectValue placeholder="Environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web</SelectItem>
                    <SelectItem value="compiler">Compiler</SelectItem>
                  </SelectContent>
                </Select>
                {environment === "compiler" && (
                  <Select onValueChange={(val) => setLanguage(val)} required>
                    <SelectTrigger className="flex-grow">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

              <p className="text-sm text-red-500">{isError && error}</p>
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
        ref.current
      )
    : null;
};

export default CreateProject;
