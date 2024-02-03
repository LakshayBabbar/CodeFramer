import { createPortal } from "react-dom";
import styles from "./pModal.module.css";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const CreateProject = ({ isOpen, username }) => {
  const nameRef = useRef();
  const descRef = useRef();
  const [id, setId] = useState("");
  
  function generateString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const submitHandler = async () => {
    const key = generateString(20);
    setId(key.trim());
    console.log(id);
    try {
      const ref = doc(
        db,
        `users/${username}/projects/${nameRef.current.value}`
      );
      await setDoc(ref, {
        id: key.trim(),
        name: nameRef.current.value,
        desc: descRef.current.value,
        html: "<h1></h1>",
        css: "*{margin: 0}",
        js: "console.log()",
      });
    } catch (error) {
      console.error("Error setting document:", error.message);
    }
  };

  return createPortal(
    <div className={styles.backdrop}>
      <motion.div
        className={styles.wrapper}
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
      >
        <h1>Enter Details</h1>
        <form
          className={styles.form}
          onSubmit={submitHandler}
          method="POST"
          action={`/dashboard/${id}`}
        >
          <div className={styles.input}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              ref={nameRef}
              required
            />
          </div>
          <div className={styles.input}>
            <label>Description</label>
            <input
              type="text"
              name="description"
              autoComplete="off"
              ref={descRef}
              required
            />
          </div>
          <div className={styles.button}>
            <button onClick={() => isOpen(false)} type="button">
              Cancel
            </button>
            <button type="submit">Create</button>
          </div>
        </form>
      </motion.div>
    </div>,
    document.getElementById("modal")
  );
};

export default CreateProject;
