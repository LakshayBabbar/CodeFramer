import styles from "./signin.module.css";
import Button from "@/components/UI/Button";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { BiSolidError } from "react-icons/bi";
import { auth } from "@/pages/api/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const redirect = useRouter();
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const [error, setError] = useState(false);
  const [errorMssg, setErrorMssg] = useState("Error Occured!!");

  const submitHandler = (event) => {
    event.preventDefault();
    setError(false);
    if (isSignUp) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
          localStorage.setItem("username", username.current.value);
          redirect.push("/signin");
        })
        .catch((error) => {
          setError(true);
          setErrorMssg(error.message);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
          localStorage.setItem("username", username.current.value);
          !error && redirect.push("/dashboard");
        })
        .catch((error) => {
          setError(true);
          setErrorMssg(error.message);
        });
    }
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
        {isSignUp && (
          <motion.input
            type="text"
            placeholder="Username"
            name="username"
            whileTap={variants.onclick}
            transition={variants.transition}
            ref={username}
            autoComplete="on"
            required
          />
        )}
        <motion.input
          type="email"
          placeholder="Email Id"
          name="email"
          whileTap={variants.onclick}
          transition={variants.transition}
          ref={email}
          autoComplete="on"
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
        {error && (
          <p className={styles.errorMssg}>
            <BiSolidError />
            {errorMssg}
          </p>
        )}
        <Button style={{ width: "8rem" }} type="submit">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
        {isSignUp ? (
          <p className={styles.choose}>
            Already have an account?{" "}
            <span onClick={() => setIsSignUp(false)}>Sign In</span>
          </p>
        ) : (
          <p className={styles.choose}>
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
