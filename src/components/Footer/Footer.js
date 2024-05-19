import Link from "next/link";

const Footer = () => {
  const listStyle = "hover:underline hover:underline-offset-4";
  return (
    <footer className="mt-10 w-full flex flex-col items-center">
      <hr className="w-11/12 md:w-3/4" />
      <div className="w-full md:w-3/4 py-10 px-10 md:px-0 flex flex-col md:flex-row gap-4 md:gap-0 justify-between md:items-center">
        <div className="flex flex-col gap-4 text-sm xl:text-base">
          <h1 className="text-2xl font-bold">CodeFramer</h1>
          <ul className="flex flex-col gap-4 sm:gap-2 md:gap-4 sm:flex-row">
            <li className={listStyle}>
              <Link href="/">Home</Link>
            </li>
            <li className={listStyle}>
              <Link href="/auth?mode=signup">Sign Up</Link>
            </li>
            <li className={listStyle}>
              <Link href="/auth?mode=login">Login</Link>
            </li>
            <li className={listStyle}>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className={listStyle}>
              <Link href="/web-editor">Web Editor</Link>
            </li>
          </ul>
        </div>
        <hr className="border-gray-600 sm:hidden md:block" />
        <p className="text-sm xl:text-base">
          © 2024 by CodeFramer. &nbsp;All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
