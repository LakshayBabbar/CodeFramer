import { Request } from "express";

export type SupportedLanguage = "python" | "javascript" | "cpp" | "c" | "shell" | "sql";

export interface ExecutionRequest extends Request {
  body: {
    code: string;
    language: SupportedLanguage;
    inputs?: string;
    access_key: string;
  };
}


