"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { RiMenu4Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { BsChatSquareQuote } from "react-icons/bs";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";
import { useSelector, useDispatch } from "react-redux";
import { authState } from "@/store/features/Auth/authSlice";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";

export default function Navbar() {
  const [mode, setMode] = useState("");
  const { isAuth } = useSelector((state) => state.auth);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const { data } = useFetch("/api", "auth");
  const { toast } = useToast();
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

  const modeHandler = (val) => {
    setMode(val);
    localStorage.setItem("theme", val);
  };

  const logoutHandler = async () => {
    const req = await fetch("/api/auth/logout", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const res = await req.json();
    if (req.ok) {
      dispatch(
        authState({
          isAuth: false,
          username: undefined,
        })
      );
      setActive(false);
      navigate.push("/");
    }
    const date = new Date().toString();
    return toast({
      title: res.message,
      description: date,
    });
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark" || !theme) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);
  function linkHandler() {
    setActive(false);
  }

  const linkStyle = "flex items-center gap-2 sm:text-sm ";
  return (
    <div className="h-14 w-full flex justify-between px-10 sm:px-0 sm:justify-around items-center fixed top-0 left-0 backdrop-blur-md z-[999] border-b">
      <Link href="/">CodeFramer</Link>
      <div
        className={`${
          active ? post : pre
        } sm:translate-x-0 top-0 left-0 h-screen w-full p-14 sm:p-0 bg-card sm:bg-transparent  sm:h-auto sm:w-auto flex sm:bg-auto absolute sm:relative flex-col sm:flex-row gap-4 sm:items-center transition-all duration-400`}
      >
        <Link href="/" className={linkStyle} onClick={linkHandler}>
          <FaHome />
          Home
        </Link>
        <Link href="/web-editor" className={linkStyle} onClick={linkHandler}>
          <FaLaptopCode />
          Web Editor
        </Link>
        {isAuth && (
          <Link href="/dashboard" className={linkStyle} onClick={linkHandler}>
            <MdSpaceDashboard />
            Dashboard
          </Link>
        )}
        <Link href="/chat" className={linkStyle} onClick={linkHandler}>
          <BsChatSquareQuote />
          AI ChatBot
        </Link>
        {!isAuth && (
          <Link
            href="/auth?mode=login"
            className={linkStyle}
            onClick={linkHandler}
          >
            <FaSignInAlt />
            Sign In
          </Link>
        )}
        {isAuth && (
          <button className={linkStyle} onClick={logoutHandler}>
            <FaSignInAlt />
            Logout
          </button>
        )}
        <Select onValueChange={modeHandler}>
          <SelectTrigger
            className="w-[fit-content] gap-2 bg-transparent border-none focus:ring-transparent"
            aria-label="Theme"
          >
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="z-[1000]">
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="light">Light</SelectItem>
          </SelectContent>
        </Select>
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
