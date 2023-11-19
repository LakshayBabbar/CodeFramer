import styles from "./header.module.css";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import img from "../../assests/css.png";
import img2 from "../../assests/js.png";

function Intro() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3>Welcome to</h3>
        <h1>
          Code<span>Framer</span>
        </h1>
        <TypeAnimation
          sequence={[
            "The fastest and user-friendly code editor",
            1000,
            "Featuring lightning-fast suggestions",
            1000,
            "and seamless auto-completion.",
            1000,
          ]}
          speed={1}
          repeat={Infinity}
          style={{
            fontSize: "2rem",
            textAlign: "center",
            color: "#0091ff",
            fontWeight: "800",
          }}
        />
        <p>
          Welcome to CodeFramer, your go-to destination for seamless and
          collaborative coding experiences! At CodeFramer, we understand the
          dynamic nature of web development and the importance of having a
          versatile online editor that caters to the needs of developers working
          with HTML, CSS, JavaScript, and Python.
        </p>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          priority
          src={img}
          className={styles.img}
          alt="image"
          placeholder="blur"
        />
        <Image
          priority
          src={img2}
          className={styles.img2}
          alt="image"
          placeholder="blur"
        />
      </div>
    </div>
  );
}

export default Intro;
