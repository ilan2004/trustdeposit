import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";

const apiKey = process.env.AI_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("AI_GEMINI_API_KEY not set in environment");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Helper to fetch image bytes from URL
async function fetchImageBytes(url: string): Promise<Uint8Array> {
  const resp = await fetch(url);
  const buffer = await resp.arrayBuffer();
  return new Uint8Array(buffer);
}

export async function analyzeDamage(beforeUrls: string[], afterUrls: string[]) {
  // For simplicity we feed only the first before/after pair to Gemini.
  // You can extend to multiple images by updating the prompt.
  const beforeImg = await fetchImageBytes(beforeUrls[0]);
  const afterImg = await fetchImageBytes(afterUrls[0]);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt =
    "You are an AI assistant that compares two rental property images: one before move-in and one after move-out. " +
    "Identify any damages in the AFTER image compared to BEFORE and output ONLY a JSON object with two keys: 'damaged' (true/false) and 'estimated_cost_usd' (number).";

  const result = await model.generateContent([
    { text: prompt },
    { inlineData: { mimeType: "image/jpeg", data: Buffer.from(beforeImg).toString("base64") } },
    { inlineData: { mimeType: "image/jpeg", data: Buffer.from(afterImg).toString("base64") } },
  ]);

  const text = result.response.text();
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Gemini response not JSON: " + text);
  }

  // Convert USD cost to Wei assuming 1 USD == 1 MATIC for testnet simplicity; adapt in prod
  const tenantShareWei = parsed.damaged ? 0 : undefined;
  return { damaged: parsed.damaged, estimatedCostUSD: parsed.estimated_cost_usd, tenantShareWei };
}
