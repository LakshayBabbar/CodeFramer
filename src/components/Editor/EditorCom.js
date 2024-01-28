import { Editor } from "@monaco-editor/react";
import style from "./editor.module.css";
import { useState } from "react";

export default function EditorCom({ onChange }) {

  const handleEditorDidMount = (value, event) => {
    onChange(fileName, value);
  };

  const files = {
    "script.js": {
      name: "script.js",
      language: "javascript",
      value: "document.getElementById('h1').style.fontSize = '3rem';",
    },
    "style.css": {
      name: "style.css",
      language: "css",
      value: "h1{color: rgb(255, 69, 69);}",
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: "<h1 id='h1'>Welcome to CodeFramer</h1>",
    },
  };
  const [fileName, setFileName] = useState("index.html");
  const file = files[fileName];
  return (
    <>
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
              enabled: false
            },
          }}
        />
      </div>
    </>
  );
}
