"use client";
import Link from "next/link";
import { useState } from "react";
import {
  LogIn,
  LogOut,
  HomeIcon,
  LayoutDashboard,
  AlignRight,
  X,
  Monitor,
  Package,
  PanelsTopLeft,
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
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const [active, setActive] = useState(false);
  const { status } = useSession();
  const isAuth = status === "authenticated";
  const pre = "-translate-x-[100vw]";
  const post = "-translate-x-0";
  const { setTheme, resolvedTheme, theme } = useTheme()

  function linkHandler() {
    setActive(false);
  }

  const linkStyle =
    "flex items-center text-md gap-2 dark:text-neutral-300 text-neutral-800 hover:no-underline font-normal";

  const iconStyle = "size-5 md:size-4";
  return (
    <div className="h-14 w-full flex border-b justify-between px-5 md:px-0 md:justify-around items-center fixed top-0 left-0 bg-[#ffffffb2] dark:bg-[#000000d7] backdrop-blur-xl z-[99]">
      <Link href="/" className={cn(linkStyle, "text-md font-bold")}>
        <Image src={resolvedTheme === "dark" ? "/logo-dark.webp" : "/logo.webp"} alt="codeframer logo" width={20} height={20} />
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
          <PanelsTopLeft className={iconStyle} />
          Web Editor
        </Link>
        <Link
          href="/compiler/python"
          className={linkStyle}
          onClick={linkHandler}
        >
          <Package className={iconStyle} />
          Compilers
        </Link>
        <Link href="/chat-bot" className={linkStyle} onClick={linkHandler}>
          <IconSparkles size={20} />
          Aizen
        </Link>
        {!isAuth ? (
          <Link
            href="/sign-in"
            className={linkStyle}
            onClick={linkHandler}
          >
            <LogIn className={iconStyle} />
            Sign In
          </Link>
        ) : <>
          <Link href="/dashboard" className={linkStyle} onClick={linkHandler}><LayoutDashboard className={iconStyle} /> Dashboard</Link>
          <Button onClick={() => { signOut(); linkHandler() }} variant="link" className={`${linkStyle} px-0 w-fit`}>
            <LogOut className={iconStyle} />
            Sign Out
          </Button></>}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="top-3 right-16 absolute md:relative md:top-0 md:right-0 rounded-full w-fit h-fit p-2">
              {theme === "light" ? < Sun /> :
                (theme === "dark" ? <Moon /> : <Monitor />)}
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
          <X className="size-7" onClick={() => setActive(false)} />
        )}
      </div>
    </div>
  );
}
