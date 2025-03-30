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
  const [values, setValues] = useState({ html: "", css: "", js: "" });
  const { toast } = useToast();
  const { fetchData, loading } = useSend();
  const [code, setCode] = useState<string>("");
  const [fileName, setFileName] = useState<FILES>("index.html");

  useEffect(() => {
    let extractLanguages = {} as any;
    data?.languages.forEach((lang) => {
      extractLanguages[lang?.name] = lang.code || "";
    });

    setValues({
      html: extractLanguages?.html || "",
      css: extractLanguages?.css || "",
      js: extractLanguages?.js || "",
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
          { name: "js", code: values.js },
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
    ${values?.html}
    <style>${values?.css}</style>
    <script>${values?.js}</script>
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
      value: values?.js || "",
    },
    "style.css": {
      name: "style.css",
      language: "css",
      value: values?.css || "",
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: values?.html || "",
    },
  };

  const file = files[fileName];


  const handleEditorChange = (value: string | undefined) => {
    const lang = file.name.split(".")[1];
    if (value !== undefined) {
      setValues((values) => ({
        ...values,
        [lang]: value,
      }));
    }
  };

  useEffect(() => {
    if (code) {
      try {
        const parsedCode = JSON.parse(code);
        // Only update if it has the expected properties
        if (parsedCode.html !== undefined ||
          parsedCode.css !== undefined ||
          parsedCode.js !== undefined) {
          setValues((prev) => ({
            html: parsedCode.html !== undefined ? parsedCode.html : prev.html,
            css: parsedCode.css !== undefined ? parsedCode.css : prev.css,
            js: parsedCode.js !== undefined ? parsedCode.js : prev.js,
          }));
        }
      } catch (e) {
        console.error("Failed to parse code from Copilot:", e);
      }
    }
  }, [code]);

  return (
    <div className="flex flex-col h-screen overflow-y-hidden bg-white">
      <div className="mt-14 flex flex-col h-full w-full">
        <iframe title="output" srcDoc={srcDoc} width="100%" height="45%" />
        <div className="w-full h-[55%] bg-card">
          <Editor file={file} onValChange={handleEditorChange} isPublic={data?.isPublic}>
            <CopilotButton lang="html, css and js" code={JSON.stringify(values)} setCode={setCode} />
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
