"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Code2Icon,
  LogIn,
  HomeIcon,
  Laptop,
  LayoutDashboard,
  AlignRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IconSparkles } from "@tabler/icons-react";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [active, setActive] = useState(false);
  const { isSignedIn: isAuth, } = useAuth();
  const pre = "-translate-x-[100vw]";
  const post = "-translate-x-0";
  const { setTheme } = useTheme()

  function linkHandler() {
    setActive(false);
  }

  const linkStyle =
    "flex items-center text-md gap-2 dark:text-slate-300 text-slate-800";

  const iconStyle = "size-5 md:size-4";
  return (
    <div className="h-14 w-full flex border-b justify-between px-5 md:px-0 md:justify-around items-center fixed top-0 left-0 bg-card backdrop-blur-xl z-[99]">
      <Link href="/" className={cn(linkStyle, "text-md font-bold font-mono items-start")}>
        <Code2Icon className="size-5" />
        CodeFramer
      </Link>
      <div
        className={`${active ? post : pre
          } md:translate-x-0 top-0 left-0 h-screen w-full p-14 md:p-0 bg-card md:bg-transparent  md:h-auto md:w-auto flex md:bg-auto absolute md:relative flex-col md:flex-row gap-5 md:items-center transition-all duration-400`}
      >
        <Link href="/" className={linkStyle} onClick={linkHandler}>
          <HomeIcon className={iconStyle} />
          Home
        </Link>
        <Link href="/web-editor" className={linkStyle} onClick={linkHandler}>
          <Laptop className={iconStyle} />
          Web Editor
        </Link>
        <Link
          href="/compiler/python"
          className={linkStyle}
          onClick={linkHandler}
        >
          <Laptop className={iconStyle} />
          Compilers
        </Link>
        <Link href="/chat" className={linkStyle} onClick={linkHandler}>
          <IconSparkles size={20} />
          Aizen
        </Link>
        {!isAuth && (
          <>
            <Link
              href="/sign-in"
              className={linkStyle}
              onClick={linkHandler}
            >
              <LogIn className={iconStyle} />
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className={linkStyle}
              onClick={linkHandler}
            >
              <LogIn className={iconStyle} />
              Sign Up
            </Link>
          </>
        )}
        {isAuth && (
          <>
            <Link href="/dashboard" className={linkStyle} onClick={linkHandler}>
              <LayoutDashboard className={iconStyle} />
              Dashboard
            </Link>
            <UserButton />
          </>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-full w-fit h-fit p-2">
              <Sun className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-[100] ml-24 md:ml-0">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="md:hidden flex z-[1000] text-2xl">
        {!active ? (
          <AlignRight onClick={() => setActive(true)} />
        ) : (
          <X onClick={() => setActive(false)} />
        )}
      </div>
    </div>
  );
}
