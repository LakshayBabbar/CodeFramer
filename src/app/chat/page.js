"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSend from "@/hooks/useSend";
import { useSelector } from "react-redux";

const CppIntroduction = () => {
  const { username } = useSelector((state) => state.auth);
  const [content, setContent] = useState(null);
  const [promt, setPromt] = useState("");
  const { fetchData, loading } = useSend();
  const submitHandler = async (e) => {
    e.preventDefault();
    const req = await fetchData(process.env.NEXT_PUBLIC_AI_API, "POST", {
      contents: [
        {
          parts: [
            {
              text: promt,
            },
          ],
        },
      ],
    });
    req.success
      ? setContent(req.candidates[0].content.parts[0].text)
      : setContent("Something went wrong");
    setPromt("");
  };

  return (
    <div className="flex items-center justify-center space-y-10 bg-dot-white/[0.18]">
      <div
        className={`mt-24 mb-10 w-11/12 md:w-3/4 ${
          content && "prose-neutral prose-lg"
        } flex flex-col items-center gap-10`}
      >
        <Button
          className="absolute top-20"
          variant="outline"
          onClick={() => setContent("")}
        >
          Clear
        </Button>
        <article className="w-full xl:w-3/4 h-[calc(100vh-14rem)] overflow-y-auto">
          {content ? (
            <ReactMarkdown
              // eslint-disable-next-line react/no-children-prop
              children={content}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <h1 className="text-3xl sm:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 from-neutral-800 to-neutral-500  bg-opacity-50 leading-tight">
                Hello,&nbsp;{username}
                <br />
                <span className="text-muted-foreground">
                  How can I help you today?
                </span>
              </h1>
            </div>
          )}
        </article>
        <form
          className="flex gap-4 relative w-full xl:w-3/4"
          onSubmit={submitHandler}
        >
          <Input
            type="text"
            className="rounded-full border-black dark:border-white"
            onChange={(e) => setPromt(e.target.value)}
            value={promt}
            required
          />
          <Button
            disabled={loading}
            className="rounded-full absolute right-0"
            type="submit"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CppIntroduction;
