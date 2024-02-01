"use client";
import styles from "./styles.module.css";
import Link from "next/link";
import { BsNintendoSwitch } from "react-icons/bs";
import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";

export default function Navbar() {
  const [mode, setLight] = useState("");
  const [isLogin, setLogin] = useState(false);
  const [name, setUserName] = useState("");

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
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLogin(false);
      } else {
        setLogin(true);
        setUserName(user.displayName);
      }
    });
  }, [isLogin]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "darkMode") {
      setLight(theme);
      document.body.className = theme;
    } else {
      document.body.className = mode;
    }
  }, [mode]);

  const signOutHandler = () => {
    signOut(auth);
  };

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
        {isLogin ? (
          <div className={styles.dropdown}>
            <button className={styles.btna}>
              <MdAccountCircle className={styles.navLinkIco} />
              Profile
            </button>
            <div className={styles.dropdownContent}>
              <Link href="/dashboard" className={styles.link}>
                <MdSpaceDashboard className={styles.navLinkIco} />
                &nbsp;Dashboard
              </Link>
              <button onClick={signOutHandler} className={styles.btna}>
                <FaSignInAlt />
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <Link href="/signin" className={styles.link}>
            <FaSignInAlt className={styles.navLinkIco} />
            &nbsp;Sign In
          </Link>
        )}
        <button onClick={modeHandler} className={styles.btna}>
          <BsNintendoSwitch />
          Theme
        </button>
      </div>
    </div>
  );
}
