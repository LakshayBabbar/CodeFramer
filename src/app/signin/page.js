"use client";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import SignIn from "@/components/SignIn/SignIn";
import Image from "next/image";
import img from "../../assests/contact.webp";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../lib/firebase';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function index() {
  const redirect = useRouter();
useEffect(()=>{
  onAuthStateChanged(auth,(user)=>{
    if(user) {
      redirect.push('/dashboard');
    }
  })
},[])

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
      <SignIn />
    </motion.section>
  );
}

export default index;
