"use client";
import styles from "./signin.module.css";
import Button from "@/components/UI/Button";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BiSolidError } from "react-icons/bi";
import { auth } from '../../../lib/firebase';
import { db } from '../../../lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useContext } from "react";
import {UserContext} from "@/context/index";

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const [error, setError] = useState(false);
  const [errorMssg, setErrorMssg] = useState("Error Occured!!");
  const { setData } = useContext(UserContext);
  const redirect = useRouter();

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
          const docRef = addDoc(collection(db, "users"), {
            username: username.current.value,
            email: email.current.value,
          });
          setData({username: username.current.value});
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
        .then(async() => {
          const ref = collection(db, "users");
          const q = query(ref, where("email", "==", email.current.value));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setData({username: doc.data().username});
          });
          !error && redirect.push("/dashboard");
        })
        .catch((error) => {
          setError(true);
          setErrorMssg(error.message);
        });
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.absolute} />
      <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
      <form action="POST" onSubmit={submitHandler}>
        {isSignUp && (
          <input
            type="text"
            placeholder="Username"
            name="username"
            ref={username}
            autoComplete="on"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email Id"
          name="email"
          ref={email}
          autoComplete="on"
          required
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
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
      </form>
    </div>
  );
};

export default SignIn;
