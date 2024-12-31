import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body className="overflow-x-hidden">
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
        </body>
      </html>
    </ClerkProvider>
  );
}