"use client";

import React, { useEffect, useState, useCallback } from "react";

// ── Diverse, high-impact full-stack code snippets ──────────────────────────
interface CodeSnippet {
  tag: string;
  category: string;
  lines: string[];
}

const SNIPPETS: CodeSnippet[] = [
  {
    tag: "engine/physics.ts",
    category: "PHYSICS",
    lines: [
      "function solvePendulum(angle, length, dt) {",
      "  const gravity = 9.81 * 80;",
      "  const alpha = (-gravity / length) * Math.sin(angle);",
      "  return velocity + alpha * dt * 0.985;",
      "}",
    ],
  },
  {
    tag: "audio/synthesizer.ts",
    category: "SYNTH",
    lines: [
      "const osc = audioCtx.createOscillator();",
      "osc.type = 'triangle';",
      "osc.frequency.setValueAtTime(440, audioCtx.currentTime);",
      "gainNode.gain.exponentialRampToValueAtTime(0.001, 0.4);",
    ],
  },
  {
    tag: "NuhaminGulilat.ts",
    category: "CORE",
    lines: [
      "const engineer: FullStack = {",
      "  name: 'Nuhamin Gulilat',",
      "  experience: '4+ Years Engineering',",
      "  craft: ['Next.js 16', 'TypeScript', 'Node.js'],",
      "  status: 'crafting high-performance web ✦',",
      "};",
    ],
  },
  {
    tag: "api/pipeline/route.ts",
    category: "SERVER",
    lines: [
      "export async function POST(req: Request) {",
      "  const session = await verifyAuth(req);",
      "  const stream = await createEdgeStream(session.user);",
      "  return new Response(stream, { headers: CORS });",
      "}",
    ],
  },
  {
    tag: "hooks/useMotion.ts",
    category: "ANIM",
    lines: [
      "export function useScrollTimeline(target) {",
      "  gsap.timeline({ scrollTrigger: {",
      "    trigger: target, start: 'top 85%', scrub: 0.5",
      "  }}).to(target, { y: 0, opacity: 1 });",
      "}",
    ],
  },
  {
    tag: "terminal/deploy.sh",
    category: "DEVOPS",
    lines: [
      "$ pnpm test:e2e && pnpm build",
      "✓ 48 test suites passed in 1.4s",
      "✦ Deployment live: edge latency 24ms",
    ],
  },
  {
    tag: "db/schema.prisma",
    category: "DATA",
    lines: [
      "model Experience {",
      "  id        String   @id @default(uuid())",
      "  role      String",
      "  stack     String[]",
      "  verified  Boolean  @default(true)",
      "}",
    ],
  },
  {
    tag: "state/store.ts",
    category: "STATE",
    lines: [
      "export const useStore = create((set) => ({",
      "  theme: 'dark',",
      "  activeSection: 'about',",
      "  setTheme: (t) => set({ theme: t }),",
      "}));",
    ],
  },
];

// ── Organic Coordinate Zones (Spaced across safe background negative space) ──
interface PositionZone {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

const POSITION_ZONES: PositionZone[] = [
  // 0: Top Left margin
  { top: "12%", left: "3.5%", right: "auto", bottom: "auto" },
  // 1: Mid-Upper Right margin
  { top: "18%", right: "3%", left: "auto", bottom: "auto" },
  // 2: Middle Left open space
  { top: "45%", left: "2.5%", right: "auto", bottom: "auto" },
  // 3: Middle Right outer margin
  { top: "52%", right: "2.5%", left: "auto", bottom: "auto" },
  // 4: Lower Left margin
  { bottom: "16%", left: "3%", right: "auto", top: "auto" },
  // 5: Lower Right margin
  { bottom: "14%", right: "3.5%", left: "auto", top: "auto" },
  // 6: Upper Center-Right
  { top: "28%", right: "8%", left: "auto", bottom: "auto" },
  // 7: Lower Center-Left
  { bottom: "26%", left: "6%", right: "auto", top: "auto" },
];

interface StreamState {
  id: string;
  blockIdx: number;
  posIdx: number;
  currentLine: number;
  currentChar: number;
  phase: "typing" | "line_pause" | "complete_pause" | "fading_out";
  pauseTicks: number;
  opacity: number;
}

export default function CodeBgAnimation() {
  const [mounted, setMounted] = useState(false);

  // 3 Autonomous concurrent floating streams
  const [streams, setStreams] = useState<StreamState[]>([
    {
      id: "stream-alpha",
      blockIdx: 0,
      posIdx: 0, // Top-Left
      currentLine: 0,
      currentChar: 0,
      phase: "typing",
      pauseTicks: 0,
      opacity: 1,
    },
    {
      id: "stream-beta",
      blockIdx: 2,
      posIdx: 1, // Top-Right
      currentLine: 0,
      currentChar: 0,
      phase: "line_pause",
      pauseTicks: 16, // Staggered entry
      opacity: 0,
    },
    {
      id: "stream-gamma",
      blockIdx: 4,
      posIdx: 4, // Lower-Left
      currentLine: 0,
      currentChar: 0,
      phase: "line_pause",
      pauseTicks: 32, // Staggered entry
      opacity: 0,
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe random position picker preventing overlaps between active streams
  const pickNewPosition = useCallback((usedPositions: number[]): number => {
    const available = POSITION_ZONES.map((_, i) => i).filter(
      (idx) => !usedPositions.includes(idx)
    );
    if (available.length === 0) return Math.floor(Math.random() * POSITION_ZONES.length);
    return available[Math.floor(Math.random() * available.length)];
  }, []);

  // Smooth typing tick: 60ms per character
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setStreams((prev) => {
        const usedPos = prev.map((s) => s.posIdx);

        return prev.map((stream) => {
          const block = SNIPPETS[stream.blockIdx];

          // 1. Line pause before next line
          if (stream.phase === "line_pause") {
            if (stream.pauseTicks > 0) {
              return { ...stream, pauseTicks: stream.pauseTicks - 1 };
            }
            return {
              ...stream,
              currentLine: stream.currentLine + 1,
              currentChar: 0,
              phase: "typing",
              opacity: 1,
            };
          }

          // 2. Typing characters one by one
          if (stream.phase === "typing") {
            const line = block.lines[stream.currentLine];
            if (!line && line !== "") {
              return {
                ...stream,
                phase: "complete_pause",
                pauseTicks: 55, // ~3.3s hold
              };
            }

            if (stream.currentChar < line.length) {
              return {
                ...stream,
                currentChar: stream.currentChar + 1,
                opacity: 1,
              };
            } else {
              if (stream.currentLine + 1 < block.lines.length) {
                return {
                  ...stream,
                  phase: "line_pause",
                  pauseTicks: 4, // Brief pause between lines
                };
              } else {
                return {
                  ...stream,
                  phase: "complete_pause",
                  pauseTicks: 55, // ~3.3s hold
                };
              }
            }
          }

          // 3. Complete pause: hold on screen
          if (stream.phase === "complete_pause") {
            if (stream.pauseTicks > 0) {
              return { ...stream, pauseTicks: stream.pauseTicks - 1 };
            }
            return {
              ...stream,
              phase: "fading_out",
              pauseTicks: 20, // ~1.2s fade out
              opacity: 0,
            };
          }

          // 4. Fading out: pick fresh random position and new snippet
          if (stream.phase === "fading_out") {
            if (stream.pauseTicks > 0) {
              return { ...stream, pauseTicks: stream.pauseTicks - 1 };
            }

            const nextPos = pickNewPosition(usedPos.filter((p) => p !== stream.posIdx));
            const nextBlock = (stream.blockIdx + 1 + Math.floor(Math.random() * (SNIPPETS.length - 1))) % SNIPPETS.length;

            return {
              ...stream,
              blockIdx: nextBlock,
              posIdx: nextPos,
              currentLine: 0,
              currentChar: 0,
              phase: "line_pause",
              pauseTicks: 8,
              opacity: 0,
            };
          }

          return stream;
        });
      });
    }, 60);

    return () => clearInterval(interval);
  }, [mounted, pickNewPosition]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden hidden md:block"
    >
      {streams.map((stream) => {
        const block = SNIPPETS[stream.blockIdx];
        const currentPos = POSITION_ZONES[stream.posIdx] || POSITION_ZONES[0];

        return (
          <div
            key={stream.id}
            style={{
              position: "fixed",
              ...currentPos,
              width: "350px",
              maxWidth: "calc(100vw - 32px)",
              opacity: stream.opacity,
              transform:
                stream.opacity === 1 ? "translateY(0px)" : "translateY(-8px)",
              transition:
                "opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
              fontFamily:
                "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
              fontSize: "11px",
              lineHeight: 1.75,
              whiteSpace: "pre",
            }}
          >
            {/* Architectural Snippet Tag Header */}
            <div className="code-backdrop-header text-[10px] mb-1.5 tracking-wider flex items-center gap-2">
              <span className="code-backdrop-dot w-1.5 h-1.5 rounded-full" />
              <span className="font-bold opacity-80">{block.tag}</span>
              <span className="text-[8.5px] uppercase px-1.5 py-0.2 rounded border border-current opacity-40 font-mono">
                {block.category}
              </span>
            </div>

            {/* Code Lines with Line Numbers & Caret */}
            <div className="flex flex-col">
              {block.lines.map((line, li) => {
                const isPastLine = li < stream.currentLine;
                const isCurrentLine = li === stream.currentLine;
                const isFutureLine = li > stream.currentLine;

                if (isFutureLine) return null;

                const displayedChars = isPastLine
                  ? line
                  : line.slice(0, stream.currentChar);

                return (
                  <div
                    key={li}
                    className="flex items-center code-backdrop-text"
                    style={{ minHeight: "1.75em" }}
                  >
                    {/* Line number */}
                    <span
                      className="select-none opacity-30 text-right pr-2.5 text-[9.5px] inline-block font-mono"
                      style={{ width: "18px" }}
                    >
                      {String(li + 1).padStart(2, "0")}
                    </span>

                    {/* Line text */}
                    <span>{displayedChars}</span>

                    {/* Smooth blinking caret */}
                    {isCurrentLine && stream.phase !== "fading_out" && (
                      <span
                        className="code-backdrop-caret"
                        style={{
                          display: "inline-block",
                          width: "2px",
                          height: "12px",
                          background: "currentColor",
                          marginLeft: "2px",
                          verticalAlign: "middle",
                          animation:
                            "ambientCaretBlink 0.9s ease-in-out infinite",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Scoped Ambient Styling */}
      <style>{`
        /* Light mode: delicate warm terracotta/sepia code watermark */
        .code-backdrop-text,
        .code-backdrop-header {
          color: #78350f;
          opacity: 0.22;
          font-weight: 500;
          letter-spacing: 0.01em;
        }
        .code-backdrop-dot {
          background-color: #8b4513;
        }

        /* Dark mode: delicate warm bronze/gold glow */
        .dark .code-backdrop-text,
        .dark .code-backdrop-header {
          color: #d4a373;
          opacity: 0.18;
          font-weight: 450;
        }
        .dark .code-backdrop-dot {
          background-color: #d97706;
        }

        @keyframes ambientCaretBlink {
          0%, 100% { opacity: 0.9; }
          50%      { opacity: 0.15; }
        }
      `}</style>
    </div>
  );
}
