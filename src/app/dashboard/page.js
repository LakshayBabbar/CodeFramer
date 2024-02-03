"use client";
import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context";
import { useRouter } from "next/navigation";
import { FaCode } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import Image from "next/image";
import avatar from "../../../public/avatar.svg";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import CreateProject from "@/components/Modals/CreateProject";
import { AnimatePresence } from "framer-motion";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { RefreshContext } from "@/context";

const Dashboard = () => {
  const { data } = useContext(UserContext);
  const [userData, setUserData] = useState([]);
  const [username, setUserName] = useState("user");
  const [isOpen, setIsOpen] = useState(false);
  const { setRefresh } = useContext(RefreshContext);
  const redirect = useRouter();

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

  const deleteHandler = async (name) => {
    const sure = confirm("Are you sure you want to delete this project?");
    if (sure) {
      const ref = doc(db, `users/${username}/projects/${name}`);
      await deleteDoc(ref);
      setRefresh(true);
    }
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
        <button
          className={`${styles.btn} btnDesign`}
          onClick={() => setIsOpen(true)}
        >
          <IoMdAdd />
          New Project
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
                    <button
                      className={styles.btn}
                      onClick={() => redirect.push(`/dashboard/${elements.id}`)}
                    >
                      Go to Editor
                    </button>
                    <MdOutlineDelete
                      style={{ color: "red", fontSize: "1.5rem" }}
                      onClick={() => deleteHandler(elements.name)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{textAlign: "center", padding: "0 2rem"}}>
            Your project list is empty. Click on "New Project" to create one.
          </p>
        )}
      </section>

      <AnimatePresence>
        {isOpen && <CreateProject isOpen={modalHandler} username={username} />}
      </AnimatePresence>
    </>
  );
};
export default Dashboard;
