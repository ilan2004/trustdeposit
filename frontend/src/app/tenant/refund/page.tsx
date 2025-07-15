import { RefundSummary } from "@/components/tenant/RefundSummary";
import { Container } from "@/components/layout/Container";
import { DamageItem } from "@/lib/api/ai";

const dummy: DamageItem[] = [
  { area: "Wall", severity: "medium", cost: 0.02 },
  { area: "Carpet", severity: "high", cost: 0.05 },
];

export default function RefundPage() {
  return (
    <main className="py-16">
      <Container>
        <RefundSummary items={dummy} total={0.07} />
      </Container>
    </main>
  );
}
