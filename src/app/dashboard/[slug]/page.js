"use client";

import WebEditor from "@/components/Editor/WebEditor";
import { UserContext } from "@/context";
import { useContext } from "react";

const page = ({ params }) => {
  const { data } = useContext(UserContext);
  return <WebEditor data={data} />;
};

export default page;
