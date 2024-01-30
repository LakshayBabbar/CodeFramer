"use client";
import styles from "./signin.module.css";
import Button from "@/components/UI/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiSolidError } from "react-icons/bi";
import { auth } from "../../../lib/firebase";
import { db } from "../../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errorMssg, setErrorMssg] = useState("Error Occured!!");
  const redirect = useRouter();

  const formDataHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setError(false);
    if (isSignUp) {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then(() => {
          const docRef = addDoc(collection(db, "users"), {
            username: formData.username,
            email: formData.email,
          });
          localStorage.setItem("username", formData.username);
        })
        .catch((error) => {
          setError(true);
          setErrorMssg(error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then(async () => {
          const ref = collection(db, "users");
          const q = query(ref, where("email", "==", formData.email));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            localStorage.setItem("username", doc.data().username);
            !error && redirect.push("/dashboard");
          });
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
            onChange={formDataHandler}
            autoComplete="on"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email Id"
          name="email"
          onChange={formDataHandler}
          autoComplete="on"
          required
        />
        <input
          type="password"
          name="password"
          onChange={formDataHandler}
          placeholder="Password"
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
