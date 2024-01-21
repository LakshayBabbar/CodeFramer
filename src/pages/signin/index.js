import { motion } from "framer-motion";
import styles from "./styles.module.css";
import SignIn from "@/components/SignIn/SignIn";
import Image from "next/image";
import img from "../../assests/contact.webp";
import { useState } from "react";

function index() {
  const [data, setData] = useState({})
  const dataLiftingHandler = (formData) => {
    setData(formData);
  }

  return (
    <motion.section
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
      <div className={styles.choose}>
        <SignIn formDataLifting={dataLiftingHandler}/>
      </div>
    </motion.section>
  );
}

export default index;
