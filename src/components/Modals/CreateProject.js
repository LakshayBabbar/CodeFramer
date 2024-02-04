import { createPortal } from "react-dom";
import styles from "./pModal.module.css";
import { motion } from "framer-motion";
import { useRef, useContext, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { RefreshContext } from "@/context";

const CreateProject = ({ isOpen, username, data }) => {
  const nameRef = useRef();
  const descRef = useRef();
  const { setRefresh } = useContext(RefreshContext);
  const [error, setError] = useState(false);
  const [errorMssg, setErrorMssg] = useState("An error occured!");

  function generateString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function generateDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let fullDate = `${day}-${month}-${year}`;
    return fullDate;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const key = generateString(20);
    const id = key.trim();
    const date = generateDate();
    const isExists = data.find((item) => {
      return item.name === nameRef.current.value;
    });
    if (isExists !== undefined) {
      setError(true);
      setErrorMssg(
        "Please select a different name as the project with this name already exists."
      );
    } else if (descRef.current.value.length > 100) {
      setError(true);
      setErrorMssg("Description limited to 100 characters.");
    } else {
      setError(false);
      try {
        const ref = doc(
          db,
          `users/${username}/projects/${nameRef.current.value.trim()}`
        );
        await setDoc(ref, {
          id: id,
          name: nameRef.current.value,
          desc: descRef.current.value,
          html: "<h1></h1>",
          css: "*{margin: 0}",
          js: "console.log()",
          date: date,
        });
        setRefresh(true);
        isOpen(false);
      } catch (error) {
        setError(true);
        setErrorMssg(error.message);
      }
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
        <form className={styles.form} onSubmit={submitHandler}>
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
            <button
              onClick={() => isOpen(false)}
              type="button"
              className="btnDesign"
            >
              Cancel
            </button>
            <button type="submit" className="btnDesign">
              Create
            </button>
          </div>
        </form>
        {error && <p className={styles.fallBack}>{errorMssg}</p>}
      </motion.div>
    </div>,
    document.getElementById("modal")
  );
};

export default CreateProject;
