"use client";
import styles from "./page.module.css";
import { SiTestrail } from "react-icons/si";
import { MdOutlineSnippetFolder } from "react-icons/md";
import { MdOutlineFeedback } from "react-icons/md";
import Card from "@/components/UI/Card";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import img from "../../public/code.webp";

export default function Home() {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.wrapper}>
          <span className={styles.span1}>Welcome&nbsp;to</span>
          <h1>
            Code<span>Framer</span>
          </h1>
          <p>
            Welcome to CodeFramer, your go-to destination for seamless and
            collaborative coding experiences! At CodeFramer, we understand the
            dynamic nature of web development and the importance of having a
            versatile online editor that caters to the needs of developers
            working with HTML, CSS, JavaScript, and Python.
          </p>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={img}
            className={styles.img}
            alt="image"
            width={550}
            height={550}
          />
        </div>
      </section>
      <div className={styles.cards}>
        <Card
          img=<MdOutlineSnippetFolder className={styles.cardLogo} />
          title="Sign In"
          desc="Sign in to save and access your projects from any device, anywhere. Enjoy the flexibility to continue your creative work seamlessly, unlocking the ability to collaborate from wherever inspiration strikes."
          linkT="Sign In"
          link="/signin"
        />
        <Card
          img=<SiTestrail className={styles.cardLogo} />
          title="Try Editor"
          desc="Try our editor to experiment freely with features. Note that work won't be saved in try mode. Sign in for full functionality and secure storage of your creative projects, accessible from any device."
          linkT="Go to Editor"
          link="/try_editor"
        />
        <Card
          img=<MdOutlineFeedback className={styles.cardLogo} />
          title="Feedback"
          desc="We appreciate your feedback on our code editor website. Your input helps us improve and tailor the platform to better serve your needs. Thank you for taking the time to share your thoughts with us!"
          linkT="Write a feedback"
          link="/feedback"
        />
      </div>
      <Footer />
    </>
  );
}
