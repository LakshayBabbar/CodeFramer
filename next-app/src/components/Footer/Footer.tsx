"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

const Footer = () => {
  const { resolvedTheme } = useTheme();
  return (
    <footer className="py-10 space-y-5 px-10 sm:px-0 w-full sm:w-fit sm:text-center">
      <div className="flex items-center justify-center gap-4 w-fit sm:w-full">
        <Image src={resolvedTheme === "dark" ? "/logo-dark.webp" : "/logo.webp"} alt="codeframer logo" width={30} height={30} />
        <p className="text-3xl sm:text-4xl font-bold ">CodeFramer</p>
      </div>
      <hr className="border-neutral-600" />
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-center">
        <Link href="/">Home</Link>
        <Link href="/compiler/python">Compilers</Link>
        <Link href="/web-editor">Web</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/chat-bot">Aizen</Link>
        <Link href="/sign-in">SignIn</Link>
      </div>
      <p className="font-semibold">
        © 2024 by CodeFramer. &nbsp;All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;