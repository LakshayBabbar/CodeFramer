"use client";
import { useContext, useEffect } from "react";
import { db } from "../../../lib/firebase";
import { collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context";
import { useCollectionData } from "react-firebase-hooks/firestore";

const layout = ({ children }) => {
  const { setData, uid, isLogin, loading } = useContext(UserContext);
  const redirect = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isLogin) {
        redirect.push("/signin");
      }
    }
  }, [loading, isLogin, redirect]);

  const query = collection(db, `users/${uid}/projects/`);
  const [docs] = useCollectionData(query);

  useEffect(() => {
    if (docs) {
      setData(docs);
    }
  }, [docs]);

  return isLogin && <>{children}</>;
  return isLogin && <>{children}</>;
};

export default layout;
