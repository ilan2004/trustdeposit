import Image from "next/image";

interface ImageDiffViewerProps {
  before: string;
  after: string;
}

export function ImageDiffViewer({ before, after }: ImageDiffViewerProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div>
        <p className="text-sm mb-1 text-muted-foreground">Before</p>
        <Image src={before} alt="before" width={400} height={300} className="rounded-md object-cover" />
      </div>
      <div>
        <p className="text-sm mb-1 text-muted-foreground">After</p>
        <Image src={after} alt="after" width={400} height={300} className="rounded-md object-cover" />
      </div>
    </div>
  );
}
