import { useEffect, useState } from "react";
import styles from './styles.module.css';
import Sidebar from "@/components/Sidebar/Sidebar";
import Dashboard from "../../components/Dashboard/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebase";
import { useRouter } from "next/router";

const index = () => {
  const [username, setUserName] = useState("");
  const [isLogin, setLogin] = useState(false);
  const redirect = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLogin(false);
        redirect.push("/signin");
      } else {
        setLogin(true);
      }
    });
    setUserName(localStorage.getItem("username"));
  }, [username]);

  return (
    <>
      {isLogin && (
        <div className={styles.wrapper}>
          <Sidebar username={username} />
          <Dashboard username={username} />
        </div>
      )}
    </>
  );
};

export default index;
