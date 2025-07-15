import { Container } from "@/components/layout/Container";
import { DepositForm } from "@/components/tenant/DepositForm";

export default function TenantDepositPage() {
  return (
    <main className="py-16">
      <Container>
        <DepositForm />
      </Container>
    </main>
  );
}
