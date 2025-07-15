import { Hero } from "@/components/landing/Hero";
import { MetricsStrip } from "@/components/landing/MetricsStrip";
import { RoleSelector } from "@/components/landing/RoleSelector";
import { TechBar } from "@/components/landing/TechBar";

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <RoleSelector />
      <TechBar />
    </>
  );
}