import styles from "./styles.module.css";
import Link from "next/link";
import Button from "../UI/Button";
import Socials from "../UI/Socials";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

export default function Navbar() {
    const [toggle, setToggle] = useState("");

    const nav_toggle = () => {
      if (toggle === "") {
        setToggle("active");
      } else {
        setToggle("");
      }
    };

  return (
    <div className={` ${styles.wrapper} ${toggle==='active' ? styles.active : ''}`}>
      <div className={styles.navLogo}>
        <Link href="/" className={styles.logo}>
          CodeFramer
        </Link>
      </div>
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
      <div className={styles.list}>
        <Link href="/" >
          <Button onClick={nav_toggle}>
            Home
          </Button>
        </Link>
        <Link href="/webeditor">
          <Button onClick={nav_toggle}>
            Web Editor
          </Button>
        </Link>
        <Link href="/feedback">
          <Button onClick={nav_toggle}>
            Feedback
          </Button>
        </Link>
        <Socials />
      </div>
    </div>
  );
}
