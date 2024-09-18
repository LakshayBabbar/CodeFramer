"use client";
import { Editor } from "@monaco-editor/react";
import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Compiler() {
  const editorRef = useRef();
  const searchParams = useSearchParams();
  const [code, setCode] = useState("");
  const language = searchParams.get("lang") || "python";
  const [output, setOutput] = useState("");
  const [outerr, setOuterr] = useState("");
  const [loading, setLoading] = useState(false);
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
        body: JSON.stringify({ code, language }),
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
    <div className="mt-14 w-full md:h-[93vh] flex items-center justify-center">
      <div className="md:w-1/2 h-1/2 md:h-full bg-[#1e1e1e]">
        <div className="p-2 w-full flex justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={handleSubmit}
            disabled={loading}
          >
            Run
          </Button>
        </div>
        <Editor
          width="100%"
          height="100%"
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
      <div className="md:w-1/2 h-1/2 md:h-full p-4">
        <pre>
          {output} {outerr && <span className="text-red-400">{outerr}</span>}
        </pre>
      </div>
    </div>
  );
}
