type SupportedLanguage = "python" | "javascript" | "cpp" | "c";

export const imageMap: Record<SupportedLanguage, string> = {
  python: "python:3.10-slim",
  javascript: "node:18-alpine",
  cpp: "lakshaybabbar/custom-gcc:latest",
  c: "lakshaybabbar/custom-gcc:latest",
};

export function buildExecutionCommand(
  language: SupportedLanguage,
  code: string,
  inputs: string
): string {
  const encodedInputs = Buffer.from(inputs, "utf-8").toString("base64");
  const encodedCode = Buffer.from(code, "utf-8").toString("base64");
  const baseCommand = `echo ${encodedInputs} | base64 -d > /inputs.txt && echo ${encodedCode} | base64 -d >`;

  switch (language) {
    case "python":
      return `${baseCommand} /temp.py && python3 /temp.py < /inputs.txt`;
    case "javascript":
      return `${baseCommand} /temp.js && node /temp.js < /inputs.txt`;
    case "cpp":
      return `${baseCommand} /temp.cpp && g++ /temp.cpp -o temp.out && ./temp.out < /inputs.txt`;
    case "c":
      return `${baseCommand} /temp.c && gcc /temp.c -o temp.out && ./temp.out < /inputs.txt`;
    default:
      throw new Error("Unsupported language");
  }
}
