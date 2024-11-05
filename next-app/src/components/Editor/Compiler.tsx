"use client";
import { Editor, OnMount } from "@monaco-editor/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useSend from "@/hooks/useSend";
import { SUPPORTED_LANGUAGES } from "@/lib/lang";
import { useRouter } from "next/navigation";

interface CompilerEditorProps {
  language: string;
  data?: {
    id: string;
    languages: { name: string; code: string }[];
  };
}

export default function CompilerEditor({
  data,
  language,
}: CompilerEditorProps) {
  const editorRef = useRef<any>(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState(false);
  const [inputs, setInputs] = useState("");
  const { toast } = useToast();
  const { fetchData, loading } = useSend();
  const [isCodeRun, setIsCodeRun] = useState(false);
  const redirect = useRouter();

  useEffect(() => {
    setCode(data?.languages[0]?.code || "");
  }, [data, language]);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleSubmit = async () => {
    setOutput("");
    setStatus(false);
    setIsCodeRun(true);
    const data = await fetchData({
      url: "/api/compiler",
      method: "POST",
      body: {
        code,
        inputs: inputs,
        language,
      },
    });
    if (!data.error) {
      setOutput(data.output);
      setStatus(data.codeError);
    }
    !data.codeError &&
      toast({
        title: data.error ? "Error" : "Compiled Successfully!",
        description: data.error || data.message,
      });
  };

  const saveHandler = async () => {
    setIsCodeRun(false);
    const res = await fetchData({
      url: `/api/projects/${data?.id}`,
      method: "PUT",
      body: {
        languages: [{ name: data?.languages[0].name, code }],
      },
    });
    toast({
      title: res.message || res.error,
      description: new Date().toString(),
    });
  };

  return (
    <div className="mt-14 w-full h-[93.8vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#1e1e1e]">
        <div className="h-[10%] md:h-[5%] w-full flex justify-end items-center gap-4 px-4">
          {data ? (
            <Button
              onClick={saveHandler}
              className="px-4 py-[5px] h-fit"
              disabled={loading && isCodeRun === false}
            >
              Save
            </Button>
          ) : (
            <select
              onChange={(e) => redirect.push(e.target.value)}
              className="py-1 px-4 rounded-md bg-neutral-700 text-white"
              value={language}
            >
              {SUPPORTED_LANGUAGES.map((lang, index) => {
                const capitalize = lang.charAt(0).toUpperCase() + lang.slice(1);
                return (
                  <option key={index} value={lang}>
                    {capitalize}
                  </option>
                );
              })}
            </select>
          )}
          <Button
            className="px-4 py-[5px] h-fit border-none bg-neutral-700 text-white hover:bg-neutral-600"
            onClick={handleSubmit}
            disabled={loading && isCodeRun === true}
          >
            Run
          </Button>
        </div>
        <Editor
          width="100%"
          height="93%"
          value={code}
          language={language}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          onChange={(val) => setCode(val || "")}
          options={{
            fontSize: 14,
            minimap: {
              enabled: false,
            },
            padding: {
              top: 10,
            },
            formatOnPaste: true,
            formatOnType: true,
            autoIndent: "full",
            autoClosingBrackets: "always",
            autoClosingQuotes: "always",
            acceptSuggestionOnEnter: "on",
            tabCompletion: "on",
            wordBasedSuggestions: "allDocuments",
            suggestOnTriggerCharacters: true,
            suggestSelection: "first",
          }}
        />
      </div>
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col-reverse md:flex-col">
        <pre
          className={`w-full h-1/2 p-4 overflow-auto ${
            status === true && "text-red-400"
          }`}
        >
          {output}
        </pre>
        <div className="w-full h-1/2 bg-slate-100 p-4 text-black border-t">
          <h3 className="text-xl font-bold">Enter Your Inputs</h3>
          <textarea
            onChange={(e) => setInputs(e.target.value)}
            className="bg-transparent w-full h-[80%] max-h-[80%] max-w-full border-none focus:outline-none pt-2"
          />
        </div>
      </div>
    </div>
  );
}
