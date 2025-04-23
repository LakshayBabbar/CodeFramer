"use client";
import Link from "next/link";
import { useState } from "react";
import {
  LogIn,
  LogOut,
  HomeIcon,
  AlignRight,
  X,
  Monitor,
  Package,
  PanelsTopLeft,
  User,
  MessageSquare,
  Newspaper
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react"
import { IconLayout, IconUser, IconUserCircle } from "@tabler/icons-react";
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
  const { status, data } = useSession();
  const isAuth = status === "authenticated";
  const pre = "-translate-y-[40rem] lg:translate-y-0 opacity-0 lg:opacity-100";
  const post = "translate-y-0 opacity-100";
  const { setTheme, theme } = useTheme();

  function linkHandler() {
    setActive(false);
  }

  const linkStyle = "flex items-center text-md gap-2 text-sm dark:text-neutral-200 text-neutral-700 hover:no-underline font-normal";
  const iconStyle = "size-4";

  return (
    <div className="h-14 w-full flex border-b justify-between px-5 lg:px-0 lg:justify-around items-center fixed top-0 left-0 bg-[#ffffffad] dark:bg-[#000000a1] backdrop-blur-xl z-99">
      <Link href="/" className={cn(linkStyle, "text-md font-bold")}>
        <Image src="/logo.webp" alt="codeframer logo" width={30} height={30} />
        CodeFramer
      </Link>

      <div className={`${active ? post : pre} rounded-xl drop-shadow-xl lg:drop-shadow-none p-6 lg:p-0 top-20 lg:top-0 right-5 lg:right-0 h-fit w-44 lg:h-auto lg:w-auto bg-card lg:bg-transparent border lg:border-none absolute lg:relative flex flex-col lg:flex-row gap-5 lg:items-center transition-all duration-200`}>
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
        <Link href="/blogs" className={linkStyle} onClick={linkHandler}>
          <Newspaper className={iconStyle} />
          Blog
        </Link>
        <Link href="/contact" className={linkStyle} onClick={linkHandler}>
          <MessageSquare className={iconStyle} />
          Contact
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
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button className={linkStyle + " h-fit p-0 w-fit"}>
                <IconUser className={iconStyle} />Account
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-100">
              <Link href="/dashboard">
                <DropdownMenuItem onClick={linkHandler} className={linkStyle + "w-full"}>
                  <IconLayout className={iconStyle} />
                  Dashboard
                </DropdownMenuItem>
              </Link>
              <Link href="/profile">
                <DropdownMenuItem onClick={linkHandler} className={linkStyle + "w-full"}>
                  <IconUserCircle className={iconStyle} />
                  Profile
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          {data?.user?.role === "ADMIN" && <Link href="/admin/stats" className={linkStyle} onClick={linkHandler}><User className={iconStyle} />Admin</Link>}
          <Button onClick={() => { signOut(); linkHandler() }} variant="link" className={`h-fit p-0 has-[>svg]:px-0 m-0 w-fit cursor-pointer ${linkStyle}`}>
            <LogOut className={iconStyle} />
            Sign Out
          </Button></>}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="border lg:border-none" size="sm">
              {theme === "light" ? < Sun /> :
                (theme === "dark" ? <Moon /> : <Monitor />)}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-100">
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

      <div className="lg:hidden flex z-1000 text-2xl">
        {!active ? (
          <AlignRight onClick={() => setActive(true)} />
        ) : (
          <X className="size-7" onClick={() => setActive(false)} />
        )}
      </div>
    </div>
  );
}
