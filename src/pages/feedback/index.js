import { motion } from "framer-motion";
import styles from "./styles.module.css";
import Button from "@/components/UI/Button";
import Image from "next/image";
import img from "../../assests/contact.webp";
import { useRef } from "react";

function index() {
  const variants = {
    onclick: { scale: 1.04 },
    transition: { scale: { type: "spring", stiffness: 250 } },
  };

  const name = useRef("");
  const email = useRef("");
  const mssg = useRef("");

  return (
    <motion.div
      initial={{ x: 100 }}
      whileInView={{ x: 0 }}
      transition={{ x: { type: "spring", stiffness: 200 } }}
      className={styles.wrapper}
    >
      <div>
        <Image
          className={styles.img}
          priority
          src={img}
          alt="contact image"
          width="auto"
          height="auto"
          placeholder="blur"
        />
      </div>

      <div className={styles.form}>
        <div className={styles.absolute} />
        <h1>Feedback!</h1>
        <form>
          <motion.input
            type="text"
            placeholder="Name"
            whileTap={variants.onclick}
            transition={variants.transition}
            ref={name}
            required
          />
          <motion.input
            type="email"
            placeholder="Email Id"
            whileTap={variants.onclick}
            transition={variants.transition}
            ref={email}
            required
          />
          <motion.textarea
            name="mssg"
            placeholder="Message!"
            whileTap={variants.onclick}
            transition={variants.transition}
            ref={mssg}
            required
          />
          <Button style={{ width: "8rem" }} type="submit">
            Send
          </Button>
          <div className={styles.absolute2} />
        </form>
      </div>
    </motion.div>
  );
}

export default index;