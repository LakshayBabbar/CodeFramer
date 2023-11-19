import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Intro from "@/components/Header/Intro";
import { SiTestrail } from "react-icons/si";
import { VscFeedback } from "react-icons/vsc";
import Card from "@/components/UI/Card";
import Footer from "@/components/Footer/Footer";
import { motion } from "framer-motion";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const style = {
    fontSize: "5rem",
    marginBottom: "1rem",
  };
  return (
    <>
      <Head>
        <title>CodeFramer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.main
        initial={{ x: -100 }}
        whileInView={{ x: 0 }}
        transition={{ x: { type: "spring", stiffness: 200 } }}
      >
        <Intro />
        <section className={styles.scroller}>
          <div className={styles.outer}>
            <div className={styles.inner} />
          </div>
        </section>
        <section className={styles.gs}>
          <h1>
            Getting <span>Started!</span>
          </h1>
          <p>
            Ready to start coding? Getting going with CodeFramer is a snap! Our
            user-friendly platform gives you instant code suggestions and
            auto-completion to make your coding journey smoother. Whether you're
            a pro or a beginner, CodeFramer's got your back. Start coding
            effortlessly and explore the joy of collaborating in real-time. It's
            easy, it's fast - let's code together with CodeFramer!
          </p>
          <div className={styles.cards}>
            <Card
              img=<SiTestrail style={style} />
              title="Web Editor"
              desc="Build & Test"
              link="/webeditor"
              linkT="Try the Editor"
            />
            <Card
              img=<VscFeedback style={style} />
              title="Feedback"
              desc="Your Feedback Matters"
              link="/feedback"
              linkT="Go to Feedback"
            />
          </div>
        </section>
        <Footer />
      </motion.main>
    </>
  );
}
