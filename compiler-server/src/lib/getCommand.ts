type SupportedLanguage = "python" | "javascript" | "cpp" | "c";

export const imageMap: Record<SupportedLanguage, string> = {
  python: "python:3.10-slim",
  javascript: "node:18-alpine",
  cpp: "lakshaybabbar/custom-gcc:latest",
  c: "lakshaybabbar/custom-gcc:latest",
};

export async function getDockerCommand(
  language: SupportedLanguage,
  code: string,
  inputs: string
) {
  if (!imageMap[language]) throw new Error("Unsupported language");

  // Encode the code and inputs to base64
  const encodedInputs = Buffer.from(inputs, "utf-8").toString("base64");
  const baseCommand = `docker run --rm --stop-timeout=10 -w /app ${imageMap[language]} sh -c "echo ${encodedInputs} | base64 -d > /inputs.txt`;
  const encodedCode = Buffer.from(code, "utf-8").toString("base64");

  switch (language) {
    case "python":
      return `${baseCommand} && echo ${encodedCode} | base64 -d > /temp.py && python3 /temp.py < /inputs.txt"`;
    case "javascript":
      return `${baseCommand} && echo ${encodedCode} | base64 -d > /temp.js && node /temp.js < /inputs.txt"`;
    case "cpp":
      return `${baseCommand} && echo ${encodedCode} | base64 -d > /temp.cpp && g++ /temp.cpp -o temp.out && ./temp.out < /inputs.txt"`;
    case "c":
      return `${baseCommand} && echo ${encodedCode} | base64 -d > /temp.c && gcc /temp.c -o temp.out && ./temp.out < /inputs.txt"`;
    default:
      throw new Error("Unsupported language");
  }
}
