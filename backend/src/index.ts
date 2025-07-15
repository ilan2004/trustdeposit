import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { analyzeDamage } from "./gemini";

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));

// Health check
app.get("/health", (_: Request, res: Response) => res.send("ok"));

// Proxy endpoint for image analysis
app.post("/analyze-damage", async (req: Request, res: Response) => {
  try {
    const { beforeUrls, afterUrls } = req.body as {
      beforeUrls: string[];
      afterUrls: string[];
    };
    if (!beforeUrls?.length || !afterUrls?.length) {
      return res.status(400).json({ error: "beforeUrls and afterUrls required" });
    }
    const result = await analyzeDamage(beforeUrls, afterUrls);
    res.json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.BACKEND_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
