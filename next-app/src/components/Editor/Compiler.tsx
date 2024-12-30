"use client";
import Editor from "./index";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import useSend from "@/hooks/useSend";
import { SUPPORTED_LANGUAGES } from "@/lib/lang";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import templates from "@/shared/templates.json"


interface CompilerEditorProps {
  language: string;
  data?: {
    id: string;
    languages: { name: string; code: string }[];
  };
  access_key: string;
}

export default function CompilerEditor({
  data,
  language,
  access_key,
}: CompilerEditorProps) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isCodeErr, setIsCodeErr] = useState(false);
  const [inputs, setInputs] = useState("");
  const { toast } = useToast();
  const { fetchData, loading } = useSend();
  const [isCodeRun, setIsCodeRun] = useState(false);
  const redirect = useRouter();

  useEffect(() => {
    setCode(data?.languages[0]?.code || "");
    if (!data) {
      const sampleCode = templates.find((t) => t.name === language)?.code;
      setCode(sampleCode || "");
    }
  }, [data, language]);

  const handleSubmit = async () => {
    setOutput("");
    setIsCodeRun(true);
    const data = await fetchData({
      url: `${process.env.NEXT_PUBLIC_COMPILER_URL || ""}/execute/${language}`,
      method: "POST",
      body: {
        code,
        inputs: inputs,
        access_key,
      },
    });
    if (!data.error) {
      setOutput(data.output);
      setIsCodeErr(data.codeError);
    } else {
      toast({
        title: data.error || "Failed to compile.",
        description: new Date().toString(),
      });
    }
  };

  const saveHandler = async () => {
    setIsCodeRun(false);
    const res = await fetchData({
      url: `/api/projects/${data?.id}`,
      method: "PUT",
      body: {
        languages: [{ name: data?.languages[0].name, code }],
      },
    });
    toast({
      title: res.message || res.error,
      description: new Date().toString(),
    });
  };


  return (
    <div className="mt-14 w-full h-[93.8vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-slate-950">
        <Editor file={{ name: language, value: code, language }} onValChange={(val) => setCode(val || "")}>
          {data ? (
            <Button
              variant="secondary"
              onClick={saveHandler}
              disabled={loading && isCodeRun === false}
            >
              Save
            </Button>
          ) : (
            <Select onValueChange={(val) => redirect.push(val)}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder={language} />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES.map((lang, index) => {
                  const capitalize = lang.charAt(0).toUpperCase() + lang.slice(1);
                  return (
                    <SelectItem key={index} value={lang}>{capitalize}</SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
          <Button
            variant="secondary"
            onClick={handleSubmit}
            disabled={loading && isCodeRun === true}
          >
            Run
          </Button>
        </Editor>
      </div>
      <div className="w-full md:w-1/2 h-1/2 md:h-full mt-7 md:mt-0 flex flex-col-reverse md:flex-col">
        <pre
          className={`w-full h-1/2 p-4 overflow-auto ${isCodeErr && "text-red-400"
            }`}
        >
          {output}
        </pre>
        <div className="w-full h-1/2 bg-slate-100 p-4 text-black border-t">
          <h3 className="text-xl font-bold">Enter Your Inputs</h3>
          <textarea
            onChange={(e) => setInputs(e.target.value)}
            className="bg-transparent w-full h-[80%] max-h-[80%] max-w-full border-none focus:outline-none pt-2"
          />
        </div>
      </div>
    </div>
  );
}
