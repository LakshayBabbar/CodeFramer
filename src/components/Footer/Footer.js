import Link from "next/link";
import { Code2Icon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-[10vh] py-10 text-center space-y-4 dark:text-slate-200 text-slate-800">
      <h2 className="text-4xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 flex gap-3 justify-center items-center flex-wrap">
        <Code2Icon className="size-10 dark:text-slate-200 text-slate-800" />
        CodeFramer
      </h2>
      <div className="space-x-4 sm:space-x-5 font-[500]">
        <Link href="/">Home</Link>
        <Link href="/web-editor">Editor</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/chat">ChatBot</Link>
        <Link href="/auth?mode=login">Login</Link>
      </div>
      <p>© 2024 by CodeFramer. &nbsp;All rights reserved.</p>
    </footer>
  );
};

export default Footer;
