import styles from "./socials.module.css";
import Button from "./Button";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function Socials() {
  const style = {
    color: "#fff",
    fontSize: "1.7rem",
    padding: "0.4rem 0"
  };

  return (
    <div className={styles.wrapper}>
    <Button>
        <Link href='https://in.linkedin.com/in/lakshay-babbar-5b70a7273' target="_blank"><FaLinkedin style={style} /></Link>
      </Button>
      <Button>
        <Link href='https://github.com/LakshayBabbar' target="_blank"><FaGithub style={style} /></Link>
      </Button>
      <Button>
        <Link href='https://www.instagram.com/thelakshaybabbar/' target="_blank"><FaInstagram style={style} /></Link>
      </Button>
    </div>
  );
}
