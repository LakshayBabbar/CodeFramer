"use client";
import Editor from "./index";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import useSend from "@/hooks/useSend";
import { capitalise, SUPPORTED_LANGUAGES } from "@/lib/helpers";
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
import { execute } from "@/app/actions";

interface CompilerEditorProps {
  language: string;
  data?: {
    id: string;
    languages: { name: string; code: string, inputs?: string; }[];
  };
}

export default function CompilerEditor({
  data,
  language,
}: CompilerEditorProps) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isCodeErr, setIsCodeErr] = useState(false);
  const [inputs, setInputs] = useState<string | null>(null);
  const { toast } = useToast();
  const { fetchData, loading } = useSend();
  const [isCodeRun, setIsCodeRun] = useState(false);
  const redirect = useRouter();

  useEffect(() => {
    if (!data) {
      const sampleCode = templates.find((t) => t.name === language)?.code;
      setCode(sampleCode || "");
    } else {
      setCode(data?.languages[0]?.code || "");
      setInputs(data.languages[0]?.inputs || null);
    }
  }, [data, language]);

  const handleCodeSubmit = async () => {
    setOutput("");
    setIsCodeRun(true);
    try {
      const data = await execute({ lang: language, code, inputs: inputs || "" });
      if (data.error) {
        throw new Error(data.error)
      }
      setOutput(data.output);
      setIsCodeErr(data.codeError);
    } catch (error: any) {
      toast({
        title: "Execution Error",
        description: error.message || "Compilation failed. Possible causes: server timeout or infinite loop in code.",
      });
    } finally {
      setIsCodeRun(false);
    }
  };

  const saveHandler = async () => {
    const res = await fetchData({
      url: `/api/projects/${data?.id}`,
      method: "PUT",
      body: {
        languages: [{ name: data?.languages[0].name, code, inputs }],
      },
    });
    toast({
      title: res.message || res.error,
      description: new Date().toString(),
    });
  };


  return (
    <div className="mt-14 w-full h-[93.8vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-background">
        <Editor file={{ name: language, value: code, language }} onValChange={(val) => setCode(val || "")}>
          {data ? (
            <Button
              variant="secondary"
              onClick={saveHandler}
              disabled={loading}
            >
              Save
            </Button>
          ) : (
            <Select onValueChange={(val) => redirect.push(val)}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder={capitalise(language)} />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES.map((lang, index) => {
                  return (
                    <SelectItem key={index} value={lang}>{capitalise(lang)}</SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
          <Button
            variant="secondary"
            onClick={handleCodeSubmit}
            disabled={isCodeRun}
          >
            Run
          </Button>
        </Editor>
      </div>
      <div className="w-full md:w-1/2 h-1/2 md:h-full mt-7 md:mt-0 flex flex-col-reverse md:flex-col">
        <pre
          className={`w-full ${language !== "sql" && "h-1/2"} p-4 overflow-auto ${isCodeErr && "text-red-400"
            }`}
        >
          {output}
        </pre>
        {language !== "sql" && <div className="w-full h-1/2 bg-muted p-6 border-t rounded-t-3xl">
          <textarea
            onChange={(e) => setInputs(e.target.value)}
            placeholder="Enter inputs here..."
            className="bg-transparent w-full h-full max-h-full max-w-full border-none focus:outline-none text-xl"
            value={inputs || ""}
          />
        </div>}
      </div>
    </div>
  );
}
