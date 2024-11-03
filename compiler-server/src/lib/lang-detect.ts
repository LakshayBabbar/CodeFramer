type SupportedLanguage = "python" | "javascript" | "java";

export const imageMap: Record<SupportedLanguage, string> = {
  python: "python:3.10-slim",
  javascript: "node:18-alpine",
  java: "openjdk:17-jdk-alpine",
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
    case "java":
      return `${baseCommand} sh -c "echo ${encodedCode} | base64 -d > /temp.java && java /temp.java"`;
    default:
      throw new Error("Unsupported language");
  }
}
