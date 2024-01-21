import { motion } from "framer-motion";
import styles from "./styles.module.css";
import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import Image from "next/image";
import img from "../../assests/contact.webp";
import { useState } from "react";

function index() {
  const [active, setActive] = useState(<SignIn />);
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
        {active}
        <p>
          {active.type === SignIn ? (
            <>
              Need an account?{" "}
              <span onClick={() => setActive(<SignUp />)}>Sign Up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setActive(<SignIn />)}>Sign In</span>
            </>
          )}
        </p>
      </div>
    </motion.section>
  );
}

export default index;
