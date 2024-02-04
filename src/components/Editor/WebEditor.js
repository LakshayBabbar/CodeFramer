"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./web.module.css";
import EditorCom from "@/components/Editor/EditorCom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { RefreshContext } from "@/context";
import { auth } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

function WebEditor({ data, tryEditor }) {
  const {setRefresh} = useContext(RefreshContext);
  const [username,setUserName] = useState();
  const [values, setValues] = useState({});

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user) {
        setUserName(user.displayName);
      }
    })
  },[])

  function activeHandler(values) {
    setValues(values)
  }
  
  const updateHandler = async(val) => {
    if (val) {
      const ref = doc(db, `users/${username}/projects/${data.name}`);
      await updateDoc(ref, {
        html: values.html,
        css: values.css,
        js: values.js,
      });
      setRefresh(true);
      alert("Your data is saved successfully!!")
    }
  };
  const srcDoc = `
    <body>${values.html}</body>
    <style>${values.css}</style>
    <script>${values.js}</script>
  `;

  return (
    <div className={styles.wrapper}>
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
