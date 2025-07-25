"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { PlayCircle } from "lucide-react";

export function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <section className="pt-20 pb-14" id="hero">
      <Container className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Security deposits a0without distrust.
          </h1>
          <p className="text-lg text-muted-foreground max-w-prose">
            Lock funds on-chain, capture evidence with photos, and let AI handle the
            hand-over. No more weeks of waiting or messy disputes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/app">Launch App</Link>
            </Button>
            <Button variant="secondary" onClick={() => setOpen(true)}>
              <PlayCircle className="mr-2 size-5" /> Watch demo
            </Button>
          </div>
        </div>

        {/* Illustration placeholder */}
        <div className="relative h-64 w-full md:h-80">
          <Image
            src="/illustrations/secure.svg"
            alt="Secure funds"
            fill
            className="object-contain"
          />
        </div>
      </Container>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="aspect-video max-w-4xl p-0">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Demo video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full rounded-md"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}
