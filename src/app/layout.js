import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import UserData from "@/context/UserData";
import Refresh from "@/context/Refresh";
const inter = Inter({ subsets: ["latin"], preload: true });

export const metadata = {
  title: "CodeFramer",
  description: "Online Code Editor - HTML, CSS & JS.",
  verification: {
    google: "v6jtGEEF0E0XMHMdaK06gyxXy9mpQfE0-3yuSLik4iw",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserData>
          <Refresh>
            <div className="absolute" />
            <div id="modal" />
            <Navbar />
            {children}
          </Refresh>
        </UserData>
      </body>
    </html>
  );
}
