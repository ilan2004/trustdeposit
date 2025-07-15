import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RoleCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function RoleCard({ href, icon, title, description }: RoleCardProps) {
  return (
    <Card className="flex flex-col gap-4 p-6 text-center items-center">
      <div className="text-primary mb-2">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground flex-1">{description}</p>
      <Button asChild className="mt-4 w-full max-w-xs">
        <Link href={href} className="flex items-center justify-center gap-2">
          Continue <ArrowRight className="size-4" />
        </Link>
      </Button>
    </Card>
  );
}
