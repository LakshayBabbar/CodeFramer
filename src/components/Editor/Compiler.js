"use client";
import { Editor } from "@monaco-editor/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useSend from "@/hooks/useSend";

export default function CompilerEditor({ data, language }) {
  const editorRef = useRef();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState(0);
  const [inputs, setInputs] = useState("");
  const { toast } = useToast();
  const { fetchData, loading } = useSend();
  const [isCodeRun, setIsCodeRun] = useState(false);

  useEffect(() => {
    setCode(data?.languages[language] || "");
  }, [data, language]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleSubmit = async () => {
    setOutput("");
    setStatus(0);
    setIsCodeRun(true);
    const data = await fetchData("/api/compiler", "POST", {
      code,
      inputs: inputs.split("\n"),
      language,
    });
    if (!data.error) {
      setOutput(data.output);
      setStatus(data.status);
    }
    toast({
      title: data.error ? "Error" : "Success",
      description: data.error || data.message,
    });
  };

  const saveHandler = async () => {
    setIsCodeRun(false);
    const res = await fetchData(`/api/projects/${data._id}`, "PUT", {
      languages: { [language]: code },
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
          {data && (
            <Button
              onClick={saveHandler}
              className="px-4 py-[5px] h-fit"
              disabled={loading && !isCodeRun}
            >
              Save
            </Button>
          )}
          <Button
            className="px-4 py-[5px] h-fit border-none bg-neutral-700 text-white hover:bg-transparent"
            onClick={handleSubmit}
            disabled={loading && isCodeRun}
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
          onChange={(val) => setCode(val)}
          options={{
            fontSize: "14px",
            minimap: {
              enabled: false,
            },
            padding: {
              top: 10,
            },
            formatOnPaste: true,
            formatOnType: true,
            autoIndent: true,
            autoClosingBrackets: true,
            autoClosingQuotes: true,
            acceptSuggestionOnEnter: "on",
            tabCompletion: "on",
            wordBasedSuggestions: true,
            suggestOnTriggerCharacters: true,
            suggestSelection: "first",
          }}
        />
      </div>
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col-reverse md:flex-col">
        <pre
          className={`w-full h-1/2 p-4 overflow-auto ${
            status === 1 && "text-red-400"
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
