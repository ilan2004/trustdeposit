import { useState } from "react";

export function useUpload() {
  const [uploading, setUploading] = useState(false);
  const [urls, setUrls] = useState<string[]>([]);

  async function upload(files: File[]) {
    setUploading(true);
    // TODO replace with real storage upload
    await new Promise((r) => setTimeout(r, 1000));
    const dummy = files.map((f) => URL.createObjectURL(f));
    setUrls(dummy);
    setUploading(false);
    return dummy;
  }

  return { upload, uploading, urls };
}
