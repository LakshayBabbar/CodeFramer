"use client"
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import drakula from "react-syntax-highlighter/dist/esm/styles/prism/dracula";
import { Button } from '../ui/button';
import { Play, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { capitalise, SUPPORTED_LANGUAGES } from '@/lib/helpers';
import { useRouter } from 'next/navigation';

const CodeSnippet = ({ code, language }: any) => {
    const isCodeRunnable = SUPPORTED_LANGUAGES.includes(language) && !UNSUPPORTED_LANGUAGES.includes(language);
    const { push } = useRouter();
    const { toast } = useToast();

    const handleRunCode = () => {
        localStorage.setItem("playground-code", code);
        push(`/compiler/${language}?from=embedded`);
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(code);
        toast({
            title: "Code copied to clipboard",
        });
    };

    return (
        <div className='w-[90vw] sm:w-full h-fit border rounded bg-background'>
            <div className='flex items-center justify-between p-2 px-4 border-b'>
                <span className='text-sm'>{`>_ ${capitalise(language)}`}</span>
                <div>
                    {isCodeRunnable && <Button variant="ghost" size="sm" onClick={handleRunCode} className='text-neutral-300 dark:text-white' aria-label='Run Code'><Play /></Button>}
                    <Button variant="ghost" size="sm" onClick={handleCopyCode} className='text-neutral-300 dark:text-white' aria-label='Copy Code'><Copy /></Button>
                </div>
            </div>
            <div className='code-block'>
                <SyntaxHighlighter
                    language={language}
                    style={drakula}
                    customStyle={{ fontSize: '14px', background: "var(--background)", overflowX: "auto", width: "100%", margin: "1rem 0" }}
                    showLineNumbers={true}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}

export default CodeSnippet;

const UNSUPPORTED_LANGUAGES = ["shell", "html", "css", "js"];