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
          // Reached end of line
          if (prev.lineIdx + 1 < IDE_CODE_LINES.length) {
            return {
              ...prev,
              lineIdx: prev.lineIdx + 1,
              charIdx: 0,
            };
          } else {
            // Finished all lines: hold then reset
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
      // 1. Staggered reveal of top section columns & items
      gsap.fromTo(
        ".footer-col",
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Black IDE Box entrance with smooth back ease
      gsap.fromTo(
        ".footer-ide-card",
        { scale: 0.93, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: ".footer-ide-card",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // 3. Metadata divider line expansion
      gsap.fromTo(
        ".footer-divider-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".footer-divider-line",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // 4. Giant 100% width NUHAMIN vector reveal from below
      gsap.fromTo(
        ".footer-giant-svg",
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".footer-giant-svg",
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );

      // 5. Bottom bar & capsule button reveal
      gsap.fromTo(
        ".footer-bottom-bar",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-bottom-bar",
            start: "top 96%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="w-full bg-white dark:bg-[#0c0805] text-[#140e0a] dark:text-[#faf6f0] border-t border-[#140e0a]/10 dark:border-white/10 pt-20 sm:pt-28 pb-10 sm:pb-14 transition-colors relative z-40 overflow-hidden"
    >
      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-[1550px] mx-auto">
        {/* ── TOP SECTION: SITEMAP, SOCIALS, EXPANDED LIVE TYPING BLACK IDE, LET'S WORK TOGETHER ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-20 sm:pb-28 items-start">
          {/* Column 1: SITEMAP */}
          <div className="footer-col md:col-span-3 flex flex-col">
            <span className="text-xs font-mono tracking-[0.22em] text-[#140e0a]/50 dark:text-[#faf6f0]/50 uppercase mb-6 sm:mb-8 font-semibold">
              SITEMAP
            </span>
            <ul className="space-y-3.5 sm:space-y-4">
              {[
                { name: "Home", href: "#hero" },
                { name: "Works", href: "#projects" },
                { name: "Experience", href: "#experience" },
                { name: "Skills", href: "#skills" },
                { name: "About", href: "#about" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="group relative inline-flex items-center text-xl sm:text-2xl lg:text-[1.65rem] font-semibold tracking-tight text-[#140e0a] dark:text-[#faf6f0] hover:text-[#8b4513] dark:hover:text-[#d97706] transition-colors duration-300"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      {item.name}
                    </span>
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#8b4513] dark:bg-[#d97706] transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: SOCIALS */}
          <div className="footer-col md:col-span-3 flex flex-col">
            <span className="text-xs font-mono tracking-[0.22em] text-[#140e0a]/50 dark:text-[#faf6f0]/50 uppercase mb-6 sm:mb-8 font-semibold">
              SOCIALS
            </span>
            <ul className="space-y-3.5 sm:space-y-4">
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
                  name: "Email",
                  href: "mailto:nuhamin.gulilat.7@gmail.com",
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
                    className="group relative inline-flex items-center text-xl sm:text-2xl lg:text-[1.65rem] font-semibold tracking-tight text-[#140e0a] dark:text-[#faf6f0] hover:text-[#8b4513] dark:hover:text-[#d97706] transition-colors duration-300"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      {item.name}
                    </span>
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#8b4513] dark:bg-[#d97706] transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: DEVELOPER INFO — LIVE TYPING Black IDE Box */}
          <div className="footer-col md:col-span-4 lg:col-span-4 flex flex-col">
            <span className="text-xs font-mono tracking-[0.22em] text-[#140e0a]/50 dark:text-[#faf6f0]/50 uppercase mb-6 sm:mb-8 font-semibold">
              DEVELOPER INFO
            </span>

            {/* Enlarged Sleek Black IDE Card */}
            <div className="footer-ide-card rounded-2xl border border-[#2a1d15] bg-[#140d08] text-[#faf4ed] p-5 sm:p-6 font-mono shadow-2xl transition-all duration-300 hover:border-[#8b4513] hover:shadow-[0_16px_40px_rgba(139,69,19,0.25)] group">
              {/* Traffic Lights & Tab header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#2a1d15]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs text-[#a89587] font-mono tracking-wider">
                  nuhamin.developer.ts
                </span>
              </div>

              {/* Code lines — Smooth Live Typing with Caret */}
              <div className="space-y-2 text-sm sm:text-[14.5px] leading-[1.85] font-mono select-text min-h-[175px]">
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
                      className="flex items-center"
                      style={{ minHeight: "1.85em" }}
                    >
                      <span>{renderTokensUpTo(line.tokens, charCount)}</span>

                      {/* Blinking amber cursor on the active line */}
                      {isCurrentLine && !typingState.isComplete && (
                        <span
                          className="inline-block w-[2px] h-[15px] bg-[#d97706] ml-1 align-middle"
                          style={{
                            animation: "ideCursorBlink 0.9s ease-in-out infinite",
                            boxShadow: "0 0 8px rgba(217, 119, 6, 0.8)",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Terminal quick action */}
              <div className="mt-4 pt-3.5 border-t border-[#2a1d15] flex items-center justify-between text-xs">
                <a
                  href="/cv/Nuhamin-Gulilat-CV.pdf"
                  download="Nuhamin-Gulilat-CV.pdf"
                  className="inline-flex items-center gap-2 font-mono text-[#d97706] hover:text-[#fbbf24] transition-colors py-1"
                >
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="font-semibold">$ download --resume.pdf</span>
                  <span className="transition-transform group-hover:translate-x-1.5">→</span>
                </a>
                <span className="text-[11px] text-[#a89587]">UTF-8</span>
              </div>
            </div>
          </div>

          {/* Column 4: LET'S WORK TOGETHER (Clean, bold, uncluttered) */}
          <div className="footer-col md:col-span-2 lg:col-span-2 flex md:justify-end items-start pt-3 md:pt-0">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-1.5 text-base sm:text-lg font-bold tracking-[0.15em] uppercase text-[#140e0a] dark:text-[#faf6f0] hover:text-[#8b4513] dark:hover:text-[#d97706] transition-colors duration-300 pb-1"
            >
              <span>LET&apos;S WORK TOGETHER</span>
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#140e0a] dark:bg-[#faf6f0] group-hover:bg-[#8b4513] dark:group-hover:bg-[#d97706] transition-colors duration-300" />
            </a>
          </div>
        </div>

        {/* ── METADATA BAR (Above the 100% full-width giant name) ── */}
        <div className="w-full">
          <div className="footer-divider-line w-full h-[1px] bg-[#140e0a]/10 dark:bg-white/10 mb-4 sm:mb-5" />
          <div className="flex items-center justify-between text-xs sm:text-sm font-mono tracking-[0.2em] text-[#140e0a]/45 dark:text-[#faf6f0]/45 uppercase pb-2">
            <span>FULL-STACK DEVELOPER / SOFTWARE ENGINEER</span>
            <span>PORTFOLIO {currentYear}</span>
          </div>
        </div>

        {/* ── 100% FULL-WIDTH REFINED ARCHITECTURAL TYPOGRAPHY: NUHAMIN ── */}
        <div className="w-full select-none py-2 sm:py-3 overflow-hidden">
          <svg
            viewBox="0 0 1000 160"
            className="footer-giant-svg w-full h-auto block"
            preserveAspectRatio="none"
            aria-label="NUHAMIN"
          >
            <text
              x="0"
              y="140"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              className="fill-[#140e0a] dark:fill-[#faf6f0] hover:fill-[#8b4513] dark:hover:fill-[#d97706] transition-all duration-500 cursor-default"
              style={{
                fontFamily:
                  "var(--font-sans), 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                fontSize: "180px",
              }}
            >
              NUHAMIN
            </text>
          </svg>
        </div>

        {/* ── BOTTOM CREDITS & ICONIC CAPSULE BACK-TO-TOP BUTTON (Image 2) ── */}
        <div className="footer-bottom-bar flex flex-col-reverse sm:flex-row items-center justify-between gap-6 border-t border-[#140e0a]/10 dark:border-white/10 pt-8 sm:pt-10 text-xs sm:text-sm font-mono text-[#140e0a]/45 dark:text-[#faf6f0]/45">
          {/* Left: Copyright */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="font-bold text-[#140e0a] dark:text-[#faf6f0] tracking-wider uppercase">
              INFOS &amp; CREDITS
            </span>
            <span className="opacity-40">•</span>
            <span>© {currentYear} NUHAMIN GULILAT. ALL RIGHTS RESERVED.</span>
          </div>

          {/* Right: Capsule "Go to top" button with rich brown hover */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold tracking-widest uppercase text-[#140e0a] dark:text-[#faf6f0]">
              BACK TO TOP
            </span>
            <button
              onClick={scrollToTop}
              type="button"
              aria-label="Scroll to top"
              className="group relative flex items-center justify-center w-9 h-18 sm:w-10 sm:h-20 rounded-full border border-[#140e0a] dark:border-[#faf6f0] hover:border-[#8b4513] hover:bg-[#8b4513] dark:hover:border-[#d97706] dark:hover:bg-[#d97706] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden bg-transparent"
            >
              {/* Arrow slider on hover */}
              <div className="flex flex-col items-center justify-center transition-transform duration-300 group-hover:-translate-y-8">
                {/* Default Arrow */}
                <svg
                  className="w-4 h-4 text-[#140e0a] dark:text-[#faf6f0] group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>

                {/* Second Arrow entering on hover */}
                <svg
                  className="w-4 h-4 text-white mt-4 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </div>
            </button>
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
