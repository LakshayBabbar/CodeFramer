"use client";
import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSend from "@/hooks/useSend";
import useAuth from "@/hooks/useAuth";
import Markdown from "markdown-to-jsx";

const ChatBot = () => {
  const { username } = useAuth();
  const [content, setContent] = useState("");
  const [promt, setPromt] = useState("");
  const { fetchData, loading } = useSend();
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const req = await fetchData({
      url: process.env.NEXT_PUBLIC_AI_API || "",
      method: "POST",
      body: {
        contents: [
          {
            parts: [
              {
                text: promt,
              },
            ],
          },
        ],
      },
    });
    if (!req.error) {
      setContent(req.candidates[0].content?.parts[0]?.text);
    } else setContent("Something went wrong");
    setPromt("");
  };

  return (
    <div className="flex items-center justify-center space-y-10 w-full">
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
        <article
          className={`w-full xl:w-3/4 mt-10 ${
            content ? "h-fit" : "h-[calc(100vh-16rem)] sm:h-[calc(100vh-14rem)]"
          }`}
        >
          {content ? (
            <Markdown>{content}</Markdown>
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
          className="flex gap-4 fixed w-full h-24 dark:bg-slate-950 bg-slate-100 bottom-0 items-center justify-center"
          onSubmit={submitHandler}
        >
          <div className="w-full md:w-3/5 mx-10 sm:mx-0 relative">
            <Input
              type="text"
              className="rounded-full border-slate-600 w-full bg-transparent"
              onChange={(e) => setPromt(e.target.value)}
              value={promt}
              required
            />
            <Button
              disabled={loading}
              className="rounded-full absolute top-0 right-0 bg-slate-800 dark:bg-slate-100"
              type="submit"
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
