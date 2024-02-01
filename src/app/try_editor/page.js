import WebEditor from "@/components/Editor/WebEditor";

const index = () => {
  const data = {
    html: "<h1>Welcome to CodeFramer</h1>",
    css: "h1{color: red}",
    js: "document.getElementsByTagName('h1').color = 'green'",
  };
  return <WebEditor data={data} />;
};
export default index;
