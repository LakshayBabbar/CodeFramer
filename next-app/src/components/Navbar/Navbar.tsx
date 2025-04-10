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
  User,
  MessageSquare
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
  const pre = "-translate-x-[100vw]";
  const post = "-translate-x-0";
  const { setTheme, resolvedTheme, theme } = useTheme()

  function linkHandler() {
    setActive(false);
  }

  const linkStyle =
    "flex items-center text-md gap-2 dark:text-neutral-300 text-neutral-800 hover:no-underline font-normal";

  const iconStyle = "size-5 lg:size-4";
  return (
    <div className="h-14 w-full flex justify-between px-5 lg:px-0 lg:justify-around items-center fixed top-0 left-0 bg-[#ffffffad] dark:bg-[#000000a1] backdrop-blur-xl z-[99]">
      <Link href="/" className={cn(linkStyle, "text-md font-bold")}>
        <Image src={resolvedTheme === "dark" ? "/logo-dark.webp" : "/logo.webp"} alt="codeframer logo" width={20} height={20} />
        CodeFramer
      </Link>
      <div
        className={`${active ? post : pre
          } lg:translate-x-0 top-0 left-0 h-screen w-full p-14 lg:p-0 bg-card lg:bg-transparent  lg:h-auto lg:w-auto flex lg:bg-auto absolute lg:relative flex-col lg:flex-row gap-5 lg:items-center transition-all duration-400`}
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
            <DropdownMenuContent align="end" className="z-[100] absolute left-4 -top-4 lg:relative lg:left-0 lg:top-0">
              <DropdownMenuItem>
                <Link href="/dashboard" className={linkStyle + " w-full"} onClick={linkHandler}>
                  <IconLayout className={iconStyle} />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile" className={linkStyle + " w-full"} onClick={linkHandler}>
                  <IconUserCircle className={iconStyle} />
                  Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {data?.user?.role === "ADMIN" && <Link href="/admin/stats" className={linkStyle} onClick={linkHandler}><User className={iconStyle} />Admin</Link>}
          <Button onClick={() => { signOut(); linkHandler() }} variant="link" className={`h-fit p-0 w-fit ${linkStyle}`}>
            <LogOut className={iconStyle} />
            Sign Out
          </Button></>}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="top-3 right-16 absolute lg:relative lg:top-0 lg:right-0 rounded-full w-fit h-fit p-2">
              {theme === "light" ? < Sun /> :
                (theme === "dark" ? <Moon /> : <Monitor />)}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-[100] ml-24 lg:ml-0">
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
      <div className="lg:hidden flex z-[1000] text-2xl">
        {!active ? (
          <AlignRight onClick={() => setActive(true)} />
        ) : (
          <X className="size-7" onClick={() => setActive(false)} />
        )}
      </div>
    </div>
  );
}
