"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhotoUploaderProps {
  label?: string;
  onChange?: (files: File[]) => void;
  multiple?: boolean;
}

export function PhotoUploader({ label = "Upload photos", onChange, multiple = true }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  function handleFiles(selected: FileList | null) {
    if (!selected) return;
    const list = multiple ? Array.from(selected) : [selected[0]];
    setFiles(list);
    onChange?.(list);
  }

  return (
    <div>
      <div
        className={cn(
          "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          files.length === 0 && "border border-dashed rounded-md p-6 text-center cursor-pointer"
        )}
        onClick={() => inputRef.current?.click()}
      >
        {files.length === 0 ? (
          <span className="text-muted-foreground">{label}</span>
        ) : (
          files.map((file) => (
            <div key={file.name} className="relative aspect-video overflow-hidden rounded-md">
              <Image src={URL.createObjectURL(file)} alt={file.name} fill className="object-cover" />
            </div>
          ))
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept="image/*"
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
      {files.length > 0 && (
        <div className="mt-2 text-sm text-muted-foreground">{files.length} image(s) selected</div>
      )}
    </div>
  );
}
