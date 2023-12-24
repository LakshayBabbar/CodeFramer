import "@/styles/globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar/Navbar";

const clarity = ` (function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "kaw6vwgyxi");`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="absolute" />
      <Navbar />
      <Component {...pageProps} />
      <Script>{clarity}</Script>
    </>
  );
}
