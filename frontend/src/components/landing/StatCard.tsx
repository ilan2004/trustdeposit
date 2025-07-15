import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export function StatCard({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <Card className="flex items-center gap-4 p-4">
      <div className="text-primary">{icon}</div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold leading-none">{value}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </Card>
  );
}
