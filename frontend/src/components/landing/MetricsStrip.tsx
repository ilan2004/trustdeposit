import { DollarSign, Scale, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { StatCard } from "./StatCard";

export function MetricsStrip() {
  return (
    <section className="py-12" id="metrics">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <StatCard
            icon={<DollarSign className="size-6" />}
            value="$50B+"
            label="Deposits locked globally"
          />
          <StatCard
            icon={<Scale className="size-6" />}
            value="30%"
            label="Rentals end in disputes"
          />
          <StatCard
            icon={<Clock className="size-6" />}
            value="4-6 weeks"
            label="Average refund delay"
          />
        </div>
      </Container>
    </section>
  );
}
