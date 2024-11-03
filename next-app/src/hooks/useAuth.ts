import { AuthContext } from "@/context/AuthProvider";
import React from "react";

const useAuth = () => {
  return React.useContext(AuthContext);
};

export default useAuth;
