"use client";
import styles from "./styles.module.css";
import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { db } from "../../../lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [username, setUserName] = useState(null);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const uName = localStorage.getItem("username"); 
    setUserName(uName);
    const fetchData = async () => {
      const ref = collection(db, "users");
      const q = query(ref, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc)=>({
        ...doc.data(), id: doc.id
      }))
      data.map(async(elem)=>{
        const projectQ = query(collection(db,`users/${elem.id}/projects`));
        const projectDetails = await getDocs(projectQ);
        const projectInfo = projectDetails.docs.map((doc)=>({
          ...doc.data(), id: doc.id
        }))
        setUserData(projectInfo);
      })
    }
    fetchData();
  }, [username]);
  return (
    <>
      <div className={styles.wrapper}>
        <Sidebar username={username} projectsList={userData}/>
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
