import { SupportedLanguage } from "../types/types.js";

export function buildExecutionCommand(
  language: SupportedLanguage,
  code: string,
  inputs: string
): string {
  const encodedInputs = Buffer.from(inputs || "", "utf-8").toString("base64");
  const encodedCode = Buffer.from(code, "utf-8").toString("base64");
  const baseCommand = `echo ${encodedInputs} | base64 -d > /inputs.txt && echo ${encodedCode} | base64 -d >`;

  switch (language) {
    case "python":
      return `${baseCommand} /temp.py && python3 /temp.py < /inputs.txt`;
    case "cpp":
      return `${baseCommand} /temp.cpp && g++ /temp.cpp -o temp.out && ./temp.out < /inputs.txt`;
    case "javascript":
      return `${baseCommand} /temp.js && node /temp.js < /inputs.txt`;
    case "c":
      return `${baseCommand} /temp.c && gcc /temp.c -o temp.out && ./temp.out < /inputs.txt`;
    case "sql":
      return `${baseCommand} /temp.sql && sqlite3 -table /temp.db < /temp.sql`;
    case "shell":
      return `${baseCommand} /temp.sh && chmod +x /temp.sh && sh /temp.sh < /inputs.txt`;
    default:
      throw new Error("Unsupported language");
  }
}
