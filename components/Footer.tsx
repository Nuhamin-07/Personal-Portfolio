"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Token {
  text: string;
  color: string;
  bold?: boolean;
}

interface CodeLineItem {
  tokens: Token[];
}

const IDE_CODE_LINES: CodeLineItem[] = [
  {
    tokens: [
      { text: "const ", color: "#c084fc", bold: true },
      { text: "Nuhamin", color: "#60a5fa", bold: true },
      { text: ": ", color: "#e2e8f0" },
      { text: "Developer", color: "#f9a8d4" },
      { text: " = {", color: "#e2e8f0" },
    ],
  },
  {
    tokens: [
      { text: "  location", color: "#e2e8f0" },
      { text: ": ", color: "#e2e8f0" },
      { text: "'Addis Ababa, Ethiopia'", color: "#86efac" },
      { text: ",", color: "#e2e8f0" },
    ],
  },
  {
    tokens: [
      { text: "  timezone", color: "#e2e8f0" },
      { text: ": ", color: "#e2e8f0" },
      { text: "'UTC+3 (Global Remote)'", color: "#86efac" },
      { text: ",", color: "#e2e8f0" },
    ],
  },
  {
    tokens: [
      { text: "  craft", color: "#e2e8f0" },
      { text: ": [", color: "#e2e8f0" },
      { text: "'React'", color: "#86efac" },
      { text: ", ", color: "#e2e8f0" },
      { text: "'Next.js'", color: "#86efac" },
      { text: ", ", color: "#e2e8f0" },
      { text: "'TypeScript'", color: "#86efac" },
      { text: "],", color: "#e2e8f0" },
    ],
  },
  {
    tokens: [
      { text: "  status", color: "#e2e8f0" },
      { text: ": ", color: "#e2e8f0" },
      { text: "'ready to ship ✦'", color: "#fb923c", bold: true },
      { text: ",", color: "#e2e8f0" },
    ],
  },
  {
    tokens: [{ text: "};", color: "#e2e8f0" }],
  },
];

function lineFullText(line: CodeLineItem): string {
  return line.tokens.map((t) => t.text).join("");
}

function renderTokensUpTo(tokens: Token[], count: number) {
  let remaining = count;
  return tokens.map((tok, i) => {
    if (remaining <= 0) return null;
    const slice = tok.text.slice(0, remaining);
    remaining -= tok.text.length;
    return (
      <span
        key={i}
        style={{ color: tok.color }}
        className={tok.bold ? "font-semibold" : undefined}
      >
        {slice}
      </span>
    );
  });
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  // Live typing state for the black IDE box
  const [typingState, setTypingState] = useState({
    lineIdx: 0,
    charIdx: 0,
    isComplete: false,
  });

  // Typing animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTypingState((prev) => {
        if (prev.isComplete) return prev;

        const currentLine = IDE_CODE_LINES[prev.lineIdx];
        if (!currentLine) {
          return { ...prev, isComplete: true };
        }

        const fullLen = lineFullText(currentLine).length;

        if (prev.charIdx < fullLen) {
          return { ...prev, charIdx: prev.charIdx + 1 };
        } else {
          if (prev.lineIdx + 1 < IDE_CODE_LINES.length) {
            return {
              ...prev,
              lineIdx: prev.lineIdx + 1,
              charIdx: 0,
            };
          } else {
            return { ...prev, isComplete: true };
          }
        }
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // When complete, pause for 5 seconds and smoothly replay
  useEffect(() => {
    if (!typingState.isComplete) return;

    const timer = setTimeout(() => {
      setTypingState({
        lineIdx: 0,
        charIdx: 0,
        isComplete: false,
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [typingState.isComplete]);

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-col",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="w-full bg-[#fdfbf7] dark:bg-[#0c0805] text-[#1c140e] dark:text-[#faf6f0] border-t border-[#1c140e]/10 dark:border-white/10 pt-16 sm:pt-24 pb-12 sm:pb-16 font-sans transition-colors relative z-40 overflow-hidden"
    >
      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
        {/* ── TOP SECTION: SITEMAP, SOCIALS, DEVELOPER INFO ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16 items-start">
          {/* Column 1: SITEMAP */}
          <div className="footer-col md:col-span-3 flex flex-col">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8b4513] dark:text-[#d97706] uppercase mb-4 sm:mb-6">
              SITEMAP
            </span>
            <ul className="space-y-2.5 sm:space-y-3">
              {[
                { name: "Home", href: "#hero" },
                { name: "About", href: "#about" },
                { name: "Works", href: "#projects" },
                { name: "Experience", href: "#experience" },
                { name: "Skills", href: "#skills" },
                { name: "Midnight Lab", href: "#playground" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="inline-block text-base sm:text-lg font-medium text-[#1c140e]/80 dark:text-[#faf6f0]/80 hover:text-[#8b4513] dark:hover:text-[#d97706] transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: SOCIALS */}
          <div className="footer-col md:col-span-3 flex flex-col">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8b4513] dark:text-[#d97706] uppercase mb-4 sm:mb-6">
              CONNECT
            </span>
            <ul className="space-y-2.5 sm:space-y-3">
              {[
                {
                  name: "LinkedIn",
                  href: "https://www.linkedin.com/in/nuhamin-gulilat-66635318b/",
                },
                {
                  name: "GitHub",
                  href: "https://github.com/Nuhamin-07",
                },
                {
                  name: "Telegram",
                  href: "https://t.me/Nuhamin_07",
                },
                {
                  name: "Curriculum Vitae",
                  href: "/cv/Nuhamin-Gulilat-CV.pdf",
                },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-block text-base sm:text-lg font-medium text-[#1c140e]/80 dark:text-[#faf6f0]/80 hover:text-[#8b4513] dark:hover:text-[#d97706] transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: DEVELOPER INFO — LIVE TYPING Code Console */}
          <div className="footer-col md:col-span-6 flex flex-col max-w-full overflow-hidden">
            <span className="text-xs font-bold tracking-[0.2em] text-[#8b4513] dark:text-[#d97706] uppercase mb-4 sm:mb-6">
              DEVELOPER INFO
            </span>

            {/* Sleek Dark IDE Card */}
            <div className="rounded-2xl border border-[#1c140e]/15 dark:border-white/15 bg-[#14110e] text-[#faf4ed] p-4 sm:p-5 font-mono shadow-xl transition-all duration-300 max-w-full overflow-x-auto">
              {/* Traffic Lights & Tab header */}
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[11px] sm:text-xs text-neutral-400 font-sans tracking-wider">
                  nuhamin.developer.ts
                </span>
              </div>

              {/* Code lines */}
              <div className="space-y-1 sm:space-y-1.5 text-xs sm:text-[13.5px] leading-[1.75] select-text min-h-[140px] overflow-x-auto">
                {IDE_CODE_LINES.map((line, li) => {
                  const isPastLine = li < typingState.lineIdx;
                  const isCurrentLine = li === typingState.lineIdx;
                  const isFutureLine = li > typingState.lineIdx;

                  if (isFutureLine) return null;

                  const charCount = isPastLine
                    ? lineFullText(line).length
                    : typingState.charIdx;

                  return (
                    <div
                      key={li}
                      className="flex items-center whitespace-pre"
                      style={{ minHeight: "1.75em" }}
                    >
                      <span>{renderTokensUpTo(line.tokens, charCount)}</span>

                      {/* Blinking cursor */}
                      {isCurrentLine && !typingState.isComplete && (
                        <span
                          className="inline-block w-[2px] h-[14px] bg-[#d97706] ml-1 align-middle shrink-0"
                          style={{
                            animation: "ideCursorBlink 0.9s ease-in-out infinite",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Terminal quick action */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2 text-xs font-sans">
                <a
                  href="/cv/Nuhamin-Gulilat-CV.pdf"
                  download="Nuhamin-Gulilat-CV.pdf"
                  className="inline-flex items-center gap-2 text-[#d97706] hover:underline transition-colors py-0.5 text-xs font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span>Download Curriculum Vitae (PDF)</span>
                  <span>→</span>
                </a>
                <span className="text-[10px] text-neutral-500">UTC+3</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM COPYRIGHT BAR ── */}
        <div className="border-t border-[#1c140e]/10 dark:border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#1c140e]/60 dark:text-[#faf6f0]/60">
          <div>
            © {currentYear} Nuhamin Gulilat. All rights reserved.
          </div>
          <div>
            Crafted with React, Next.js &amp; Tailwind CSS
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ideCursorBlink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
      `}</style>
    </footer>
  );
}
