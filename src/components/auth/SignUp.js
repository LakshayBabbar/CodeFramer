import { useRef } from "react";
import styles from './signin.module.css';
import { motion } from "framer-motion";
import Button from "../UI/Button";
import { useRouter } from "next/router";

const SignUp = () => {
  const redirect = useRouter();
  const variants = {
    onclick: { scale: 1.04 },
    transition: { scale: { type: "spring", stiffness: 250 } },
  };
  const email = useRef("");
  const password = useRef("");
  const cpassword = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();
    redirect.push('/dashboard');
  }

  return (
    <div className={styles.form}>
      <div className={styles.absolute} />
      <h1>Sign Up</h1>
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
        <motion.input
          type="password"
          name="cPassword"
          placeholder="Confirm Password"
          whileTap={variants.onclick}
          transition={variants.transition}
          ref={cpassword}
          required
        />
        <Button style={{ width: "8rem" }} type="submit">
          Sign Up
        </Button>
        <div className={styles.absolute2} />
      </form>
    </div>
  );
};

export default SignUp;
