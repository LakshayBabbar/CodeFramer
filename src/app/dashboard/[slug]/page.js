"use client";
import Loading from "@/components/Loading/Loading";
import WebEditor from "@/components/Editor/WebEditor";
import { UserContext } from "@/context";
import { useContext, useEffect, useState } from "react";

const page = ({ params }) => {
  const { data } = useContext(UserContext);
  const [editorData, setEditorData] = useState({});

  useEffect(() => {
    if (data.length > 0) {
      const selectedData = data.find((item) => {
        return item.id === params.slug;
      });
      setEditorData(selectedData);
    }
    console.log(params.slug)
    console.log(data)
  }, [editorData, data]);

  return data.length <= 0 ? <Loading /> : <WebEditor data={editorData} />;
};

export default page;
