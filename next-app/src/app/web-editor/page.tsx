import WebEditor from "@/components/Editor/WebEditor";
import template from "@/shared/template-web.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodeFramer Web Editor: HTML, CSS, JavaScript Online IDE",
  description: "CodeFramer’s web editor offers a powerful online IDE for coding in HTML, CSS, and JavaScript. Build, test, and deploy web projects with real-time output and AI assistance directly in your browser."
}

const Page = () => {
  return <WebEditor data={{ languages: template }} />;
};
export default Page;
