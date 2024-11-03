import { Editor, OnMount } from "@monaco-editor/react";
import { useState, useRef } from "react";
import { Button } from "../ui/button";

interface EditorComProps {
  pid: string;
  data: {
    js?: string;
    css?: string;
    html?: string;
  };
  onChangeHandler: (values: (values: any) => any) => void;
  updateHandler: () => void;
}

export default function EditorCom({
  pid,
  data,
  onChangeHandler,
  updateHandler,
}: EditorComProps) {
  const editorRef = useRef<any>(null);
  const [fileName, setFileName] = useState<
    "index.html" | "style.css" | "script.js"
  >("index.html");

  const fileNames = [
    { name: "index.html", displayName: "HTML" },
    { name: "style.css", displayName: "CSS" },
    { name: "script.js", displayName: "JavaScript" },
  ];

  const files = {
    "script.js": {
      name: "script.js",
      language: "javascript",
      value: data?.js || "",
    },
    "style.css": {
      name: "style.css",
      language: "css",
      value: data?.css || "",
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: data?.html || "",
    },
  };

  const file = files[fileName];

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChangeHandler((values) => ({
        ...values,
        [fileName.split(".")[1]]: value,
      }));
    }
  };

  const activeStyle = "bg-neutral-700 text-white";
  const inactiveStyle = "bg-neutral-800";
  const btnStyle = "text-white hover:bg-[#262626]";

  return (
    <div>
      <div className="flex items-center gap-4 p-4 bg-[#1e1e1e]">
        {fileNames.map((item) => (
          <Button
            key={item.name}
            onClick={() =>
              setFileName(item.name as "index.html" | "style.css" | "script.js")
            }
            className={`${
              fileName === item.name ? activeStyle : inactiveStyle
            } ${btnStyle}`}
            size="sm"
          >
            {item.displayName}
          </Button>
        ))}
        {pid && (
          <Button
            onClick={updateHandler}
            size="sm"
            className="bg-white text-black hover:bg-slate-200"
          >
            Save
          </Button>
        )}
      </div>
      <div className="w-full h-[40vh]">
        <Editor
          width="100%"
          height="100%"
          path={file.name}
          value={file.value}
          language={file.language}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            formatOnPaste: true,
            formatOnType: true,
            autoIndent: "full",
            acceptSuggestionOnEnter: "on",
            automaticLayout: true,
            autoClosingOvertype: "always",
            autoClosingDelete: "always",
            tabCompletion: "on",
            wordBasedSuggestions: "allDocuments",
            suggestOnTriggerCharacters: true,
            suggestSelection: "first",
          }}
        />
      </div>
    </div>
  );
}
