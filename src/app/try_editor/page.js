import WebEditor from "@/components/Editor/WebEditor";

const index = () => {
  const data = {
    html: "<h1 id='h1'>Welcome to CodeFramer</h1>",
    css: "h1 {\n\tcolor: red\n}",
    js: "document.getElementById('h1').style.color = 'green'",
  };
  return <WebEditor data={data} tryEditor={true}/>;
};
export default index;
