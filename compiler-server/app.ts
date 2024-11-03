import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { executionHandler } from "./src/controllers/execute.js";
import { config } from "dotenv";
config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get("/status", (req: Request, res: any) => {
  try {
    return res.status(200).json({ status: "Server is running" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/execute", executionHandler as any);

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
