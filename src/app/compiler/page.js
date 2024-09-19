"use client";
import { Editor } from "@monaco-editor/react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Compiler() {
  const editorRef = useRef();
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [outerr, setOuterr] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState("");
  const { toast } = useToast();

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleSubmit = async () => {
    setOutput("");
    setOuterr("");
    setLoading(true);
    try {
      const res = await fetch("/api/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language, inputs }),
        signal: new AbortController().signal,
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      } else if (data.stderr) {
        setOuterr(data.stderr);
      } else if (!res.ok) {
        throw new Error("Something went wrong");
      } else {
        setOutput(data.output);
      }

      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-14 w-full h-[93.8vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#1e1e1e]">
        <div className="h-[10%] md:h-[5%] w-full flex justify-between items-center px-4">
          <Select onValueChange={(lang) => setLanguage(lang)}>
            <SelectTrigger className="w-[160px] bg-transparent text-white border-zinc-800">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="javascript">Javascript</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="px-4 py-[5px] h-fit border-none bg-neutral-700 text-white hover:bg-transparent"
            onClick={handleSubmit}
            disabled={loading}
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
            autoClosingComments: true,
            automaticLayout: true,
            autoClosingOvertype: "always",
            autoClosingDelete: "always",
            acceptSuggestionOnEnter: "on",
            tabCompletion: "on",
            wordBasedSuggestions: true,
            suggestOnTriggerCharacters: true,
            suggestSelection: "first",
          }}
        />
      </div>
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col-reverse md:flex-col">
        <pre className="w-full h-1/2 p-4 overflow-auto">
          {output} {outerr && <span className="text-red-400">{outerr}</span>}
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
