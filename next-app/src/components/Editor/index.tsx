import { Editor, OnMount, type Monaco } from "@monaco-editor/react";
import React, { useEffect } from "react";
import editorThemes from "@/shared/themes.json";
import { CopilotButton } from "../Copilot/Copilot";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useTheme } from "next-themes";
import { capitalise } from "@/lib/helpers";

interface EditorComProps {
    file: {
        name: string;
        value: string;
        language: string;
    },
    onValChange: (val: string | undefined) => void;
    children?: React.ReactNode;
}
const BaseEditor = ({ file, onValChange, children }: EditorComProps) => {
    const editorRef = React.useRef<any>(null);
    const { resolvedTheme: theme } = useTheme();
    const handleEditorDidMount = (monaco: Monaco) => {
        editorThemes.forEach((theme) => {
            monaco.editor.defineTheme(theme.name, theme.data as any);
        });
    };

    const handleEditorMount: OnMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };
    const [editorTheme, setEditorTheme] = React.useState("merbivore");
    const [res, setRes] = React.useState<string>("");


    const themeHandler = (theme: string) => {
        setEditorTheme(theme);
        localStorage.setItem("EditorTheme", theme);
    };

    useEffect(() => {
        if (theme === "dark") {
            const syncTheme = localStorage.getItem("EditorTheme");
            setEditorTheme(syncTheme || "merbivore");
        } else {
            setEditorTheme("vs-light");
        }
    }, [theme]);

    useEffect(() => {
        if (res) {
            editorRef.current.setValue(res);
        }
    }, [res]);


    return (
        <div className="w-full h-full">
            <div className="w-full py-2 h-fit flex flex-wrap gap-2 items-center justify-between border bg-card px-5">
                <div className="flex items-center gap-2">
                    <CopilotButton code={file.value} setCode={setRes} lang={file.language} />
                    {theme === "dark" && <Select onValueChange={(val) => themeHandler(val)}>
                        <SelectTrigger className="w-fit">
                            <SelectValue placeholder={capitalise(editorTheme)} />
                        </SelectTrigger>
                        <SelectContent>
                            {editorThemes.map((item, index) => {
                                return (
                                    <SelectItem key={index} value={item.name}>{capitalise(item.name)}</SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>}
                </div>
                <div className="flex gap-2">
                    {children}
                </div>
            </div>
            <Editor
                width="100%"
                height="93%"
                path={file.name}
                value={file.value}
                language={file.language}
                theme={editorTheme || "vs-dark"}
                beforeMount={handleEditorDidMount}
                onMount={handleEditorMount}
                onChange={onValChange}
                options={{
                    fontSize: 14,
                    padding: { top: 10 },
                    minimap: { enabled: false },
                    formatOnPaste: true,
                    formatOnType: true,
                    autoIndent: "advanced",
                    autoClosingBrackets: "always",
                    acceptSuggestionOnEnter: "on",
                    automaticLayout: true,
                    autoClosingOvertype: "always",
                    autoClosingDelete: "always",
                    tabCompletion: "on",
                    wordBasedSuggestions: "allDocuments",
                    suggestOnTriggerCharacters: true,
                    suggestSelection: "first",
                }}
            />
        </div>
    )
}

export default BaseEditor;   