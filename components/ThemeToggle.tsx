"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-8 sm:h-9 w-16 sm:w-[70px] rounded-full border border-black/10 dark:border-white/10 bg-[#ede4d8] dark:bg-[#1a120c] animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="relative inline-flex items-center">
      {/* ── Volumetric Downward Light Cascade (Moonlight Beam) ── */}
      <div
        className={`absolute top-full -right-2 w-32 sm:w-40 h-28 sm:h-36 pointer-events-none transition-all duration-700 ${
          isDark
            ? "opacity-90 scale-100"
            : "opacity-0 scale-75 pointer-events-none"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at 70% 0%, rgba(243, 201, 143, 0.45) 0%, rgba(147, 197, 253, 0.25) 30%, rgba(96, 165, 250, 0.08) 60%, transparent 80%)",
          filter: "blur(12px)",
          transformOrigin: "top right",
        }}
      />

      <button
        onClick={toggleTheme}
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        title={isDark ? "Switch to light theme" : "Switch to dark theme"}
        className="group relative flex items-center w-[64px] sm:w-[70px] h-[32px] sm:h-[34px] p-[3px] rounded-full cursor-pointer select-none transition-transform duration-200 hover:scale-[1.04] active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[#8b4513] dark:focus-visible:ring-[#d97706]"
      >
        {/* ── 1. Capsule Track Background with Enhanced Visibility ── */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-500 border overflow-hidden ${
            isDark
              ? "border-[#3a281c] bg-[#140d08] shadow-[inset_0_2px_5px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.06)]"
              : "border-[#d8c7b5] bg-gradient-to-r from-[#faebd7] via-[#f5deb3] to-[#e8cda8] shadow-[inset_0_2px_4px_rgba(139,69,19,0.18),0_1px_2px_rgba(0,0,0,0.06)]"
          }`}
        >
          {/* Night Mode: Warm Cosmic Micro-Stars */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
              isDark ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="absolute left-2.5 top-2.5 w-[3px] h-[3px] bg-[#f3c98f] rounded-full opacity-90 animate-pulse" />
            <span className="absolute left-5 bottom-2.5 w-[2px] h-[2px] bg-[#ece6da] rounded-full opacity-70" />
            <span className="absolute left-7 top-3.5 w-[2.5px] h-[2.5px] bg-[#fde68a] rounded-full opacity-80" />
            <span className="absolute left-3.5 bottom-4 w-[1.5px] h-[1.5px] bg-[#93c5fd] rounded-full opacity-60" />
          </div>

          {/* Light Mode: Warm Minimalist Daytime Glow */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
              isDark ? "opacity-0" : "opacity-100"
            }`}
          >
            <span className="absolute right-2 top-1.5 w-6 h-6 bg-[#ea580c]/15 rounded-full blur-[3px]" />
            <span className="absolute right-4 bottom-1 w-4 h-4 bg-[#f59e0b]/20 rounded-full blur-[2px]" />
          </div>
        </div>

        {/* ── 2. Sliding 3D Thumb (Sun & Moon) ── */}
        <div
          className={`relative z-10 flex items-center justify-center w-[26px] sm:w-[28px] h-[26px] sm:h-[28px] rounded-full transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isDark
              ? "translate-x-[32px] sm:translate-x-[36px] bg-[#ece6da] text-[#140e0a] shadow-[0_3px_10px_rgba(0,0,0,0.7),0_0_12px_rgba(243,201,143,0.45)]"
              : "translate-x-0 bg-[#ffffff] text-[#8b4513] shadow-[0_3px_10px_rgba(139,69,19,0.25),0_0_10px_rgba(245,158,11,0.3)]"
          }`}
        >
          {/* Crescent Moon (Dark Mode) */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isDark
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-50 pointer-events-none"
            }`}
          >
            <svg
              className="w-4 h-4 text-[#1a120c]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </div>

          {/* Minimalist Radiant Sun (Light Mode) */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              !isDark
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 rotate-90 scale-50 pointer-events-none"
            }`}
          >
            <svg
              className="w-4 h-4 text-[#8b4513]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="4.5" fill="#8b4513" />
              <line x1="12" y1="2" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22" />
              <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
              <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
              <line x1="2" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
              <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}
