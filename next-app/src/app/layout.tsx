import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import CookieBanner from "@/components/Consent/CookieBanner";
import GoogleAnalytics from "@/components/Consent/GoogleAnalytics";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || ""),
  title: "CodeFramer: Online IDE & Compilers",
  description: "CodeFramer is an advanced online IDE and compiler supporting Python, C, C++, Node.js, and web environments (HTML, CSS, JS). Code, execute, and manage projects in real-time with AI assistance.",
  keywords: ["python compiler", "javascript compiler", "shell compiler", "bash compiler", "sql editor", "html editor", "css editor", "codeframer", "c compiler", "c++ compiler", "node.js compiler", "web editor", "online compiler", "online editor", "code editor", "code compiler", "codeframer compiler", "codeframer editor", "codeframer web editor", "codeframer online compiler"],
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
      <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
        <body className="overflow-x-hidden antialiased">
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

          {process.env.NODE_ENV === "production" && <Suspense fallback={null}>
            <GoogleAnalytics GA_MEASUREMENT_ID={process.env.GOOGLE_ANALYTICS!} />
            <Script
              async
              src={process.env.GOOGLE_ADS}
              crossOrigin="anonymous"
            ></Script>
            <CookieBanner />
          </Suspense>}

        </body>
      </html>
    </SessionProvider>
  );
}