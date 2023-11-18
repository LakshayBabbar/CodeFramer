import styles from "./header.module.css";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import img from "../../assests/code.png";
import grid from "../../assests/grid.png";

function Intro() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Image priority src={grid} alt="grid" className={styles.grid} />
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
      <div className={styles.img}>
        <Image src={img} className={styles.img} alt="image" />
      </div>
    </div>
  );
}

export default Intro;
