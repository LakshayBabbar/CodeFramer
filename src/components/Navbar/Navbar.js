import styles from "./styles.module.css";
import Link from "next/link";
import Button from "../UI/Button";
import Socials from "../UI/Socials";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [toggle, setToggle] = useState("");
  const [mode, setLight] = useState("dark");

  const nav_toggle = () => {
    if (toggle === "") {
      setToggle("active");
    } else {
      setToggle("");
    }
  };

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
        <button onClick={modeHandler} className={styles.btn}>
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
        <Link href="/" onClick={nav_toggle}>
          <Button>Home</Button>
        </Link>
        <Link href="/webeditor" onClick={nav_toggle}>
          <Button>Web Editor</Button>
        </Link>
        <Link href="/feedback" onClick={nav_toggle}>
          <Button>Feedback</Button>
        </Link>
        <Socials />
      </div>
    </div>
  );
}
