"use client";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context";

const layout = ({ children }) => {
  const [isLogin, setLogin] = useState(false);
  const { setData } = useContext(UserContext);
  const redirect = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLogin(false);
        redirect.push("/signin");
      } else {
        setLogin(true);
        const fetchData = async () => {
          const ref = collection(db, "users");
          const q = query(ref, where("username", "==", user.displayName));
          const querySnapshot = await getDocs(q);

          const userDataPromises = querySnapshot.docs.map(async (doc) => {
            const projectQ = query(collection(db, `users/${doc.id}/projects`));
            const projectDetails = await getDocs(projectQ);
            const projectInfo = projectDetails.docs.map((projectDoc) => ({
              ...projectDoc.data(),
              id: projectDoc.data().id,
            }));
            return projectInfo;
          });

          const userDataArray = await Promise.all(userDataPromises);
          const flattenedUserData = userDataArray.flat();
          setData(flattenedUserData);
        };
        fetchData();
      }
    });
  }, []);

  return isLogin && <>{children}</>;
};

export default layout;
