"use client";
import styles from "./styles.module.css";
import { useContext, useState } from "react";
import { UserContext } from "@/context";
import { FaCode } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import Image from "next/image";
import avatar from "../../../public/avatar.svg";
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../../../lib/firebase";
import CreateProject from "@/components/Modals/CreateProject";
import { AnimatePresence } from "framer-motion";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";


const Dashboard = () => {
  const { data, uid, username } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const style = {
    color: "red",
    fontSize: "1.5rem",
    cursor: "pointer",
  };

  const modalHandler = (val) => {
    val === false && setIsOpen(false);
  };

  const deleteHandler = async (name) => {
    const sure = confirm("Are you sure you want to delete this project?");
    if (sure) {
      const ref = doc(db, `users/${uid}/projects/${name}`);
      await deleteDoc(ref);
    }
  };

  const userDeleteHandler = () => {
    const user = auth.currentUser;
    const sure = confirm(
      "Proceeding with the deletion of your account will result in the permanent removal of all associated projects. Please confirm your decision, as recovery will not be possible once completed."
    );
    if (sure) {
      const input = prompt("Confirm your password");
      const ref = doc(db, `users/${uid}`);
      const credentials = EmailAuthProvider.credential(user.email, input);
      reauthenticateWithCredential(user, credentials)
        .then(async() => {
          await deleteDoc(ref);
          deleteUser(user)
            .then(() => {
              sessionStorage.removeItem("user-creds");
              sessionStorage.removeItem("user-info");
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <>
      <section className={styles.user}>
        <div className={styles.usersDetails}>
          <Image src={avatar} alt="avatar pic" width="80" />
          <div className={styles.userRight}>
            <h1>Hello,</h1>
            <h2>
              @{username}{" "}
              <MdOutlineDelete style={style} onClick={userDeleteHandler} />
            </h2>
          </div>
        </div>
      </section>

      <section className={styles.project}>
        <h1>Your Project's</h1>
        <button
          className={`${styles.btn} btnDesign`}
          onClick={() => setIsOpen(true)}
        >
          <IoMdAdd />
          New Project
        </button>
        {data.length > 0 ? (
          <div className={styles.container}>
            {data.map((elements) => {
              return (
                <div className={styles.allProjects} key={elements.id}>
                  <h2>
                    <FaCode />
                    {elements.name}
                  </h2>
                  <p>{elements.desc}</p>
                  <p>
                    <span>Created on:</span> {elements.date}
                  </p>
                  <div className={styles.projectButtons}>
                    <a
                      href={`/dashboard/${elements.id}`}
                      style={{ textDecoration: "none" }}
                      target="_blank"
                    >
                      <button className={styles.btn}>Go to Editor</button>
                    </a>
                    <MdOutlineDelete
                      style={style}
                      onClick={() => deleteHandler(elements.name)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ textAlign: "center", padding: "0 2rem" }}>
            Your project list is empty. Click on "New Project" to create one.
          </p>
        )}
      </section>

      <AnimatePresence>
        {isOpen && (
          <CreateProject
            isOpen={modalHandler}
            username={username}
            data={data}
          />
        )}
      </AnimatePresence>
    </>
  );
};
export default Dashboard;
