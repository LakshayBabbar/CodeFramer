"use client";
import { useEffect, useState } from "react";
import EditorCom from "@/components/Editor/EditorCom";
import { useToast } from "../ui/use-toast";
import useSend from "@/hooks/useSend";

function WebEditor({ data }) {
  const [values, setValues] = useState({ html: "", css: "", js: "" });
  const { toast } = useToast();
  const { fetchData } = useSend();

  useEffect(() => {
    setValues(data);
  }, [data]);

  const updateHandler = async () => {
    const res = await fetchData(`/api/projects/${data._id}`, "PUT", values);
    const date = new Date().toString();
    toast({
      title: res.message,
      description: date,
    });
  };

  const srcDoc = `
    <body>${values.html}</body>
    <style>${values.css}</style>
    <script>${values.js}</script>
  `;

  return (
    <div className="flex flex-col h-screen bg-white overflow-y-hidden">
      <div className="h-16 xl:h-14 w-full dark:bg-black border-b" />
      <div className="flex flex-col xl:flex-row-reverse h-full xl:h-[94%] w-full">
        <iframe title="output" srcDoc={srcDoc} width="60%" height="100%" className="w-full xl:w-3/5 xl:h-full" />
        <div className="bg-[#1e1e1e] w-full xl:h-full xl:w-2/5">
          <EditorCom
            onChange={setValues}
            data={values}
            setUpdate={updateHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default WebEditor;
