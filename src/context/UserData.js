"use client";
import { UserContext } from "./index";
import { useState } from "react";

export default function UserData({ children }) {
  const [data, setData] = useState({});

  return (
    <UserContext.Provider value={{ data, setData }}>
      {children}
    </UserContext.Provider>
  );
}