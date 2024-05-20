"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useRouter();
  useEffect(() => {
    !isAuth && navigate.push("/auth?mode=login");
  }, [isAuth, navigate]);
  return isAuth ? children : null;
};

export default Layout;
