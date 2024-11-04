import { exec } from "child_process";
import { Request, Response } from "express";
import { getDockerCommand } from "../lib/getCommand.js";
import { config } from "dotenv";
config();

interface ExecutionRequest extends Request {
  body: {
    code: string;
    language: "python" | "javascript" | "cpp" | "c";
    inputs?: string;
    access_key: string;
  };
}

export async function executionHandler(req: ExecutionRequest, res: Response) {
  const { code, language, inputs = "", access_key } = req.body;

  if (access_key !== process.env.ACCESS_KEY) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const command = await getDockerCommand(language, code, inputs);
    const output = await execCommand(command);
    if (output.stderr) {
      return res.json({ output: output.stderr, codeError: true });
    }
    return res.json({ output: output.stdout, codeError: false });
  } catch (error: any) {
    const status = error.code === "ETIMEDOUT" ? 408 : error.status || 500;
    return res.status(status).json({ error: error.stderr || error.message });
  }
}

const execCommand = (
  cmd: string
): Promise<{ stdout?: string; stderr?: string }> => {
  return new Promise((resolve, reject) => {
    const process = exec(cmd, { maxBuffer: 1024 * 1024 * 5 });

    const timer = setTimeout(() => {
      process.kill("SIGTERM");
      reject({
        stderr: "Execution timeout exceeded 10 seconds",
        code: "ETIMEDOUT",
      });
    }, 10000);

    process?.stdout?.on("data", (data) => {
      resolve({ stdout: data.toString() });
    });

    process.stderr?.on("data", (data) => {
      resolve({ stderr: data.toString() });
    });

    process.on("exit", (code) => {
      clearTimeout(timer);
      if (code !== 0) {
        reject({ stderr: `Process exited with code ${code}` });
      }
    });
  });
};
