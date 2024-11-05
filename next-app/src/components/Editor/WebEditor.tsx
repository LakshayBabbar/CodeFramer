"use client";
import { useEffect, useState } from "react";
import EditorCom from "@/components/Editor/EditorCom";
import { useToast } from "@/hooks/use-toast";
import useSend from "@/hooks/useSend";

export interface webEditorDataType {
  languages: { name: string; code: string }[];
  id?: string;
}

function WebEditor({ data }: { data: webEditorDataType }) {
  const [values, setValues] = useState({ html: "", css: "", javascript: "" });
  const { toast } = useToast();
  const { fetchData } = useSend();

  useEffect(() => {
    let extractLanguages = {} as any;
    data?.languages.forEach((lang) => {
      extractLanguages[lang?.name] = lang.code || "";
    });

    setValues({
      html: extractLanguages?.html || "",
      css: extractLanguages?.css || "",
      javascript: extractLanguages?.javascript || "",
    });
  }, [data]);

  const updateHandler = async () => {
    const res = await fetchData({
      url: `/api/projects/${data.id}`,
      method: "PUT",
      body: {
        languages: [
          { name: "html", code: values.html },
          { name: "css", code: values.css },
          { name: "javascript", code: values.javascript },
        ],
      },
    });
    const date = new Date().toString();
    toast({
      title: res.message || res.error,
      description: date,
    });
  };

  const srcDoc = `
    <body>${values?.html}</body>
    <style>${values?.css}</style>
    <script>${values?.javascript}</script>
  `;

  return (
    <div className="flex flex-col h-screen overflow-y-hidden bg-white">
      <div className="mt-14 flex flex-col h-full w-full">
        <iframe title="output" srcDoc={srcDoc} width="100%" height="52%" />
        <div className="bg-[#1e1e1e] w-full h-[46%]">
          <EditorCom
            onChangeHandler={setValues}
            data={values}
            pid={data?.id || ""}
            updateHandler={updateHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default WebEditor;
