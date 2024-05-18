import { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import useSend from "@/hooks/useSend";

const CreateProject = ({ isOpen, setIsOpen }) => {
  const ref = useRef(null);
  const [data, setData] = useState({
    name: "",
    description: "",
  });
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
  }, [isOpen, isAuth]);

  const dataHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
    setIsError(false);
  };
  const projectHandler = async (e) => {
    e.preventDefault();
    const res = await fetchData("/api/projects/create", "POST", data);
    if (res && res.success) {
      setIsOpen(false);
    }
    setData({
      name: "",
      description: "",
    });
    res.success && navigate.push(`/web-editor/${res.pid}`);
  };
  return isOpen && isAuth && ref.current
    ? createPortal(
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center backdrop-blur-xl z-[1000]">
          <div className="w-11/12 sm:w-[30rem] border p-6 rounded-xl bg-card space-y-2 shadow-2xl">
            <h1 className="font-bold">Create New</h1>
            <p className="text-sm">Web Environment</p>
            <form onSubmit={projectHandler} className="space-y-4">
              <Input
                name="name"
                value={data.name}
                placeholder="Name"
                onChange={dataHandler}
                required
              />
              <Input
                name="description"
                value={data.description}
                placeholder="Description"
                onChange={dataHandler}
                required
              />
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
