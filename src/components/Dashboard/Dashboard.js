"use client";
import styles from "./styles.module.css";
import { useState, useEffect, useContext } from "react";
import { db } from "../../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { UserContext } from "@/context";
import Link from "next/link";
import Button from "../UI/Button";
import { FaCode } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import Image from "next/image";
import avatar from "../../../public/avatar.svg";

const Dashboard = ({ username }) => {
  const [userData, setUserData] = useState([]);
  const { setData } = useContext(UserContext);

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
      setData(flattenedUserData[0]);
      setUserData(flattenedUserData);
    };
    fetchData();
  }, []);

  return (
    <>
      <section className={styles.user}>
        <div className={styles.usersDetails}>
          <Image src={avatar} alt="avatar pic" width="80" />
          <div className={styles.userRight}>
            <h1>Hello,</h1>
            <h2>@{username}</h2>
          </div>
        </div>
      </section>

      <section className={styles.project}>
        <h1>Projects</h1>
        <div className={styles.addProject}>
          <IoMdAdd />
          Add Project
        </div>
        <div className={styles.container}>
          {userData.map((elements) => {
            return (
              <div className={styles.allProjects} key={elements.id}>
                <h2>
                  <FaCode />
                  {elements.name}
                </h2>
                <p>{elements.desc}</p>
                <div className={styles.projectButtons}>
                  <Link href={`/dashboard/${elements.id}`}>
                    <Button
                      style={{ background: "var(--text)", color: "var(--bg)" }}
                    >
                      Go to Editor
                    </Button>
                  </Link>
                  <MdOutlineDelete
                    style={{ color: "red", fontSize: "1.5rem" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default Dashboard;
