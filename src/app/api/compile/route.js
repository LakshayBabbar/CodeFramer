import { exec } from "child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const languages = [
  { name: "python", extension: "py", command: "python3" },
  { name: "javascript", extension: "js", command: "node" },
  { name: "java", extension: "java", command: "java" },
];

export async function POST(req) {
  try {
    const { code, language } = await req.json();

    const lang = languages.find((lang) => lang.name === language);
    if (!lang) {
      return NextResponse.json(
        { error: "Language not supported" },
        { status: 400 }
      );
    }

    const tempDirName = Math.random().toString(36).substring(6);
    const tempDirPath = path.join(process.cwd(), "temp", tempDirName);
    const filePath = path.join(tempDirPath, `temp.${lang.extension}`);

    try {
      await fs.mkdir(tempDirPath, { recursive: true });

      await fs.writeFile(filePath, code);

      const { stdout, stderr } = await execCommand(
        `${lang.command} ${filePath}`
      );

      await fs.rm(tempDirPath, { recursive: true, force: true });

      if (stderr) {
        return NextResponse.json(
          { outerr: stderr || "Execution error" },
          { status: 400 }
        );
      }

      return NextResponse.json({ output: stdout });
    } catch (error) {
      await fs.rm(tempDirPath, { recursive: true, force: true });
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

const execCommand = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject({ stderr });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};
