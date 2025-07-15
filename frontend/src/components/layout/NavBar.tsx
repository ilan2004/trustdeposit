"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { ConnectWalletButton } from "./ConnectWalletButton";
import { ThemeToggle } from "./ThemeToggle";

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <ShieldCheck className="size-6" />
          TrustDeposit
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden gap-6 text-sm md:flex">
          <Link href="#features" className="transition-colors hover:text-foreground/80">
            Features
          </Link>
          <Link href="#how" className="transition-colors hover:text-foreground/80">
            How&nbsp;it&nbsp;Works
          </Link>
          <Link href="#faq" className="transition-colors hover:text-foreground/80">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
}
