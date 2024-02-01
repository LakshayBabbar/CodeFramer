"use client";

import WebEditor from "@/components/Editor/WebEditor";
import { UserContext } from "@/context";
import { useContext, useEffect, useState } from "react";

const page = ({ params }) => {
  const { data } = useContext(UserContext);
  const [editorData, setEditorData] = useState({
    html: "<h1>Welcome to CodeFramer</h1>",
    css: "h1{color: red}",
    js: "document.getElementsByTagName('h1').color = 'green'",
  });
  useEffect(()=>{
    const selectedData = data.find((item)=>{
      return item.id === params.slug
    })
    setEditorData(selectedData);
  },[editorData])

  return <WebEditor data={editorData} />;
};

export default page;
