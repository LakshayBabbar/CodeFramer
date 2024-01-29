"use client";
import styles from "./styles.module.css";
import SignIn from "@/components/SignIn/SignIn";
import Image from "next/image";
import img from "../../assests/contact.webp";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function signIn() {
  const redirect = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        redirect.push("/dashboard");
      }
    });
  }, []);

  return (
    <section className={styles.wrapper}>
      <div>
        <Image
          className={styles.img}
          priority
          src={img}
          alt="contact image"
          width="auto"
          height="auto"
        />
      </div>
      <SignIn />
    </section>
  );
}

export default signIn;
