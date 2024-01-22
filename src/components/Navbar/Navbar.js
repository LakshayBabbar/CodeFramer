import styles from "./styles.module.css";
import Link from "next/link";
/* import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io"; */
import { BsNintendoSwitch } from "react-icons/bs";
import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Navbar() {
  const [mode, setLight] = useState("dark");

  const modeHandler = () => {
    if (mode === "dark") {
      setLight("lightMode");
    } else {
      setLight("dark");
    }
  };

  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  return (
    <div className={styles.wrapper}>
      <Link href="/" className={styles.navLogo}>
        CodeFramer
      </Link>
      <motion.div
        className={styles.list}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Link href="/" className={styles.link}>
          <FaHome className={styles.navLinkIco} />
          &nbsp;Home
        </Link>
        <Link href="/webeditor" className={styles.link}>
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
      </motion.div>
    </div>
  );
}
