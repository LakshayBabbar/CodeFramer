import { exec } from "child_process";
import { Request, Response } from "express";
import { getDockerCommand } from "../lib/lang-detect.js";

interface ExecutionRequest extends Request {
  body: {
    code: string;
    language: "python" | "javascript" | "java";
    inputs?: string;
  };
}

export async function executionHandler(req: ExecutionRequest, res: Response) {
  const { code, language, inputs = "" } = req.body;

  try {
    const command = await getDockerCommand(language, code);
    const output = await execCommand(command, inputs);
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
  cmd: string,
  inputs: string
): Promise<{ stdout?: string; stderr?: string }> => {
  return new Promise((resolve, reject) => {
    const process = exec(cmd, { maxBuffer: 1024 * 1024 * 5 });
    process.stdin?.write(inputs);
    process.stdin?.end();

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
