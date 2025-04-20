"use client"
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import drakula from "react-syntax-highlighter/dist/esm/styles/prism/dracula";
import { Button } from '../ui/button';
import { Play, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SUPPORTED_LANGUAGES } from '@/lib/helpers';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

const CodeSnippet = ({ children }: any) => {
    const code = children[0]?.props?.children[0].toString();
    const language = children[0]?.props?.className?.split('-')[1] || "text";
    const isCodeRunnable = SUPPORTED_LANGUAGES.includes(language) && UNSUPPORTED_LANGUAGES.includes(language) === false;
    const { push } = useRouter();
    const { toast } = useToast();
    const { resolvedTheme: theme } = useTheme();

    const handleRunCode = () => {
        localStorage.setItem("playground-code", code);
        push(`/compiler/${language}?from=embedded`);
    }

    const handleCopyCode = () => {
        navigator.clipboard.writeText(code);
        toast({
            title: "Code copied to clipboard",
        });
    }

    return (
        <div className='w-[90vw] sm:w-full h-fit border rounded-lg flex bg-neutral-950 dark:bg-transparent'>
            <div className='flex flex-col p-2'>
                {isCodeRunnable && <Button variant="ghost" size="sm" onClick={handleRunCode} className='text-neutral-300 dark:text-white' aria-label='Run Code'><Play /></Button>}
                <Button variant="ghost" size="sm" onClick={handleCopyCode} className='text-neutral-300 dark:text-white' aria-label='Copy Code'><Copy /></Button>
            </div>
            <SyntaxHighlighter
                language={language}
                style={drakula}
                customStyle={{ fontSize: '14px', background: theme === "dark" ? "transparent" : "#0a0a0a", padding: "0.5rem", overflowX: "auto" }}
                showLineNumbers={true}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

export default CodeSnippet;

const UNSUPPORTED_LANGUAGES = ["shell", "html", "css", "js"];