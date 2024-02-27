"use client";
import styles from "./signin.module.css";
import Button from "@/components/UI/Button";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../lib/firebase";
import { db } from "../../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { UserContext } from "@/context";

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
  const { setUserName } = useContext(UserContext);

  const formDataHandler = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      const isValidUsername = /^[a-zA-Z0-9_]+$/.test(value);
      const len = value.length <= 3;
      if (!isValidUsername || len) {
        setError(true);
        setErrorMssg(
          "Invalid username. Only letters, numbers, and semicolons allowed. Length must be 3+ characters."
        );
      } else {
        setError(false);
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "email") {
      const allowedProviders = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
      ];
      const emailParts = value.split("@");
      const domain = emailParts[1];

      if (!allowedProviders.includes(domain)) {
        setError(true);
        setErrorMssg(
          "Invalid email provider. Only Gmail, Yahoo, Outlook, and Hotmail are allowed."
        );
      } else {
        setError(false);
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const username = formData.username.toLowerCase();
    if (!error) {
      if (isSignUp) {
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
          .then(async (res) => {
            await updateProfile(res.user, {
              displayName: username,
            });
            const ref = doc(db, `users/${res.user.uid}`);
            await setDoc(ref, {
              userId: res.user.uid,
              username: username,
              email: formData.email,
            });
            setUserName(username);
          })
          .catch((error) => {
            setError(true);
            setErrorMssg(error.message);
          });
      } else {
        signInWithEmailAndPassword(auth, formData.email, formData.password)
          .then(() => {
            !error && redirect.push("/dashboard");
          })
          .catch((error) => {
            setError(true);
            setErrorMssg(error.message);
          });
      }
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.absolute} />
      <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
      <form onSubmit={submitHandler}>
        {isSignUp && (
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={formDataHandler}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email Id"
          name="email"
          onChange={formDataHandler}
          required
        />
        <input
          type="password"
          name="password"
          onChange={formDataHandler}
          placeholder="Password"
          required
        />
        {error && <p className={styles.errorMssg}>{errorMssg}</p>}
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
