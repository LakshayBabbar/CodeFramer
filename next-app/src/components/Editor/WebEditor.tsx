"use client";
import React, { useEffect, useState } from "react";
import Editor from "./index";
import { useToast } from "@/hooks/use-toast";
import useSend from "@/hooks/useSend";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "../ui/button";
import { CopilotButton } from "../Copilot/Copilot";

export interface webEditorDataType {
  languages: { name: string; code: string }[];
  id?: string;
  isOwner?: boolean;
  isPublic?: boolean;
}
type FILES = "index.html" | "style.css" | "script.js"
function WebEditor({ data }: { data: webEditorDataType }) {
  const [values, setValues] = useState([{ name: "html", code: "" }, { name: "css", code: "" }, { name: "js", code: "" }]);
  const { toast } = useToast();
  const { fetchData, loading } = useSend();
  const [fileName, setFileName] = useState<FILES>("index.html");

  useEffect(() => {
    if (data) {
      setValues(data?.languages.map((item) => {
        return {
          name: item.name,
          code: item.code
        }
      }));
    }
  }, [data]);

  const updateHandler = async () => {
    const res = await fetchData({
      url: `/api/projects/${data.id}`,
      method: "PUT",
      body: {
        languages: values
      },
    });
    const date = new Date().toString();
    toast({
      title: res.message || res.error,
      description: date,
    });
  };

  const srcDoc = `
    ${values[0]?.code}
    <style>${values[1]?.code}</style>
    <script>${values[2]?.code}</script>
  `;

  const fileNames = [
    { name: "index.html" },
    { name: "style.css" },
    { name: "script.js" },
  ];

  const files = {
    "script.js": {
      name: "script.js",
      language: "javascript",
      value: values[2]?.code || "",
    },
    "style.css": {
      name: "style.css",
      language: "css",
      value: values[1]?.code || "",
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: values[0]?.code || "",
    },
  };

  const file = files[fileName];


  const handleEditorChange = (value: string | undefined) => {
    const lang = file.name.split(".")[1];
    const idx = values.findIndex((item) => item.name === lang);
    const updatedValues = [...values];
    updatedValues[idx] = { name: lang, code: value || "" };
    if (value !== undefined) {
      setValues(updatedValues);
    };
  }

  return (
    <div className="flex flex-col h-screen overflow-y-hidden bg-white">
      <div className="mt-14 flex flex-col h-full w-full">
        <iframe title="output" srcDoc={srcDoc} width="100%" height="45%" />
        <div className="w-full h-[55%] bg-card">
          <Editor file={file} onValChange={handleEditorChange} isPublic={data?.isPublic}>
            <CopilotButton editorData={values} setEditorData={setValues} />
            <Tabs defaultValue="index.html">
              <TabsList>
                {fileNames.map((item, index) => (
                  <TabsTrigger key={index} value={item.name}
                    onClick={() => setFileName(item.name as FILES)}>
                    {item?.name?.split(".")[1]?.toUpperCase()}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            {data?.isOwner && (
              <Button
                onClick={updateHandler}
                variant="secondary"
                disabled={loading}
              >
                Save
              </Button>
            )}
          </Editor>
        </div>
      </div>
    </div>
  );
}

export default WebEditor;
