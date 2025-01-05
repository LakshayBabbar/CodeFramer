import Docker from "dockerode";
import { Response } from "express";
import { config } from "dotenv";
import { buildExecutionCommand } from "../utils/execCommand.js";
import { ExecutionRequest, SupportedLanguage } from "../types/types.js";
config();

const docker = new Docker();
const EXECUTION_TIMEOUT_MS = 15000;

const imageMap: Record<SupportedLanguage, string> = {
  python: "python:3.10-slim",
  javascript: "lakshaybabbar/node:02",
  cpp: "lakshaybabbar/custom-gcc:latest",
  c: "lakshaybabbar/custom-gcc:latest",
  typescript: "lakshaybabbar/node:02",
};

export async function executionHandler(req: ExecutionRequest, res: Response) {
  const language = req.params.lang as SupportedLanguage;
  const { code, inputs = "", access_key } = req.body;

  try {
    if (access_key !== process.env.ACCESS_KEY) {
      throw new Error("Unauthorized access:401");
    }

    const image = imageMap[language];

    if (!image) {
      throw new Error("Unsupported language:400");
    }

    const command = buildExecutionCommand(language, code, inputs);

    const container = await docker.createContainer({
      Image: image,
      Cmd: ["/bin/sh", "-c", command],
      HostConfig: {
        AutoRemove: true,
      },
    });

    await container.start();

    let stdout = "";
    let stderr = "";
    let isTimedOut = false;

    const timeout = setTimeout(async () => {
      isTimedOut = true;
      res.json({
        output: "Execution timed out",
        codeError: true,
      });
      await cleanUpContainer(container);
    }, EXECUTION_TIMEOUT_MS);

    const cleanUpContainer = async (container: Docker.Container) => {
      try {
        // Ensure container is not already stopped
        const inspectData = await container.inspect();
        if (inspectData.State.Running) {
          await container.kill({ signal: "SIGKILL" });
        }
      } catch (err) {
        console.error("Error cleaning up container:", err);
      }
    };

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

    stdoutStream.on("data", (chunk) => {
      const sanitizedChunk = chunk.toString().replace(/[^\x20-\x7E\n\r]/g, "");
      stdout += sanitizedChunk;
    });

    stderrStream.on("data", (chunk) => {
      const sanitizedChunk = chunk.toString().replace(/[^\x20-\x7E\n\r]/g, "");
      stderr += sanitizedChunk;
    });

    stdoutStream.on("end", async () => {
      if (!isTimedOut) {
        clearTimeout(timeout);
        let codeError = false;
        let output = stdout || stderr;

        if (stderr) {
          if (language === "typescript" && stderr.toLowerCase().includes("error")) {
            codeError = true;
          } else if (language !== "typescript") {
            codeError = true;
          }
        }

        res.json({
          output,
          codeError,
        });
        await cleanUpContainer(container);
      }
    });
  } catch (error: any) {
    let statusCode = 500;
    let message = error.message || "Execution failed";
    if (error.message.includes(":")) {
      statusCode = parseInt(error.message.split(":")[1]);
      message = error.message.split(":")[0];
    }
    res.status(statusCode).json({ error: message });
  }
}
