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
    <div className="flex flex-col mt-14 h-screen bg-white">
      <div className="bg-[#1e1e1e]">
        <EditorCom
          onChange={setValues}
          data={values}
          setUpdate={updateHandler}
        />
      </div>
      <iframe title="output" srcDoc={srcDoc} width="100%" height="100%" />
    </div>
  );
}

export default WebEditor;
