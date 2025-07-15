import { Container } from "@/components/layout/Container";
import Image from "next/image";

const logos = [
  { src: "/logos/ethereum.svg", alt: "Ethereum" },
  { src: "/logos/nextjs.svg", alt: "Next.js" },
  { src: "/logos/tailwind.svg", alt: "Tailwind" },
  { src: "/logos/radix.svg", alt: "Radix UI" },
];

export function TechBar() {
  return (
    <section className="py-10 border-y bg-muted/20">
      <Container className="flex flex-wrap items-center justify-center gap-8 opacity-80">
        {logos.map((l) => (
          <Image
            key={l.alt}
            src={l.src}
            alt={l.alt}
            width={100}
            height={24}
            className="object-contain dark:invert"
          />
        ))}
      </Container>
    </section>
  );
}
