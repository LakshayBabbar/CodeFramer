import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
const inter = Inter({ subsets: ["latin"], preload: true });
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "./StoreProvider";
import ReactQueryProvider from "./ReactQueryProvider";

export const metadata = {
  title: "CodeFramer",
  description: "Online Code Editor - HTML, CSS & JS.",
  verification: {
    google: "v6jtGEEF0E0XMHMdaK06gyxXy9mpQfE0-3yuSLik4iw",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <StoreProvider>
          <ReactQueryProvider>
            <Navbar />
            {children}
            <div id="modal" />
            <div id="alert" />
          </ReactQueryProvider>
          <Footer />
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
