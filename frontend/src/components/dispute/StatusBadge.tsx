import { Badge } from "@/components/ui/badge";

export type DisputeStatus = "open" | "in-review" | "resolved";

export function StatusBadge({ status }: { status: DisputeStatus }) {
  const variant =
    status === "resolved" ? "success" : status === "open" ? "secondary" : "outline";
  return <Badge variant={variant}>{status}</Badge>;
}
