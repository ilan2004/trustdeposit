import { Web3Storage, File as Web3File } from "web3.storage";

// NOTE: For hackathon/demo we can use an env var or fall back to local object URLs.
const token = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;
let client: Web3Storage | null = null;

function getClient() {
  if (!token) return null;
  if (!client) client = new Web3Storage({ token });
  return client;
}

export async function uploadImages(files: File[]): Promise<string[]> {
  const c = getClient();
  if (!c) {
    // Fallback: use local preview URLs (not persistent!)
    return files.map((f) => URL.createObjectURL(f));
  }
  const cid = await c.put(files as unknown as Web3File[]);
  return files.map((f) => `https://${cid}.ipfs.w3s.link/${encodeURIComponent(f.name)}`);
}
