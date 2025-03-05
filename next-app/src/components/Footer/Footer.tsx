import Image from "next/image";
import Link from "next/link";

const Links = {
  Codeframer: [
    { name: "Home", href: "/" },
    { name: "Sign In", href: "/sign-in" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  Services: [
    { name: "Web Editor", href: "/web-editor" },
    { name: "Python Compiler", href: "/compiler/python" },
    { name: "JavaScript Compiler", href: "/compiler/javascript" },
    { name: "C Compiler", href: "/compiler/c" },
    { name: "C++ Compiler", href: "/compiler/cpp" },
    { name: "Typescript Compiler", href: "/compiler/typescript" },
  ],
  Others: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contact Us", href: "/contact" },
  ]
};

const linkStyle = "hover:underline text-neutral-700 dark:text-neutral-300";

const Footer = () => {
  return (
    <footer className="bg-card border-t py-8 px-6 md:px-0 w-full place-items-center space-y-8">
      <div className="md:flex justify-around w-full space-y-8 md:space-y-0">
        <div className="flex items-center justify-center gap-4 w-fit h-fit">
          <Image
            src="/logo.webp"
            alt="CodeFramer Logo"
            width={40}
            height={40}
            className="block dark:hidden"
          />
          <Image
            src="/logo-dark.webp"
            alt="CodeFramer Logo"
            width={40}
            height={40}
            className="hidden dark:block"
          />
          <span className="text-2xl sm:text-3xl font-semibold">
            CodeFramer
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-12 xl:gap-20">
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-bold">CodeFramer</p>
            {Links.Codeframer.map((link) => {
              return (
                <Link key={link.name} href={link.href} className={linkStyle}>
                  {link.name}
                </Link>
              )
            })}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-bold">Services</p>
            {Links.Services.map((link) => {
              return (
                <Link key={link.name} href={link.href} className={linkStyle}>
                  {link.name}
                </Link>
              )
            })}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-bold">Others</p>
            {Links.Others.map((link) => {
              return (
                <Link key={link.name} href={link.href} className={linkStyle}>
                  {link.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <hr className="w-full" />
      <div>
        <p className="text-sm sm:text-base">
          © 2025 CodeFramer. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
