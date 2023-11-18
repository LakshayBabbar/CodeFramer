import styles from "./footer.module.css";
import Socials from "../UI/Socials";

function Footer() {
  return (
    <>
    <div className={styles.divider}></div>
    <div className={styles.wrapper}>
        <h1>CodeFramer</h1>
        <p>Made with Love by Lakshay Babbar</p>
        <Socials />
    </div>
    </>
  );
}

export default Footer;
