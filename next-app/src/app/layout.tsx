import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import AuthProvider from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider";

export const metadata = {
  title: "CodeFramer",
  description: "Online Code Editor - HTML, CSS & JS.",
  verification: {
    google: "v6jtGEEF0E0XMHMdaK06gyxXy9mpQfE0-3yuSLik4iw",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body className={`overflow-x-hidden dark:bg-slate-950 bg-slate-100`}>
        <AuthProvider>
          <ReactQueryProvider>
            <ThemeProvider attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange>
              <Navbar />
              {children}
              <div id="modal" />
            </ThemeProvider>
          </ReactQueryProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
