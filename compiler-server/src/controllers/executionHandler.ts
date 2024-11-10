import Docker from "dockerode";
import { Response } from "express";
import { config } from "dotenv";
import { buildExecutionCommand } from "../lib/execCommand.js";
import { ExecutionRequest, SupportedLanguage } from "../types/types.js";
config();

const docker = new Docker();
const EXECUTION_TIMEOUT_MS = 10000;

const imageMap: Record<SupportedLanguage, string> = {
  python: "python:3.10-slim",
  javascript: "node:18-alpine",
  cpp: "lakshaybabbar/custom-gcc:latest",
  c: "lakshaybabbar/custom-gcc:latest",
};

export async function executionHandler(req: ExecutionRequest, res: Response) {
  const { code, language, inputs = "", access_key } = req.body;

  if (access_key !== process.env.ACCESS_KEY) {
    res.status(401).json({ error: "Unauthorized access" });
  }

  const image = imageMap[language];

  if (!image) {
    res.status(400).json({ error: "Unsupported language" });
  }

  try {
    const command = buildExecutionCommand(language, code, inputs);

    const container = await docker.createContainer({
      Image: image,
      Cmd: ["/bin/sh", "-c", command],
      HostConfig: {
        AutoRemove: true,
      },
    });

    await container.start();

    const timeout = setTimeout(async () => {
      try {
        await container.kill();
      } catch (err) {
        console.error("Failed to kill container on timeout:", err);
      }
    }, EXECUTION_TIMEOUT_MS);

    const stdoutStream = await container.logs({
      stdout: true,
      stderr: false,
      follow: true,
    });

    const stderrStream = await container.logs({
      stdout: false,
      stderr: true,
      follow: true,
    });

    let stdout = "";
    let stderr = "";

    stdoutStream.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    stderrStream.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    stdoutStream.on("end", async () => {
      clearTimeout(timeout);
      res.json({
        output: stderr ? stderr : stdout,
        codeError: stderr ? true : false,
      });
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Execution failed" });
  }
}
