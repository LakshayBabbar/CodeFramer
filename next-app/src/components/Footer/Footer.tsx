import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-[10vh] py-5 space-y-5 dark:text-slate-200 text-slate-800 px-10 sm:px-0 w-full sm:w-fit sm:text-center">
      <h2 className="text-3xl sm:text-4xl font-bold font-mono">
        Code
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 animate-pulse">
          Framer
        </span>
      </h2>
      <hr className="border-slate-600" />
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-center">
        <Link href="/" className="hover:text-indigo-500 transition-colors duration-300">Home</Link>
        <Link href="/web-editor" className="hover:text-indigo-500 transition-colors duration-300">Web-Editor</Link>
        <Link href="/compiler/python" className="hover:text-indigo-500 transition-colors duration-300">Compilers</Link>
        <Link href="/dashboard" className="hover:text-indigo-500 transition-colors duration-300">Dashboard</Link>
        <Link href="/chat" className="hover:text-indigo-500 transition-colors duration-300">AI Assistant</Link>
      </div>
      <p className="font-semibold">
        © 2024 by CodeFramer. &nbsp;All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
