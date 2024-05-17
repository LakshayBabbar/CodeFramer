"use client";
import React, { useEffect, useState } from "react";
import WebEditor from "@/components/Editor/WebEditor";
import useFetch from "@/hooks/useFetch";

const page = ({ params }) => {
  const { pid } = params;
  const [data, setData] = useState({});
  const {
    data: fetchedData,
    isError,
    loading,
  } = useFetch(`/api/projects/${pid}`, pid);

  useEffect(() => {
    if (!loading && !isError) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  return <WebEditor data={data} />;
};

export default page;
