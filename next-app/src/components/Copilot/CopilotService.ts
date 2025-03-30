import { GoogleGenerativeAI } from "@google/generative-ai";

// Type definitions for better type safety
export type CopilotContext = "FIX" | "EXPLAIN" | "IMPROVE" | "QUERY";
export type EditorLanguage = "html" | "css" | "js" | "javascript" | "python" | "shell" | "c" | "cpp" | "sql" | string;
export type WebEditorValues = { html: string; css: string; js: string };

interface CopilotResponse {
    code: string;
    error?: string;
}

/**
 * Creates a prompt for the AI based on the context and code
 */
export const generatePrompt = (context: CopilotContext, lang: EditorLanguage, code: string, query?: string): string => {
    const prompts: Record<CopilotContext, string> = {
        FIX: `Fix the following ${lang} code and return only the corrected code. Include explanations within comments:\n\n${code}\n\nReturn JSON format: {"code": "your fixed code here"}`,

        EXPLAIN: `Explain the following ${lang} code within comments and return the explained code:\n\n${code}\n\nReturn JSON format: {"code": "your explained code here"}`,

        IMPROVE: `Improve the following ${lang} code and return only the improved code:\n\n${code}\n\nReturn JSON format: {"code": "your improved code here"}`,

        QUERY: `Answer the following query related to ${lang} code and return only the relevant code. If explanation is needed, include it within comments:\n\nQuery: ${query || ""}\n\nCode: ${code}\n\nReturn JSON format: {"code": "your answer code here"}`,
    };

    return prompts[context];
};

/**
 * Service for interacting with the Gemini API
 */
export class CopilotService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor(apiKey: string) {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    }

    async processCode(context: CopilotContext, lang: EditorLanguage, code: string, query?: string): Promise<CopilotResponse> {
        try {
            const prompt = generatePrompt(context, lang, code, query);

            const result = await this.model.generateContent({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.2,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 8192,
                },
            });

            const response = result.response;
            const text = response.text();

            try {
                // Try to parse as JSON
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    return JSON.parse(jsonMatch[0]);
                }

                // If not JSON format, wrap the text in a code property
                return { code: text };
            } catch (error) {
                // If parsing fails, just return the raw text
                return { code: text };
            }
        } catch (error: any) {
            console.error("Error in AI processing:", error);
            return { code: "", error: error.message || "Failed to process with AI" };
        }
    }

    /**
     * Handle web editor specific processing (HTML, CSS, JS)
     */
    async processWebCode(context: CopilotContext, values: WebEditorValues, query?: string): Promise<WebEditorValues> {
        try {
            // Create a combined prompt that maintains relationships between HTML, CSS, and JS
            const combinedCode = JSON.stringify(values);
            const prompt = generatePrompt(context, "html, css and js", combinedCode, query);

            const result = await this.model.generateContent({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.2,
                    maxOutputTokens: 8192,
                },
            });

            const updatedValues = result.response.text();
            updatedValues
            console.log(updatedValues)
            return updatedValues;
        } catch (error: any) {
            console.error("Error processing web code:", error);
            return values; // Return original values on error
        }
    }
}
