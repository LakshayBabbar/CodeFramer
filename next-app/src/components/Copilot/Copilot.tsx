import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { SendHorizonal } from "lucide-react";
import { createPortal } from "react-dom";
import useSend from "@/hooks/useSend";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { IconSparkles } from '@tabler/icons-react'
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

interface CopilotProps {
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
    lang: string;
}

interface CopilotModalProps extends CopilotProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type Context = "FIX" | "EXPLAIN" | "IMPROVE" | "QUERY";

const CopilotModal = memo(({ code, setCode, lang, isOpen, setIsOpen }: CopilotModalProps) => {
    CopilotModal.displayName = "CopilotModal";
    const modalRef = useRef<HTMLDivElement | null>(null);
    const { fetchData, loading, isError, error } = useSend();
    const [query, setQuery] = useState("");
    const { status } = useSession();
    const isAuth = status === "authenticated";
    const { toast } = useToast();

    useEffect(() => {
        modalRef.current = document.getElementById("modal") as HTMLDivElement;
    }, [isOpen]);

    const submitHandler = useCallback(
        async (context?: Context) => {
            if (!context) return;
            if (!isAuth) {
                toast({
                    title: "Not authenticated",
                    description: "Please login to use this feature",
                })
                return setIsOpen(false);
            };
            const prompt = getPrompt(context, lang, code, query);
            const response = await fetchData({
                url: "/api/copilot",
                method: "POST",
                body: {
                    prompt,
                    type: "CODE"
                },
            });
            if (!response.error) {
                setCode(response.data);
                setIsOpen(false);
                setQuery("");
            }
        },
        [fetchData, lang, code, query, setCode, setIsOpen, isAuth, toast]
    );



    if (!isOpen || !modalRef.current) return null;

    const buttonClass = "py-2 w-40 bg-gradient-to-tr from-indigo-700 to-purple-500 rounded-2xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white";

    return createPortal(
        <div
            className="fixed top-0 left-0 w-full h-screen flex items-center justify-center backdrop-blur-xl z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="copilot-modal-title"
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
                className="w-11/12 sm:w-[30rem] relative p-6 bg-card dark:border rounded-xl space-y-4 shadow-2xl">
                <button className="absolute top-2 right-2" aria-label="Close" onClick={() => setIsOpen(false)}><X /></button>
                <div>
                    <h1 id="copilot-modal-title" className="text-2xl gap-1 text-center flex justify-center font-semibold bg-gradient-to-tr from-violet-700 to-violet-400 bg-clip-text text-transparent">
                        Aizen<IconSparkles size={25} className="text-violet-400" />
                    </h1>
                    <p className="text-center text-slate-800 dark:text-slate-300">Enhance Your Code with AI Assistance from Aizen</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    {(["FIX", "EXPLAIN", "IMPROVE"] as Context[]).map((ctx) => (
                        <button
                            key={ctx}
                            className={buttonClass}
                            onClick={() => submitHandler(ctx)}
                            disabled={loading}
                        >
                            {ctx}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2 items-end">
                    <textarea
                        className="flex-grow min-h-10 h-fit p-2 max-h-56 bg-secondary rounded-md text-white"
                        placeholder="How can I help you?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        className={cn(buttonClass, "w-fit p-2 h-fit")}
                        onClick={() => submitHandler("QUERY")}
                        disabled={loading}
                    >
                        <SendHorizonal />
                    </button>
                </div>
                {isError && <p className="text-red-500  ">{error}</p>}
                {loading && <div className="w-full flex justify-center">
                    <div className="size-10 rounded-full border-t-2 border-b-2 border-indigo-600 animate-spin" /></div>}
            </motion.div>
        </div>,
        modalRef.current
    );
});

const CopilotButton = memo((props: CopilotProps) => {
    CopilotButton.displayName = "CopilotButton";
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <div>
            <button
                className="p-1 pr-6 rounded-full hover:opacity-90 relative text-slate-700 dark:text-white"
                onClick={toggleModal}
                aria-label="Get help from AI"
            >
                <IconSparkles size={30} stroke={1.4} />
                <sup className="absolute top-2 right-0">New</sup>
            </button>
            <CopilotModal {...props} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
});

export { CopilotButton };


const getPrompt = (context: Context, lang: string, code: string, query: string): string => {
    const prompts: Record<Context, string> = {
        FIX: `Fix the following ${lang} code and provide the fixed code. Include any explanations as comments within the code: \n\n${code}\n\nPlease return the response in code format only.`,
        EXPLAIN: `Explain the following ${lang} code. Include explanations as comments directly above the relevant code sections: \n\n${code}\n\nPlease return the response in code format only.`,
        IMPROVE: `Improve the following ${lang} code and include comments explaining the improvements inline: \n\n${code}\n\nPlease return the response in code format only.`,
        QUERY: `Answer the query related to this ${lang} code. Include the explanation as comments and provide the code below: \n\nQuery: ${query} \n\nCode: ${code}\n\nPlease return the response in code format only.`,
    };
    return prompts[context];
};
