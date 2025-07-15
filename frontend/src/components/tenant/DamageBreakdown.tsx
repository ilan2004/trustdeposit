import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DamageItem } from "@/lib/api/ai";

export function DamageBreakdown({ items }: { items: DamageItem[] }) {
  return (
    <Accordion type="multiple" className="w-full">
      {items.map((d, i) => (
        <AccordionItem value={String(i)} key={i}>
          <AccordionTrigger>
            {d.area} – {d.severity} – Ξ{d.cost}
          </AccordionTrigger>
          <AccordionContent>
            {d.notes ?? "No additional notes."}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
