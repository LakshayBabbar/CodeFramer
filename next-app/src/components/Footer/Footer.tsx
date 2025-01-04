import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-10 space-y-5 dark:text-neutral-400 text-neutral-700 px-10 sm:px-0 w-full sm:w-fit sm:text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from bg-neutral-700 to-neutral-400 dark:from-neutral-200 dark:to-neutral-600">
        CodeFramer
      </h2>
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
