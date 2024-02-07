import styles from "./footer.module.css";
import Link from "next/link";

function Footer() {
  return (
    <footer className={styles.box}>
      <div className={styles.details}>
        <h1>
          Code<span>Framer</span>
        </h1>
        <div className={styles.routes}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/try_editor" className={styles.link}>
            Try Editor
          </Link>
          <Link href="/signin" className={styles.link}>
            Sign In
          </Link>
          <Link href="/" className={styles.link}>
            Feedback
          </Link>
        </div>
      </div>

      <div className={styles.disclamer}>
        <p>© Copyright 2024, All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
