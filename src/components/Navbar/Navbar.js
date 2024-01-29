"use client";
import styles from "./styles.module.css";
import Link from "next/link";
import { BsNintendoSwitch } from "react-icons/bs";
import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";

export default function Navbar() {
  const [mode, setLight] = useState("");

  const modeHandler = () => {
    if (mode === "darkMode") {
      setLight("lightMode");
      localStorage.setItem("theme", "lightMode");
    } else {
      setLight("darkMode");
      localStorage.setItem("theme", "darkMode");
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "darkMode") {
      setLight(theme);
      document.body.className = theme;
    } else {
      document.body.className = mode;
    }
  }, [mode]);

  return (
    <div className={styles.wrapper}>
      <Link href="/" className={styles.navLogo}>
        CodeFramer
      </Link>
      <div className={styles.list}>
        <Link href="/" className={styles.link}>
          <FaHome className={styles.navLinkIco} />
          &nbsp;Home
        </Link>
        <Link href="/try_editor" className={styles.link}>
          <FaLaptopCode className={styles.navLinkIco} />
          &nbsp;Try Editor
        </Link>
        <Link href="/signin" className={styles.link}>
          <FaSignInAlt className={styles.navLinkIco} />
          &nbsp;Sign In
        </Link>
        <button onClick={modeHandler} className={styles.btna}>
          <BsNintendoSwitch />
          Theme
        </button>
      </div>
    </div>
  );
}
