"use client";
import styles from "./styles.module.css";
import { useState, useEffect, useContext } from "react";
import { db } from "../../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { UserContext } from "@/context";
import Card from "../UI/Card";

const Dashboard = ({ username }) => {
  const [userData, setUserData] = useState([]);
  const { setData, data } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const ref = collection(db, "users");
      const q = query(ref, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      const userDataPromises = querySnapshot.docs.map(async (doc) => {
        const projectQ = query(collection(db, `users/${doc.id}/projects`));
        const projectDetails = await getDocs(projectQ);
        const projectInfo = projectDetails.docs.map((projectDoc) => ({
          ...projectDoc.data(),
          id: projectDoc.id,
        }));
        return projectInfo;
      });

      const userDataArray = await Promise.all(userDataPromises);
      const flattenedUserData = userDataArray.flat();
      setData(flattenedUserData[1]);
      setUserData(flattenedUserData);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
    {console.log(userData)}
      <h1>Projects</h1>
      <ul>
      {userData.map((elements) => {
        return <li>{elements.name}</li>;
      })}
      </ul>
    </div>
  );
};
export default Dashboard;
