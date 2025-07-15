import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DamageItem } from "@/lib/api/ai";

interface RefundSummaryProps {
  items: DamageItem[];
  total: number;
  onDispute?: () => void;
}

export function RefundSummary({ items, total, onDispute }: RefundSummaryProps) {
  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Refund breakdown</h2>
      <ul className="space-y-2 text-sm">
        {items.map((item, i) => (
          <li key={i} className="flex justify-between">
            <span>
              {item.area} – {item.severity}
            </span>
            <span>Ξ{item.cost}</span>
          </li>
        ))}
      </ul>
      <div className="font-medium flex justify-between text-base">
        <span>Total deductions</span>
        <span>Ξ{total}</span>
      </div>
      <Button variant="secondary" onClick={onDispute}>
        Raise Dispute
      </Button>
    </Card>
  );
}
