import styles from "./socials.module.css";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function Socials({style}) {
  return (
    <div className={styles.wrapper}>
      <Link
        href="https://in.linkedin.com/in/lakshay-babbar-5b70a7273"
        target="_blank"
      >
        <FaLinkedin className={styles.link} style={style}/>
      </Link>
      <Link href="https://github.com/LakshayBabbar" target="_blank">
        <FaGithub className={styles.link} style={style}/>
      </Link>
      <Link href="https://www.instagram.com/thelakshaybabbar/" target="_blank">
        <FaInstagram className={styles.link} style={style}/>
      </Link>
    </div>
  );
}
