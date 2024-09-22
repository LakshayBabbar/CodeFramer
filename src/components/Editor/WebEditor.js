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
    setValues(data?.languages);
  }, [data]);

  const updateHandler = async () => {
    const res = await fetchData(`/api/projects/${data._id}`, "PUT", {
      languages: values,
    });
    const date = new Date().toString();
    toast({
      title: res.message,
      description: date,
    });
  };

  const srcDoc = `
    <body>${values?.html}</body>
    <style>${values?.css}</style>
    <script>${values?.js}</script>
  `;

  return (
    <div className="flex flex-col h-screen overflow-y-hidden bg-white">
      <div className="mt-14 flex flex-col h-full w-full">
        <iframe title="output" srcDoc={srcDoc} width="100%" height="52%" />
        <div className="bg-[#1e1e1e] w-full h-[46%]">
          <EditorCom
            onChange={setValues}
            data={values}
            id={data?._id}
            setUpdate={updateHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default WebEditor;
