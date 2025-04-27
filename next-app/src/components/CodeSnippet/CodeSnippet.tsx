"use client"
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Button } from '../ui/button';
import { Play, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { capitalise, SUPPORTED_LANGUAGES } from '@/lib/helpers';
import { useRouter } from 'next/navigation';
import { nightOwl, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';

const CodeSnippet = ({ code, language }: any) => {
    const isCodeRunnable = SUPPORTED_LANGUAGES.includes(language) && !UNSUPPORTED_LANGUAGES.includes(language);
    const { push } = useRouter();
    const { toast } = useToast();
    const { resolvedTheme } = useTheme();

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
        <div className='w-[90vw] sm:w-full h-fit border rounded bg-snippet'>
            <div className='flex items-center justify-between p-2 px-4 border-b text-primary'>
                <span className='text-sm'>{`>_ ${capitalise(language)}`}</span>
                <div>
                    {isCodeRunnable && <Button variant="ghost" size="sm" onClick={handleRunCode} aria-label='Run Code'><Play /></Button>}
                    <Button variant="ghost" size="sm" onClick={handleCopyCode} aria-label='Copy Code'><Copy /></Button>
                </div>
            </div>
            <div className='code-block'>
                <SyntaxHighlighter
                    language={language}
                    style={resolvedTheme === "dark" ? nightOwl : materialLight}
                    customStyle={{ fontSize: '14px', background: "var(--snippet)", overflowX: "auto", width: "100%", margin: "1rem 0" }}
                    showLineNumbers={true}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}

export default CodeSnippet;

const UNSUPPORTED_LANGUAGES = ["html", "css", "js"];