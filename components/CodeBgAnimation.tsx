"use client";

import { useEffect, useState } from "react";

// ── Concise, high-impact full-stack code snippets ──────────────────────────
interface CodeSnippet {
  tag: string;
  lines: string[];
}

const SNIPPETS: CodeSnippet[] = [
  {
    tag: "// NuhaminGulilat.ts",
    lines: [
      "const engineer: FullStack = {",
      "  name: 'Nuhamin Gulilat',",
      "  role: 'Full-Stack Developer',",
      "  years: 4, // production experience",
      "  stack: ['React', 'Next.js', 'TS', 'Node'],",
      "  status: 'building scalable web ✦',",
      "};",
    ],
  },
  {
    tag: "// api/projects/route.ts",
    lines: [
      "export async function GET() {",
      "  const works = await db.project.findMany({",
      "    where: { shipped: true },",
      "    orderBy: { impact: 'desc' },",
      "  });",
      "  return Response.json(works);",
      "}",
    ],
  },
  {
    tag: "// terminal: deploy.sh",
    lines: [
      "$ git commit -m 'feat: clean architecture'",
      "$ pnpm test:e2e && pnpm build",
      "✓ 48 test suites passed (Cypress)",
      "✦ Live at nuhamin.dev [32ms edge]",
    ],
  },
  {
    tag: "// enterprise/dataverse.ts",
    lines: [
      "export async function syncDataverse(batch) {",
      "  const client = createClient({ retry: 3 });",
      "  return await client.upsert(batch);",
      "}",
    ],
  },
  {
    tag: "// hooks/useMotion.ts",
    lines: [
      "export function useSmoothMotion() {",
      "  useEffect(() => {",
      "    gsap.from('.hero-cta', { y: 20, opacity: 0 });",
      "  }, []);",
      "}",
    ],
  },
  {
    tag: "// config/stack.ts",
    lines: [
      "export const stack = {",
      "  web:    ['Next.js 16', 'React 19', 'TS'],",
      "  server: ['Node.js', 'Express', 'Prisma'],",
      "  cloud:  ['Vercel', 'Docker', 'AWS'],",
      "};",
    ],
  },
];

// ── Left-side positions (Middle-Low & Lower margins, clear of the top headline) ──
const LEFT_POSITIONS: React.CSSProperties[] = [
  // 0: Middle-Low Left (Below CTA buttons, in open negative space)
  { top: "58%", left: "3.5%", right: "auto", bottom: "auto" },
  // 1: Lower-Mid Left
  { top: "48%", left: "2.5%", right: "auto", bottom: "auto" },
  // 2: Bottom Left
  { bottom: "12%", left: "3%", right: "auto", top: "auto" },
];

// ── Right-side positions (Top-Right open corner & outer right margins) ─────
const RIGHT_POSITIONS: React.CSSProperties[] = [
  // 0: Top Right corner (open space above portrait, beside Contact CTA)
  { top: "8%", right: "2.5%", left: "auto", bottom: "auto" },
  // 1: Mid-Right outer margin
  { top: "38%", right: "2%", left: "auto", bottom: "auto" },
  // 2: Bottom Right outer margin
  { bottom: "14%", right: "2.5%", left: "auto", top: "auto" },
];

interface StreamState {
  id: string;
  side: "left" | "right";
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

  // Two balanced streams: Left starts in the Middle-Low area; Right starts in the Top-Right corner
  const [streams, setStreams] = useState<StreamState[]>([
    {
      id: "left-stream",
      side: "left",
      blockIdx: 0,
      posIdx: 0, // Left pos 0 is Middle-Low Left (top: 58%, left: 3.5%)
      currentLine: 0,
      currentChar: 0,
      phase: "typing",
      pauseTicks: 0,
      opacity: 1,
    },
    {
      id: "right-stream",
      side: "right",
      blockIdx: 2,
      posIdx: 0, // Right pos 0 is Top-Right corner (top: 8%, right: 2.5%)
      currentLine: 0,
      currentChar: 0,
      phase: "line_pause",
      pauseTicks: 28, // gentle stagger
      opacity: 0,
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth typing tick: 66ms per character
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setStreams((prev) =>
        prev.map((stream) => {
          const block = SNIPPETS[stream.blockIdx];
          const positions =
            stream.side === "right" ? RIGHT_POSITIONS : LEFT_POSITIONS;

          // 1. Line pause before advancing
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
              // Snippet complete
              return {
                ...stream,
                phase: "complete_pause",
                pauseTicks: 65, // ~4.3s hold
              };
            }

            if (stream.currentChar < line.length) {
              return {
                ...stream,
                currentChar: stream.currentChar + 1,
                opacity: 1,
              };
            } else {
              // End of line reached
              if (stream.currentLine + 1 < block.lines.length) {
                return {
                  ...stream,
                  phase: "line_pause",
                  pauseTicks: 5, // ~330ms pause between lines
                };
              } else {
                return {
                  ...stream,
                  phase: "complete_pause",
                  pauseTicks: 65, // ~4.3s hold
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
              pauseTicks: 22, // ~1.4s smooth fade out
              opacity: 0,
            };
          }

          // 4. Fading out: pick next position within its side and new snippet
          if (stream.phase === "fading_out") {
            if (stream.pauseTicks > 0) {
              return { ...stream, pauseTicks: stream.pauseTicks - 1 };
            }

            // Pick a different position within this side's pool
            const candidatePositions = positions
              .map((_, i) => i)
              .filter((i) => i !== stream.posIdx);
            const nextPos =
              candidatePositions[
                Math.floor(Math.random() * candidatePositions.length)
              ];

            // Pick next snippet
            const nextBlock =
              (stream.blockIdx +
                2 +
                Math.floor(Math.random() * (SNIPPETS.length - 2))) %
              SNIPPETS.length;

            return {
              ...stream,
              blockIdx: nextBlock,
              posIdx: nextPos,
              currentLine: 0,
              currentChar: 0,
              phase: "line_pause",
              pauseTicks: 10, // brief pause before starting new spot
              opacity: 0,
            };
          }

          return stream;
        })
      );
    }, 66);

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden hidden md:block"
    >
      {streams.map((stream) => {
        const block = SNIPPETS[stream.blockIdx];
        const positions =
          stream.side === "right" ? RIGHT_POSITIONS : LEFT_POSITIONS;
        const currentPos = positions[stream.posIdx];

        return (
          <div
            key={stream.id}
            style={{
              position: "fixed",
              ...currentPos,
              width: "330px",
              maxWidth: "calc(100vw - 32px)",
              opacity: stream.opacity,
              transform:
                stream.opacity === 1 ? "translateY(0px)" : "translateY(-10px)",
              transition:
                "opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
              fontFamily:
                "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
              fontSize: "11.5px",
              lineHeight: 1.7,
              whiteSpace: "pre",
            }}
          >
            {/* Subtle architectural tag header */}
            <div
              className="code-backdrop-text text-[10.5px] mb-1.5 tracking-wider opacity-80 flex items-center gap-1.5"
              style={{ fontStyle: "italic" }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "currentColor",
                  opacity: 0.65,
                }}
              />
              <span>{block.tag}</span>
            </div>

            {/* Code lines with elegant subtle line numbers */}
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
                    style={{ minHeight: "1.7em" }}
                  >
                    {/* Line number */}
                    <span
                      className="select-none opacity-30 text-right pr-3 text-[10px] font-mono inline-block"
                      style={{ width: "20px" }}
                    >
                      {String(li + 1).padStart(2, "0")}
                    </span>

                    {/* Line text */}
                    <span className="font-mono">{displayedChars}</span>

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

      {/* Scoped styling: subtle ambient watermark, under everything */}
      <style>{`
        /* Light mode: delicate warm terracotta watermark that never clashes with foreground text */
        .code-backdrop-text {
          color: #78350f;
          opacity: 0.22;
          font-weight: 500;
          letter-spacing: 0.015em;
        }

        /* Dark mode: delicate warm bronze glow */
        .dark .code-backdrop-text {
          color: #d4a373;
          opacity: 0.18;
          font-weight: 450;
        }

        @keyframes ambientCaretBlink {
          0%, 100% { opacity: 0.85; }
          50%      { opacity: 0.15; }
        }
      `}</style>
    </div>
  );
}
