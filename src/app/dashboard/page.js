'use client';
import { useEffect, useState } from "react";
import styles from './styles.module.css';
import Sidebar from "@/components/Sidebar/Sidebar";
import Dashboard from "../../components/Dashboard/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../lib/firebase';
import { useContext } from "react";
import { UserContext } from "@/context";
import { useRouter } from "next/navigation";

const index = () => {
  const [isLogin, setLogin] = useState(false);
  const {data} = useContext(UserContext);
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
  }, [isLogin]);

  return (
    <>
      {isLogin && (
        <div className={styles.wrapper}>
          <Sidebar username={data.username} />
          <Dashboard username={data.username} />
        </div>
      )}
    </>
  );
};

export default index;
