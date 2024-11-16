import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { executionHandler } from "./src/controllers/executionHandler.js";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();
const allowedOrigins = [process.env.ORIGIN];
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get("/status", (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Server is running" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/execute/:lang", executionHandler);

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
