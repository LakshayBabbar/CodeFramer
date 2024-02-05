import { Editor } from "@monaco-editor/react";
import style from "./editor.module.css";
import { useState } from "react";

export default function EditorCom({ onChange, data, tryEditor, isUpdate }) {

  const handleEditorDidMount = (value, event) => {
    fileName === "index.html"
      ? onChange((values)=>{
        return {...values,html:value}
      })
      : fileName === "style.css"
      ? onChange((values)=>{
        return {...values,css:value}
      })
      : onChange((values)=>{
        return {...values,js:value}
      })
  };

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
  const [fileName, setFileName] = useState("index.html");
  const file = files[fileName];

  return (
    <div>
      <div className={style.btnWrapper}>
        <button
          disabled={fileName === "index.html"}
          onClick={() => setFileName("index.html")}
          className={style.btn}
        >
          HTML
        </button>

        <button
          disabled={fileName === "style.css"}
          onClick={() => setFileName("style.css")}
          className={style.btn}
        >
          CSS
        </button>
        <button
          disabled={fileName === "script.js"}
          onClick={() => setFileName("script.js")}
          className={style.btn}
        >
          JS
        </button>
        {!tryEditor && (
          <button
            onClick={() => isUpdate(true)}
            className={`${style.btn} ${style.saveBtn}`}
          >
            Save
          </button>
        )}
      </div>
      <div className={style.editor}>
        <Editor
          width="100%"
          height="100%"
          theme="vs-dark"
          onChange={handleEditorDidMount}
          path={file.name}
          defaultValue={file.value}
          defaultLanguage={file.language}
          options={{
            fontSize: "18px",
            minimap: {
              enabled: false,
            },
            formatOnPaste: true,
            formatOnType: true,
            autoIndent: true,
            autoClosingBrackets: true,
            autoClosingQuotes: true,
          }}
        />
      </div>
    </div>
  );
}
