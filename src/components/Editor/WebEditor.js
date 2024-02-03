"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./web.module.css";
import EditorCom from "@/components/Editor/EditorCom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { RefreshContext } from "@/context";
import { auth } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

function WebEditor({ data, style, tryEditor }) {
  const [html, setHtml] = useState("");
  const [css, setcss] = useState("");
  const [js, setjs] = useState("");
  const {setRefresh} = useContext(RefreshContext);
  const [username,setUserName] = useState();

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user) {
        setUserName(user.displayName);
      }
    })
  },[])


  const updateHandler = async(val) => {
    if (val) {
      const ref = doc(db, `users/${username}/projects/${data.name}`);
      await updateDoc(ref, {
        html: html,
        css: css,
        js: js,
      });
      setRefresh(true);
    }
  };

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
        <EditorCom
          onChange={activeHandler}
          data={data}
          tryEditor={tryEditor}
          isUpdate={updateHandler}
        />
      </div>
      <iframe title="output" srcDoc={srcDoc} width="100%" height="100%" />
    </div>
  );
}

export default WebEditor;
