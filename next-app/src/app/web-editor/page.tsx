import WebEditor from "@/components/Editor/WebEditor";
import template from "@/shared/template.json";

const Page = () => {
  return <WebEditor data={{ languages: template }} />;
};
export default Page;
