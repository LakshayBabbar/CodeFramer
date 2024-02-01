"use client";

import Link from "next/link";
import { UserContext } from "@/context";
import { useContext } from "react";
import Button from "@/components/UI/Button";

const page = () => {
  const { data } = useContext(UserContext);
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {console.log(data.name)}
      <Button>
        <Link href={`/dashboard/projects/${data.name}`}>Go to Editor</Link>
      </Button>
    </div>
  );
};

export default page;
