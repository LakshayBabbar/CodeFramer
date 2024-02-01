"use client";

import WebEditor from "@/components/Editor/WebEditor";
import { UserContext } from "@/context";
import { useContext, useEffect, useState } from "react";

const page = ({ params }) => {
  const { data } = useContext(UserContext);
  const [editorData, setEditorData] = useState({});
  useEffect(()=>{
    const selectedData = data.find((item)=>{
      return item.id === params.slug
    })
    setEditorData(selectedData);
  },[editorData])

  return <WebEditor data={editorData} />;
};

export default page;
