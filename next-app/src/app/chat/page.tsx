"use client";
import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSend from "@/hooks/useSend";
import useAuth from "@/hooks/useAuth";
import Markdown from "markdown-to-jsx";
import { useToast } from "@/hooks/use-toast";

const ChatBot = () => {
  const { isAuth, username } = useAuth();
  const [content, setContent] = useState("");
  const [promt, setPromt] = useState("");
  const { fetchData, loading } = useSend();
  const { toast } = useToast();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!isAuth) {
      toast({ title: "Please log in to access assistance from our AI assistant (Aizen)." });
      return null;
    }
    const req = await fetchData({
      url: "/api/copilot",
      method: "POST",
      body: { prompt: promt },
    });
    if (!req.error) {
      setContent(req.data);
    } else setContent("Something went wrong");
    setPromt("");
  };

  return (
    <div className="flex items-center justify-center space-y-10 w-full">
      <div
        className={`mt-24 mb-10 w-11/12 md:w-3/4 ${content && "prose-neutral prose-lg"
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
          className={`w-full xl:w-3/4 mt-10 ${content ? "h-fit" : "h-[calc(100vh-16rem)] sm:h-[calc(100vh-14rem)]"
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
          className="flex gap-4 fixed w-full h-24 bg-card bottom-0 items-center justify-center"
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
