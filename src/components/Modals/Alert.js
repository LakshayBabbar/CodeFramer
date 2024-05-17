import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { createPortal } from "react-dom";

const CreateProject = ({ isOpen, setIsOpen, title, description }) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = document.getElementById("alert");
  }, [isOpen, ref.current]);

  return isOpen && ref.current
    ? createPortal(
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center backdrop-blur-xl z-[1000]">
          <div className="w-[30rem] border p-6 rounded-xl bg-card space-y-2 shadow-2xl">
            <h1 className="font-bold">{title}</h1>
            <p className="text-sm">{description}</p>
            <div className="flex justify-end">
              <Button onClick={() => setIsOpen(false)}>Ok</Button>
            </div>
          </div>
        </div>,
        ref.current
      )
    : null;
};

export default CreateProject;
