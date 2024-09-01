"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { RiMenu4Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { authState } from "@/store/features/Auth/authSlice";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import {
  Code2Icon,
  LogIn,
  LogOutIcon,
  MessageSquareDot,
  HomeIcon,
  Laptop,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";

export default function Navbar() {
  const [mode, setMode] = useState("dark");
  const { isAuth } = useSelector((state) => state.auth);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const { data } = useFetch("/api", "auth");
  const navigate = useRouter();
  const pre = "-translate-x-[100vw]";
  const post = "-translate-x-0";

  useEffect(() => {
    if (data && data.isAuth) {
      dispatch(
        authState({
          isAuth: true,
          username: data.username,
        })
      );
    }
  }, [data, dispatch]);

  const modeHandler = (isDark) => {
    const val = isDark ? "dark" : "light";
    setMode(val);
    localStorage.setItem("theme", val);
  };

  const logoutHandler = async () => {
    dispatch(
      authState({
        isAuth: false,
        username: undefined,
      })
    );
    setActive(false);
    localStorage.removeItem("authToken");
    location.reload();
    navigate.push("/");
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark" || !theme) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setMode("light");
    }
  }, [mode]);
  function linkHandler() {
    setActive(false);
  }

  const linkStyle =
    "flex items-center text-md gap-2 dark:text-slate-300 text-slate-800";

  const iconStyle = "size-5 sm:size-4";
  return (
    <div className="h-14 w-full flex justify-between px-5 sm:px-0 sm:justify-around items-center fixed top-0 left-0 bg-[rgba(240,244,255,0.7)] dark:bg-[rgba(11,14,31,0.7)] backdrop-blur-md z-[999]">
      <Link href="/" className={cn(linkStyle, "text-md font-bold")}>
        <Code2Icon className="size-5" />
        CodeFramer
      </Link>
      <div
        className={`${
          active ? post : pre
        } sm:translate-x-0 top-0 left-0 h-screen w-full p-14 sm:p-0 bg-card sm:bg-transparent  sm:h-auto sm:w-auto flex sm:bg-auto absolute sm:relative flex-col sm:flex-row gap-4 sm:items-center transition-all duration-400`}
      >
        <Link href="/" className={linkStyle} onClick={linkHandler}>
          <HomeIcon className={iconStyle} />
          Home
        </Link>
        <Link href="/web-editor" className={linkStyle} onClick={linkHandler}>
          <Laptop className={iconStyle} />
          Editor
        </Link>
        {isAuth && (
          <Link href="/dashboard" className={linkStyle} onClick={linkHandler}>
            <LayoutDashboard className={iconStyle} />
            Dashboard
          </Link>
        )}
        <Link href="/chat" className={linkStyle} onClick={linkHandler}>
          <MessageSquareDot className={iconStyle} />
          Chat Bot
        </Link>
        {!isAuth && (
          <Link
            href="/auth?mode=login"
            className={linkStyle}
            onClick={linkHandler}
          >
            <LogIn className={iconStyle} />
            Sign In
          </Link>
        )}
        {isAuth && (
          <button className={linkStyle} onClick={logoutHandler}>
            <LogOutIcon className={iconStyle} />
            Logout
          </button>
        )}
        <Switch
          id="mode"
          checked={mode === "dark"}
          onCheckedChange={(val) => modeHandler(val)}
        />
      </div>
      <div className="sm:hidden flex z-[1000] text-2xl">
        {!active ? (
          <RiMenu4Fill onClick={() => setActive(true)} />
        ) : (
          <IoMdClose onClick={() => setActive(false)} />
        )}
      </div>
    </div>
  );
}
