import Docker from "dockerode";
import { Response } from "express";
import { config } from "dotenv";
import { buildExecutionCommand } from "../utils/execCommand.js";
import { ExecutionRequest, SupportedLanguage } from "../types/types.js";

config();
const docker = new Docker();
const EXECUTION_TIMEOUT_MS = 15000;

const imageMap: Record<SupportedLanguage, string> = {
  python: "lakshaybabbar/python",
  cpp: "lakshaybabbar/cpp",
  c: "lakshaybabbar/cpp",
  javascript: "lakshaybabbar/node",
  typescript: "lakshaybabbar/node",
  shell: "lakshaybabbar/shell",
  sql: "lakshaybabbar/sqlite"
};

export async function executionHandler(req: ExecutionRequest, res: Response) {
  const language = req.params.lang as SupportedLanguage;
  const { code, inputs = "", access_key } = req.body;

  if (access_key !== process.env.ACCESS_KEY) {
    res.status(401).json({ error: "Unauthorized access" });
  }

  const image = imageMap[language];
  if (!image) {
    res.status(400).json({ error: "Unsupported language" });
  }

  const command = buildExecutionCommand(language, code, inputs);
  let container: Docker.Container | undefined;
  let stdout = "";
  let stderr = "";
  let responseSent = false;

  try {
    container = await docker.createContainer({
      Image: image,
      Cmd: ["/bin/sh", "-c", command],
      HostConfig: { AutoRemove: true },
    });

    await container.start();

    const timeout = setTimeout(async () => {
      if (!responseSent) {
        responseSent = true;
        res.json({ output: "Execution timed out", codeError: true });
        if (container) await cleanUpContainer(container);
      }
    }, EXECUTION_TIMEOUT_MS);

    // Handle output logs safely
    const stdoutStream = await container.logs({ stdout: true, stderr: false, follow: true });
    const stderrStream = await container.logs({ stdout: false, stderr: true, follow: true });

    stdoutStream.on("data", (chunk) => {
      stdout += chunk.toString().replace(/[^\x20-\x7E\n\r]/g, "");
    });

    stderrStream.on("data", (chunk) => {
      stderr += chunk.toString().replace(/[^\x20-\x7E\n\r]/g, "");
    });

    stdoutStream.on("end", async () => {
      if (!responseSent) {
        clearTimeout(timeout);
        responseSent = true;
        let codeError = false;
        let output = stdout || stderr;

        if (stderr.trim()) {
          if (language === "typescript" && stderr.toLowerCase().includes("error")) {
            codeError = true;
          } else if (language !== "typescript" && !stdout.trim()) {
            codeError = true;
          }
        }

        res.json({ output, codeError });
      }
    });

  } catch (error: any) {
    console.error("Execution Error:", error.message);
    if (container) await cleanUpContainer(container);
    if (!responseSent) {
      responseSent = true;
      res.status(500).json({ error: "Container execution failed" });
    }
  }
}

// Function to clean up the container
async function cleanUpContainer(container: Docker.Container) {
  try {
    const containers = await docker.listContainers({ all: true });
    const containerExists = containers.some(c => c.Id.startsWith(container.id));

    if (containerExists) {
      const inspectData = await container.inspect();
      if (inspectData.State.Running) {
        await container.kill({ signal: "SIGKILL" });
      }
    }
  } catch (err) {
    console.error("Error cleaning up container:", err);
  }
}
