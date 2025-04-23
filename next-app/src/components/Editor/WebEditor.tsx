"use client";
import React, { useEffect, useState } from "react";
import Editor from "./index";
import { useToast } from "@/hooks/use-toast";
import useSend from "@/hooks/useSend";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "../ui/button";
import { CopilotButton } from "../Copilot/Copilot";
import { Fullscreen, Minimize } from "lucide-react";

export interface webEditorDataType {
  languages: { name: string; code: string }[];
  id?: string;
  name?: string;
  isOwner?: boolean;
  isPublic?: boolean;
}
type FILES = "index.html" | "style.css" | "script.js"
function WebEditor({ data }: { data: webEditorDataType }) {
  const [values, setValues] = useState([{ name: "html", code: "" }, { name: "css", code: "" }, { name: "js", code: "" }]);
  const { toast } = useToast();
  const { fetchData, loading } = useSend();
  const [fileName, setFileName] = useState<FILES>("index.html");
  const [isFullPreview, setFullPreview] = useState(false);
  console.log(data)

  useEffect(() => {
    isFullPreview && document.documentElement.requestFullscreen();
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, [isFullPreview])

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
        <iframe id="web-preview" title="output" srcDoc={srcDoc} width="100%" height={isFullPreview ? "100%" : "50%"} />
        <div className={`w-full ${!isFullPreview ? "h-1/2" : "hidden"} bg-card`}>
          <Editor file={file} onValChange={handleEditorChange} isPublic={data?.isPublic} projectName={data?.name}>
            <button aria-label="Switch to full screen" onClick={() => { setFullPreview(true) }}><Fullscreen className="hover:scale-105 transition-all" /></button>
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
        {isFullPreview && <button className="fixed bottom-10 right-10 rounded-full p-2 bg-linear-to-r from-blue-500 to-blue-800 hover:scale-105 text-white transition-all" aria-label="Exit full screen" onClick={() => { setFullPreview(false) }}><Minimize className="size-8" /></button>}
      </div>
    </div>
  );
}

export default WebEditor;
