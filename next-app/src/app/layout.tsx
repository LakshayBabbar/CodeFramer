import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || ""),
  title: "CodeFramer: Online IDE & Compiler for Web Development, Python, C, C++, Node.js",
  description: "CodeFramer is an advanced online IDE and compiler supporting Python, C, C++, Node.js, and web environments (HTML, CSS, JS). Code, execute, and manage projects in real-time with AI assistance.",
  alternates: {
    canonical: './',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en" className="dark">
        <body className="overflow-x-hidden">
          <ReactQueryProvider>
            <ThemeProvider attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              <div id="modal" />
            </ThemeProvider>
          </ReactQueryProvider>
          <Toaster />
        </body>
      </html>
    </SessionProvider>

  );
}