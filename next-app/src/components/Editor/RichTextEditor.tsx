"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from "@tiptap/extension-blockquote";
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    List,
    ListOrdered,
    Strikethrough,
    Code
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { cn } from "@/lib/utils";
import { IconBlockquote } from "@tabler/icons-react";

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    className?: string;
}
export default function RichTextEditor({
    content,
    onChange,
    className
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc ml-3",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal ml-3",
                    },
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight,
            CodeBlock.configure({
                exitOnArrowDown: true,
            }),
            Blockquote
        ],
        content: content,
        editorProps: {
            attributes: {
                class: "prose-sm min-h-72 h-full border rounded-md dark:bg-neutral-900 bg-neutral-100 py-2 px-3",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    const Options = [
        {
            icon: <Heading2 className="size-4" />,
            onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
            preesed: editor?.isActive("heading", { level: 2 }),
        },
        {
            icon: <Heading3 className="size-4" />,
            onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
            preesed: editor?.isActive("heading", { level: 3 }),
        },
        {
            icon: <Bold className="size-4" />,
            onClick: () => editor?.chain().focus().toggleBold().run(),
            preesed: editor?.isActive("bold"),
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () => editor?.chain().focus().toggleItalic().run(),
            preesed: editor?.isActive("italic"),
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor?.chain().focus().toggleStrike().run(),
            preesed: editor?.isActive("strike"),
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor?.chain().focus().setTextAlign("left").run(),
            preesed: editor?.isActive({ textAlign: "left" }),
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor?.chain().focus().setTextAlign("center").run(),
            preesed: editor?.isActive({ textAlign: "center" }),
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor?.chain().focus().setTextAlign("right").run(),
            preesed: editor?.isActive({ textAlign: "right" }),
        },
        {
            icon: <List className="size-4" />,
            onClick: () => editor?.chain().focus().toggleBulletList().run(),
            preesed: editor?.isActive("bulletList"),
        },
        {
            icon: <ListOrdered className="size-4" />,
            onClick: () => editor?.chain().focus().toggleOrderedList().run(),
            preesed: editor?.isActive("orderedList"),
        },
        {
            icon: <IconBlockquote className="size-4" />,
            onClick: () => editor?.chain().focus().toggleBlockquote().run(),
            preesed: editor?.isActive("blockQuote"),
        },
        {
            icon: <Highlighter className="size-4" />,
            onClick: () => editor?.chain().focus().toggleHighlight().run(),
            preesed: editor?.isActive("highlight"),
        },
        {
            icon: <Code className="size-4" />,
            onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
            preesed: editor?.isActive("codeBlock"),
        },
    ];

    return (
        <div className={cn("space-y-2", className)}>
            <div className="border rounded-md p-1 mb-1 dark:bg-neutral-900 bg-neutral-100 space-x-2 z-50 sticky top-16">
                {Options.map((option, index) => (
                    <Toggle
                        key={index}
                        pressed={option.preesed}
                        onPressedChange={option.onClick}
                    >
                        {option.icon}
                    </Toggle>
                ))}
            </div>
            <EditorContent editor={editor} className="h-5/6 w-full" />
        </div>
    );
}