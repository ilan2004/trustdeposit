"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * ThemeToggle toggles the `dark` class on the <html> element and
 * persists the choice to localStorage. It uses shadcn's Button.
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  // Hydration guard so icons match after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load saved theme on first render
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      {/* Light mode icon */}
      <Sun className="size-5 dark:hidden" />
      {/* Dark mode icon */}
      <Moon className="size-5 hidden dark:block" />
    </Button>
  );
}
