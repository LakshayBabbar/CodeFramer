"use client";
import { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";

const index = () => {
  const [isLogin, setLogin] = useState(false);
  const [username, setUserName] = useState("");
  const redirect = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLogin(false);
        redirect.push("/signin");
      } else {
        setLogin(true);
        setUserName(user.displayName);
      }
    });
  }, [isLogin]);

  return <>{isLogin && <Dashboard username={username} />}</>;
};

export default index;
