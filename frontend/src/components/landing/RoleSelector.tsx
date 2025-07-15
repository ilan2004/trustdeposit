import { Briefcase, Home } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { RoleCard } from "./RoleCard";

export function RoleSelector() {
  return (
    <section className="py-14" id="roles">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          title="Choose your role"
          subtitle="Whether you're moving in or managing properties, TrustDeposit has you covered."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <RoleCard
            href="/tenant/deposit"
            icon={<Home className="size-8" />}
            title="Tenant"
            description="Pay your deposit, upload photos, and get instant refunds."
          />
          <RoleCard
            href="/landlord/dashboard"
            icon={<Briefcase className="size-8" />}
            title="Landlord / Manager"
            description="Manage deposits at scale, resolve disputes, and save admin time."
          />
        </div>
      </Container>
    </section>
  );
}
