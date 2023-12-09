import styles from "./styles.module.css";
import Link from "next/link";
import Socials from "../UI/Socials";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { GoHome } from "react-icons/go";
import { FaCode } from "react-icons/fa6";
import { VscFeedback } from "react-icons/vsc";
import { motion } from "framer-motion";

export default function Navbar() {
  const [toggle, setToggle] = useState("");
  const [mode, setLight] = useState("dark");
  const [btnStyle, setbtnStyle] = useState({});

  const nav_toggle = () => {
    if (toggle === "") {
      setToggle("active");
    } else {
      setToggle("");
    }
  };

  const modeHandler = () => {
    setbtnStyle({
      background: "var(--nav)",
      scale: "0.8",
      rotate: "0deg",
    });
    if (mode === "dark") {
      setLight("lightMode");
    } else {
      setLight("dark");
    }
    setTimeout(() => {
      setbtnStyle({
        background: "var(--text)",
      });
    }, 400);
  };

  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  return (
    <div
      className={` ${styles.wrapper} ${
        toggle === "active" ? styles.active : ""
      }`}
    >
      <div className={styles.navLogo}>
        <Link href="/" className={styles.logo}>
          CodeFramer
        </Link>
      </div>
      <div className={styles.sideBar}>
        <button onClick={modeHandler} className={styles.btn} style={btnStyle}>
          {mode === "lightMode" ? <MdSunny /> : <BsFillMoonStarsFill />}
        </button>
        <div className={styles.menu}>
          <RiMenu3Fill
            className={styles.controller}
            onClick={nav_toggle}
            name="menu-btn"
          />
          <IoMdClose
            className={styles.controller}
            onClick={nav_toggle}
            name="close-btn"
          />
        </div>
      </div>
      <div className={styles.list}>
        <motion.div
          className={styles.listItems}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Link href="/" onClick={nav_toggle} className={styles.link}>
            <GoHome className={styles.navLinkIco} />
            &nbsp;Home
          </Link>
          <Link href="/webeditor" onClick={nav_toggle} className={styles.link}>
            <FaCode className={styles.navLinkIco} />
            &nbsp;Web Editor
          </Link>
          <Link href="/feedback" onClick={nav_toggle} className={styles.link}>
            <VscFeedback className={styles.navLinkIco} />
            &nbsp;Feedback
          </Link>
          <Socials />
        </motion.div>
      </div>
    </div>
  );
}
