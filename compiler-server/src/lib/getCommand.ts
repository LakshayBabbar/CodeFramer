type SupportedLanguage = "python" | "javascript" | "cpp" | "c";

export const imageMap: Record<SupportedLanguage, string> = {
  python: "python:3.10-slim",
  javascript: "node:18-alpine",
  cpp: "lakshaybabbar/custom-gcc:latest",
  c: "lakshaybabbar/custom-gcc:latest",
};

export async function getDockerCommand(
  language: SupportedLanguage,
  code: string
) {
  if (!imageMap[language]) throw new Error("Unsupported language");
  const baseCommand = `docker run --rm --stop-timeout=10 ${imageMap[language]} `;

  // Encode the code to base64
  const encodedCode = Buffer.from(code, "utf-8").toString("base64");

  switch (language) {
    case "python":
      return `${baseCommand} sh -c "echo ${encodedCode} | base64 -d > /temp.py && python3 /temp.py"`;
    case "javascript":
      return `${baseCommand} sh -c "echo ${encodedCode} | base64 -d > /temp.js && node /temp.js"`;
    case "cpp":
      return `${baseCommand} "echo ${encodedCode} | base64 -d > /temp.cpp && g++ /temp.cpp -o temp.out && ./temp.out"`;
    case "c":
      return `${baseCommand} "echo ${encodedCode} | base64 -d > /temp.c && gcc /temp.c -o temp.out && ./temp.out"`;
    default:
      throw new Error("Unsupported language");
  }
}
