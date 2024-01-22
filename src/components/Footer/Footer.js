import styles from "./footer.module.css";
import Socials from "../UI/Socials";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.divider} />
      <div className={styles.wrapper}>
        <h1>CodeFramer</h1>
        <p>Copyright © 2024 CodeFramer. All rights reserved.</p>
        <Socials />
      </div>
    </footer>
  );
}

export default Footer;
