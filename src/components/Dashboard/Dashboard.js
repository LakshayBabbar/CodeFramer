"use client";
import styles from "./styles.module.css";
import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [username, setUserName] = useState(null);
  useEffect(() => {
    const uName = localStorage.getItem("username"); 
    setUserName(uName);
  }, [username]);
  return (
    <>
      <div className={styles.wrapper}>
        <Sidebar username={username} />
        <div className={styles.container}>
          <h1 className={styles.name}>Hello, {username}</h1>
          <h2 className={styles.fallback}>
            We apologize, but it appears that the SignIn/SignUp functionality is
            currently incomplete. Please try again at a later time.
          </h2>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
