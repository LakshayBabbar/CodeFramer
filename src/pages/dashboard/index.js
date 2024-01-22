import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../api/firebase";
import { useRouter } from "next/router";

const index = () => {
  const [username, setUserName] = useState('');
  const [isLogin, setLogin] = useState(false);
  const redirect = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLogin(false);
        redirect.push('/signin');
      }
      else{
        setLogin(true);
      }
    });
    setUserName(localStorage.getItem("username"));
  }, []);

  const signOutHandler = () => {
    signOut(auth);
    localStorage.removeItem("username");
  }

  return (
    <>
        {isLogin && <div className={styles.wrapper}>
          <h1 className={styles.name}>Welcome, {username}</h1>
          <h2 className={styles.fallback}>
            We apologize, but it appears that the SignIn/SignUp functionality is
            currently incomplete. Please try again at a later time.
          </h2>
          <button onClick={signOutHandler} className={styles.btn}>Log Out</button>
        </div>}
    </>
  );
};

export default index;
