"use client";
import React, { useEffect, useState } from "react";
import Editor from "./index";
import { useToast } from "@/hooks/use-toast";
import useSend from "@/hooks/useSend";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "../ui/button";

export interface webEditorDataType {
  languages: { name: string; code: string }[];
  id?: string;
}
type FILES = "index.html" | "style.css" | "script.js"
function WebEditor({ data }: { data: webEditorDataType }) {
  const [values, setValues] = useState({ html: "", css: "", javascript: "" });
  const { toast } = useToast();
  const { fetchData, loading } = useSend();
  const editorRef = React.useRef<any>(null);
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
    ${values?.html}
    <style>${values?.css}</style>
    <script>${values?.javascript}</script>
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
      value: values?.javascript || "",
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
    const lang =
      file.name.split(".")[1] === "js" ? "javascript" : file.name.split(".")[1];
    if (value !== undefined) {
      setValues((values) => ({
        ...values,
        [lang]: value,
      }));
    }
  };

  useEffect(() => {
    if (code) {
      editorRef.current.setValue(code);
    }
  }, [code]);

  return (
    <div className="flex flex-col h-screen overflow-y-hidden bg-white">
      <div className="mt-14 flex flex-col h-full w-full">
        <iframe title="output" srcDoc={srcDoc} width="100%" height="40%" />
        <div className="w-full h-[60%]">
          <Editor file={file} onValChange={handleEditorChange}>
            <Tabs defaultValue="index.html">
              <TabsList>
                {fileNames.map((item, index) => (
                  <TabsTrigger key={index} value={item.name}
                    onClick={() => setFileName(item.name as FILES)}>
                    {item?.name?.split(".")[1]?.toUpperCase()}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            {data.id && (
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
