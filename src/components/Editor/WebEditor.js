"use client";
import { useContext, useState } from "react";
import styles from "./web.module.css";
import EditorCom from "@/components/Editor/EditorCom";
import { UserContext } from "@/context";

function WebEditor({ style}) {
  const {data} = useContext(UserContext);
  const [html, setHtml] = useState("");
  const [css, setcss] = useState("");
  const [js, setjs] = useState("");

  function activeHandler(fileName, value) {
    fileName === "index.html"
      ? setHtml(value)
      : fileName === "style.css"
      ? setcss(value)
      : setjs(value);
  }

  const srcDoc = `
  <body>${html}</body>
  <style>${css}</style>
  <script>${js}</script>
`;
  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.editor}>
        <EditorCom onChange={activeHandler} data={data} />
      </div>
      <iframe title="output" srcDoc={srcDoc} width="100%" height="100%" />
    </div>
  );
}

export default WebEditor;
