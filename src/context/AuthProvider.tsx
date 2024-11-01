"use client";
import React from "react";

interface AuthContextType {
  isAuth: boolean;
  SetIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = React.createContext({
  isAuth: false,
  username: "",
  setUsername: () => {},
  SetIsAuth: () => {},
} as AuthContextType);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuth, SetIsAuth] = React.useState(false);
  const [username, setUsername] = React.useState("");
  return (
    <AuthContext.Provider value={{ isAuth, SetIsAuth, username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
