"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!isAuth) {
      router.push("/auth?mode=login");
    }
  }, [isAuth, router]);
  return isAuth ? children : null;
};

export default Layout;
