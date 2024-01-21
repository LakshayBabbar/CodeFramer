import styles from "./signin.module.css";
import Button from "@/components/UI/Button";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const SignIn = () => {
  const history = useRouter();
  const variants = {
    onclick: { scale: 1.04 },
    transition: { scale: { type: "spring", stiffness: 250 } },
  };
  const email = useRef("");
  const password = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();
    history.push('/dashboard')
  }

  return (
    <div className={styles.form}>
      <div className={styles.absolute} />
      <h1>Sign In</h1>
      <form onSubmit={submitHandler}>
        <motion.input
          type="email"
          placeholder="Email Id"
          whileTap={variants.onclick}
          transition={variants.transition}
          ref={email}
          required
        />
        <motion.input
          type="password"
          name="Password"
          placeholder="Password"
          whileTap={variants.onclick}
          transition={variants.transition}
          ref={password}
          required
        />
        <Button style={{ width: "8rem" }} type="submit">
          Sign In
        </Button>
        <div className={styles.absolute2} />
      </form>
    </div>
  );
};

export default SignIn;
