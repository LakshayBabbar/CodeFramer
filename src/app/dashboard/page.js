"use client";
import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context";
import Link from "next/link";
import { FaCode } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import Image from "next/image";
import avatar from "../../../public/avatar.svg";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import CreateProject from "@/components/Modals/CreateProject";
import { AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const { data } = useContext(UserContext);
  const [userData, setUserData] = useState([]);
  const [username, setUserName] = useState("user");
  const [open, setIsOpen] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
      }
    });
    setUserData(data);
  }, [data]);

  const modalHandler = (val) => {
    val === false && setIsOpen(false);
  };

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
        <button className={styles.btn} onClick={() => setIsOpen(true)}>
          <IoMdAdd />
          Add Project
        </button>
        {userData.length > 0 ? (
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
                    <Link
                      href={`/dashboard/${elements.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <button className={styles.btn}>Go to Editor</button>
                    </Link>
                    <MdOutlineDelete
                      style={{ color: "red", fontSize: "1.5rem" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Project list is empty!!</p>
        )}
      </section>
      
      <AnimatePresence>
        {open && <CreateProject isOpen={modalHandler} username={username}/>}
      </AnimatePresence>
    </>
  );
};
export default Dashboard;
