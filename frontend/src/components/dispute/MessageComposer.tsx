"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip } from "lucide-react";

interface MessageComposerProps {
  onSend: (text: string, attachments: File[]) => void;
}

export function MessageComposer({ onSend }: MessageComposerProps) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) setFiles(Array.from(e.target.files));
  }

  function handleSend() {
    if (!text && files.length === 0) return;
    onSend(text, files);
    setText("");
    setFiles([]);
  }

  return (
    <div className="space-y-2">
      <Textarea
        placeholder="Write a message…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      />
      <div className="flex items-center justify-between">
        <label className="inline-flex items-center gap-1 cursor-pointer text-sm text-muted-foreground">
          <Paperclip className="size-4" /> Attach
          <input type="file" hidden multiple onChange={handleFile} />
        </label>
        <Button size="sm" onClick={handleSend} disabled={!text && files.length === 0}>
          Send
        </Button>
      </div>
    </div>
  );
}
