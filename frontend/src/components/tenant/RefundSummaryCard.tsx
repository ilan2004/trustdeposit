import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface RefundSummaryCardProps {
  refunded: number;
  held: number;
  txHash?: string;
  status: "pending" | "confirmed" | "failed";
}

export function RefundSummaryCard({ refunded, held, txHash, status }: RefundSummaryCardProps) {
  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Refund summary</h2>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="font-medium">Refunded</div>
        <div>Ξ{refunded}</div>
        <div className="font-medium">Held</div>
        <div>Ξ{held}</div>
        <div className="font-medium">Status</div>
        <div>
          <Badge variant={status === "confirmed" ? "success" : status === "failed" ? "destructive" : "secondary"}>
            {status}
          </Badge>
        </div>
      </div>
      {txHash && (
        <Link
          href={`https://etherscan.io/tx/${txHash}`}
          target="_blank"
          className="text-primary underline text-sm"
        >
          View transaction ↗
        </Link>
      )}
    </Card>
  );
}
