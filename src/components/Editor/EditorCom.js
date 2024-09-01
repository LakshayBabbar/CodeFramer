import { Editor } from "@monaco-editor/react";
import { useState, useRef } from "react";
import { Button } from "../ui/button";

export default function EditorCom({ onChange, data, setUpdate }) {
  const editorRef = useRef();
  const [fileName, setFileName] = useState("index.html");

  const files = {
    "script.js": {
      name: "script.js",
      language: "javascript",
      value: data.js,
    },
    "style.css": {
      name: "style.css",
      language: "css",
      value: data.css,
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: data.html,
    },
  };

  const file = files[fileName];

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleEditorChange = (value) => {
    onChange((values) => {
      return {
        ...values,
        [fileName.split(".")[1]]: value,
      };
    });
  };
  return (
    <div>
      <div className="flex items-center gap-4 p-4">
        <Button
          onClick={() => setFileName("index.html")}
          className={`${
            fileName === "index.html"
              ? "bg-[#262626]"
              : "bg-transparent border border-neutral-700"
          }
          text-white hover:bg-[#262626]`}
          size="sm"
        >
          HTML
        </Button>
        <Button
          onClick={() => setFileName("style.css")}
          className={`${
            fileName === "style.css"
              ? "bg-[#262626]"
              : "bg-transparent border border-neutral-700"
          }
          text-white hover:bg-[#262626]`}
          size="sm"
        >
          CSS
        </Button>
        <Button
          onClick={() => setFileName("script.js")}
          className={`${
            fileName === "script.js"
              ? "bg-[#262626]"
              : "bg-transparent border border-neutral-700"
          }
          text-white hover:bg-[#262626]`}
          size="sm"
        >
          JS
        </Button>
        {data && data._id && (
          <Button onClick={setUpdate} size="sm">
            Save
          </Button>
        )}
      </div>
      <div className="w-full h-[40vh] xl:h-[85vh]">
        <Editor
          width="100%"
          height="100%"
          theme="vs-dark"
          path={file.name}
          value={file.value}
          language={file.language}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
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
    </div>
  );
}
