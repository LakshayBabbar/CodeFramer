import { useState } from "react";
import styles from "./styles.module.css";
import Editor from "@/components/Editor/WebEditor";
import { motion } from "framer-motion";

function index() {
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
    <motion.div
      className={styles.wrapper}
      initial={{ x: 100 }}
      whileInView={{ x: 0 }}
      transition={{ x: { type: "spring", stiffness: 200 } }}
    >
      <div className={styles.editor}>
        <Editor onChange={activeHandler} />
        <span className={styles.status}></span>
      </div>
      <iframe title="output" srcDoc={srcDoc} width="100%" height="100%" />
    </motion.div>
  );
}

export default index;
