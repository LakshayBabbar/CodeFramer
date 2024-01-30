import styles from "./styles.module.css";
import { signOut } from "firebase/auth";
import { auth } from '../../../lib/firebase';
import { MdAddCircle } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const Sidebar = ({ username, projectsList }) => {
  const [active, setActive] = useState("");
  const signOutHandler = () => {
    signOut(auth);
    localStorage.removeItem("username");
  };

  const activeHandler = () => {
    active === "" ? setActive("active") : setActive("");
  };

  return (
    <>
      <div
        className={`${styles.wrapper} ${active === "active" && styles.active}`}
      >
        <h2>{username}</h2>
        <div className={styles.projects}>
          <h2>Projects</h2>
          <ul className={styles.list}>
            {projectsList.map((items) => {
              return (
                <li className={styles.listItems} key={items.id}>
                  {items.name}
                </li>
              );
            })}
            <li className={styles.listItems}>
              <MdAddCircle />
              &nbsp;Add Project
            </li>
          </ul>
        </div>
        <button onClick={signOutHandler} className={styles.btn}>
          Log Out
        </button>
      </div>
      <div className={styles.menu}>
          {active === "" ? (
            <RiMenu3Fill onClick={activeHandler} className={styles.menuIco} />
          ) : (
            <IoMdClose onClick={activeHandler} className={styles.menuIco} />
          )}
        </div>
    </>
  );
};

export default Sidebar;
