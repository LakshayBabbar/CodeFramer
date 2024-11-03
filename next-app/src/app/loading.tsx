"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export default function ProgressDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex w-full h-screen items-center justify-center ">
      <Progress value={progress} className="w-80 md:w-96" />
    </div>
  );
}
