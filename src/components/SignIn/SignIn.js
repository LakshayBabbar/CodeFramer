import styles from "./signin.module.css";
import Button from "@/components/UI/Button";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const SignIn = ({formDataLifting}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const redirect = useRouter();
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();
    const data = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    formDataLifting(data);
    redirect.push("/dashboard");
  };

  const variants = {
    onclick: { scale: 1.04 },
    transition: { scale: { type: "spring", stiffness: 250 } },
  };

  return (
    <div className={styles.form}>
      <div className={styles.absolute} />
      <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
      <form onSubmit={submitHandler}>
        <motion.input
          type="text"
          placeholder="Username"
          whileTap={variants.onclick}
          transition={variants.transition}
          ref={username}
          required
        />
        {isSignUp && (
          <motion.input
            type="email"
            placeholder="Email Id"
            whileTap={variants.onclick}
            transition={variants.transition}
            ref={email}
            required
          />
        )}
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
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
        {isSignUp ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setIsSignUp(false)}>Sign In</span>
          </p>
        ) : (
          <p>
            Need an account?{" "}
            <span onClick={() => setIsSignUp(true)}>Sign Up</span>
          </p>
        )}
        <div className={styles.absolute2} />
      </form>
    </div>
  );
};

export default SignIn;
