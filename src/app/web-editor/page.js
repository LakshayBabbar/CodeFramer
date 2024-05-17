import WebEditor from "@/components/Editor/WebEditor";

const index = () => {
  const data = {
    html: "<h1 id='h1'>Welcome to CodeFramer</h1>",
    css: "body {\n\tcolor: royalblue;\n}",
    js: "document.getElementById('h1').style.fontSize = '2.4rem'",
  };
  return <WebEditor data={data} />;
};
export default index;
