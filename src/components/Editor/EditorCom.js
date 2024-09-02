import { Editor } from "@monaco-editor/react";
import { useState, useRef } from "react";
import { Button } from "../ui/button";

export default function EditorCom({ onChange, data, setUpdate }) {
  const editorRef = useRef();
  const [fileName, setFileName] = useState("index.html");

  const fileNames = [
    { name: "index.html", displayName: "HTML" },
    { name: "style.css", displayName: "CSS" },
    { name: "script.js", displayName: "JavaScript" },
  ];

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

  const activeStyle = "bg-neutral-700 text-white";
  const inactiveStyle = "bg-neutral-800";
  const btnStyle = "text-white hover:bg-[#262626]";

  return (
    <div>
      <div className="flex items-center gap-4 p-4 bg-[#1e1e1e]">
        {fileNames.map((item) => {
          return (
            <Button
              key={item.name}
              onClick={() => setFileName(item.name)}
              className={`${
                fileName === item.name ? activeStyle : inactiveStyle
              } ${btnStyle}`}
              size="sm"
            >
              {item.displayName}
            </Button>
          );
        })}
        {data && data._id && (
          <Button
            onClick={setUpdate}
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
