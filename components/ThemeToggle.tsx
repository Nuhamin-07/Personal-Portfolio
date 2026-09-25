"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-24 rounded-full border border-border bg-card/60 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-primary/60 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} mode`}
      title={`Current: ${isDark ? "Dark Blue-Black" : "Light"} mode. Click to toggle.`}
    >
      {isDark ? (
        <>
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-sky-500/20 text-sky-400">
            🌙
          </span>
          <span>Dark</span>
        </>
      ) : (
        <>
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
            ☀️
          </span>
          <span>Light</span>
        </>
      )}
    </button>
  );
}


