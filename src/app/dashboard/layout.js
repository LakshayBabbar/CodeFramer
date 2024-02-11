"use client";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import { RefreshContext } from "@/context";
import { UserContext } from "@/context";
import Loading from "@/components/Loading/Loading";

const layout = ({ children }) => {
  const [isLogin, setLogin] = useState(false);
  const { setData } = useContext(UserContext);
  const { isRefresh, setRefresh } = useContext(RefreshContext);
  const redirect = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLogin(false);
        redirect.push("/signin");
      } else {
        setLogin(true);
        if (isRefresh) {
          const fetchData = async () => {
            const ref = collection(db, "users");
            const q = query(ref, where("username", "==", user.displayName));
            const querySnapshot = await getDocs(q);

            const userDataPromises = querySnapshot.docs.map(async (doc) => {
              const projectQ = query(
                collection(db, `users/${doc.id}/projects`)
              );
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
          setRefresh(false);
        }
      }
    });
  }, [isRefresh]);

  return isLogin && <>{children}</>;
};

export default layout;
