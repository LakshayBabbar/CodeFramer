"use client";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "./index";
import { auth } from "../../lib/firebase";
import { useEffect, useState } from "react";

export default function UserData({ children }) {
  const [data, setData] = useState([]);
  const [uid, setUid] = useState(undefined);
  const [username, setUserName] = useState(undefined);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsLogin(false);
      } else {
        setUid(user.uid);
        setUserName(user.displayName);
        setIsLogin(true);
      }
      setLoading(false);
    });
  }, [isLogin]);

  return (
    <UserContext.Provider
      value={{ data, setData, uid, username, setUserName, isLogin, setIsLogin, loading }}
    >
      {children}
    </UserContext.Provider>
  );
}
