"use client";
import styles from "./page.module.css";
import Hero from "@/components/Header/Hero";
import { SiTestrail } from "react-icons/si";
import { MdOutlineSnippetFolder } from "react-icons/md";
import Card from "@/components/UI/Card";
/* import { motion } from "framer-motion"; */
import Footer from "@/components/Footer/Footer";

export default function Home() {
  const style = {
    fontSize: "4rem",
    color: "var(--text)",
  };
  return (
    <>
      <Hero />
      <section className={styles.gs}>
        <h1>
          Getting <span>Started!</span>
        </h1>
        <p>
          Ready to start coding? Getting going with CodeFramer is a snap! Our
          user-friendly platform gives you instant code suggestions and
          auto-completion to make your coding journey smoother. Whether you're a
          pro or a beginner, CodeFramer's got your back. Start coding
          effortlessly and explore the joy of collaborating in real-time. It's
          easy, it's fast - let's code together with CodeFramer!
        </p>
        <div className={styles.cards}>
          <Card
            img=<MdOutlineSnippetFolder style={style} />
            title="Sign In"
            desc="Sign in to save your projects and enjoy access from any device, anywhere. Experience the ease of seamlessly continuing your creative journey - sign in now and unlock the flexibility to work on your projects wherever inspiration finds you."
            linkT="Sign In"
            link="/signin"
          />
          <Card
            img=<SiTestrail style={style} />
            title="Try Editor"
            desc="Try our editor to experiment freely with features. Note that work won't be saved in try mode. Sign in for full functionality and secure storage of your creative projects, accessible from any device."
            linkT="Go to Editor"
            link="/try_editor"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
