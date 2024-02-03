"use client";
import { RefreshContext } from "./index";
import { useState } from "react";

export default function Refresh({ children }) {
  const [isRefresh, setRefresh] = useState(true);

  return (
    <RefreshContext.Provider value={{ isRefresh, setRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
}