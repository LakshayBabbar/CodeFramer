import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { SendHorizonal, X } from "lucide-react";
import { createPortal } from "react-dom";
import useSend from "@/hooks/useSend";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { IconSparkles } from "@tabler/icons-react";
import { motion } from "framer-motion";

interface CopilotProps {
    editorData: { name: string; code: string; }[];
    setEditorData: React.Dispatch<React.SetStateAction<CopilotProps["editorData"]>>;
}

interface CopilotModalProps extends CopilotProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type Context = "FIX" | "EXPLAIN" | "IMPROVE" | "QUERY";

const CopilotModal = memo(({ isOpen, setIsOpen, editorData, setEditorData }: CopilotModalProps) => {
    CopilotModal.displayName = "CopilotModal";
    const modalRef = useRef<HTMLDivElement | null>(null);
    const { fetchData, loading, isError, error, setIsError } = useSend();
    const [query, setQuery] = useState("");
    const { toast } = useToast();
    let lang = '';
    editorData.forEach((editor) => {
        lang += editor.name + ' ';
    })
    lang.includes("sql") && lang.replace("sql", "sqlite");

    useEffect(() => {
        modalRef.current = document.getElementById("modal") as HTMLDivElement;
    }, [isOpen]);

    const submitHandler = useCallback(
        async (context?: Context) => {
            if (!context) return;
            const prompt = getPrompt(context, lang, editorData, query);
            const response = await fetchData({
                url: "/api/copilot",
                method: "POST",
                body: { prompt },
            });

            if (!response.error) {
                setEditorData(response.map((item: { languageName: string; updatedCode: string; }) => ({
                    name: item.languageName,
                    code: item.updatedCode,
                })));
                setIsOpen(false);
                setQuery("");
            }
        },
        [fetchData, lang, editorData, query, setEditorData, setIsOpen, toast]
    );

    if (!isOpen || !modalRef.current) return null;

    const buttonClass = "py-2 w-40 bg-gradient-to-r from-blue-900 to-sky-700 rounded-2xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white";

    function modalCloseHandler() {
        setIsOpen(false);
        setIsError(false);
        setQuery("");
    }

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
                className="w-11/12 sm:w-[30rem] relative p-6 bg-card dark:border rounded-xl space-y-6 shadow-2xl"
            >
                <button className="absolute top-2 right-2" aria-label="Close" onClick={modalCloseHandler}>
                    <X />
                </button>
                <div className="space-y-2">
                    <h1 id="copilot-modal-title" className="text-3xl gap-1 text-center flex justify-center font-semibold bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text text-transparent">
                        Aizen<IconSparkles size={25} className="text-blue-500" />
                    </h1>
                    <p className="text-center text-slate-600 dark:text-slate-300">Enhance Your Code with AI Assistance from Aizen</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    {(["FIX", "EXPLAIN", "IMPROVE"] as Context[]).map((ctx) => (
                        <button key={ctx} onClick={() => submitHandler(ctx)} disabled={loading} className="inline-flex h-12 dark:animate-shimmer items-center justify-center rounded-2xl border border-slate-800 drop-shadow-md dark:bg-[linear-gradient(110deg,#000103,25%,#1e2631,60%,#000103)] bg-[length:200%_100%] px-6 font-medium dark:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 min-w-32">
                            {ctx}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2 items-end">
                    <textarea
                        className="flex-grow min-h-20 h-fit px-4 rounded-2xl p-2 max-h-56 border dark:bg-[#181818e7] bg-[#f8f8f8b6]"
                        placeholder="How can I help you?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className={cn(buttonClass, "w-fit p-3 h-fit")} onClick={() => submitHandler("QUERY")} disabled={loading}>
                        <SendHorizonal size={20} />
                    </button>
                </div>
                {isError && <p className="text-red-500">{error}</p>}
                {loading && (
                    <div className="w-full flex justify-center">
                        <div className="size-10 rounded-full border-t-2 border-b-2 border-blue-600 animate-spin" />
                    </div>
                )}
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
                className="p-1 rounded-full hover:opacity-90 relative text-slate-700 dark:text-white"
                onClick={toggleModal}
                aria-label="Get help from AI"
            >
                <IconSparkles size={30} stroke={1.4} />
            </button>
            <CopilotModal {...props} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
});

export { CopilotButton };

const getPrompt = (context: Context, lang: string, code: CopilotModalProps["editorData"], query: string): string => {

    const structuredCode = JSON.stringify(code.map((editor) => ({
        languageName: editor.name,
        code: editor.code,
    })));

    const prompts: Record<Context, string> = {
        FIX: `Fix the following ${lang} code and return the corrected code in the exact same format:\n\n${structuredCode}\n\nEnsure that all explanations are provided within comments inside the code.`,

        EXPLAIN: `Explain the following ${lang} code by adding comments and return it in the exact same format:\n\n${structuredCode}\n\nEnsure that all explanations are within comments inside the code.`,

        IMPROVE: `Improve the following ${lang} code and return it in the exact same format:\n\n${structuredCode}`,

        QUERY: `Answer the following query related to ${lang} code while maintaining the exact same format:\n\nQuery: ${query}\n\n${structuredCode}\n\nEnsure all explanations are within comments inside the code.`,
    };
    return prompts[context];
};