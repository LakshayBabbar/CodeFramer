import styles from "./footer.module.css";
import Socials from "../UI/Socials";

function Footer() {
  return (
    <>
    <div className={styles.divider}></div>
    <div className={styles.wrapper}>
        <h1>CodeFramer</h1>
        <p>Copyright © 2024 CodeFramer. All rights reserved.</p>
        <Socials />
    </div>
    </>
  );
}

export default Footer;
