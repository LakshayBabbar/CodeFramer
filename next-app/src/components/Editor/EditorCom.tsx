import { Editor, OnMount } from "@monaco-editor/react";
import { useState, useRef, use, useEffect } from "react";
import { CopilotButton } from "../Copilot/Copilot";

interface EditorComProps {
  pid: string;
  data: {
    javascript?: string;
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
  const [code, setCode] = useState<string>("");
  const [fileName, setFileName] = useState<
    "index.html" | "style.css" | "script.js"
  >("index.html");

  const fileNames = [
    { name: "index.html" },
    { name: "style.css" },
    { name: "script.js" },
  ];

  const files = {
    "script.js": {
      name: "script.js",
      language: "javascript",
      value: data?.javascript || "",
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
    const lang =
      file.name.split(".")[1] === "js" ? "javascript" : file.name.split(".")[1];
    if (value !== undefined) {
      onChangeHandler((values) => ({
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


  const activeStyle = "bg-neutral-700 text-white border-t-4 border-red-500";
  const inactiveStyle = "bg-neutral-800 border-t-4 border-neutral-800";
  const btnStyle = "text-white rounded-none p-2 px-4";

  return (
    <div>
      <div className="flex justify-between pb-4 bg-[#1e1e1e]">
        <div className="flex items-center gap-[1px]">
          {fileNames.map((item) => (
            <button
              key={item.name}
              onClick={() =>
                setFileName(item.name as "index.html" | "style.css" | "script.js")
              }
              className={`${fileName === item.name ? activeStyle : inactiveStyle
                } ${btnStyle}`}
            >
              {item.name}
            </button>
          ))}
        <CopilotButton code={file.value} lang={file.name} setCode={setCode} />
        </div>
        {pid && (
          <button
            onClick={updateHandler}
            className="bg-neutral-700 p-2 text-white px-4 rounded-bl-2xl"
          >
            Save
          </button>
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
            autoIndent: "advanced",
            autoClosingBrackets: "always",
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
