"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/data/experiences";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import SkillIcon from "@/components/shared/SkillIcon";
import { ArrowUpRight } from "lucide-react";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardElementsRef.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, i) => {
        // Direct scrubbed timeline for 100% rock-solid, jitter-free scroll in both directions
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1];

          gsap.to(card, {
            scale: 0.94,
            opacity: 0.92,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 85%",
              end: "top 25%",
              scrub: true,
            },
          });
        }

        // Smooth interactive mouse hover spotlight glow
        const glow = card.querySelector(".card-glow") as HTMLDivElement | null;
        if (glow) {
          const onMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(217,119,6,0.15), transparent 70%)`;
            glow.style.opacity = "1";
          };

          const onMouseLeave = () => {
            glow.style.opacity = "0";
          };

          card.addEventListener("mousemove", onMouseMove);
          card.addEventListener("mouseleave", onMouseLeave);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="experience" className="relative pt-24 sm:pt-32 pb-36 sm:pb-48">
      {/* ── 1. Reusable Editorial Section Header with Generous Spacing ── */}
      <div className="mb-16 sm:mb-24">
        <SectionHeader
          tag="[ 03 / CAREER & TRACK RECORD ]"
          title="Professional"
          titleSecondLine="Experience."
          stickerText="FROM 2021 — NOW"
          countBadge="04 Roles"
          description="Transforming complex business requirements into high-performance, elegant software systems and scalable enterprise architectures."
        />
      </div>

      {/* ── 2. Clean, Rock-Solid Sticky Stacking Card Deck Container ── */}
      <div
        ref={containerRef}
        className="relative space-y-10 sm:space-y-16"
      >
        {experiences.map((exp, index) => {
          const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

          // Split role into two lines for giant editorial title
          const roleParts = exp.role.split(" ");
          const line1 = roleParts[0];
          const line2 = roleParts.slice(1).join(" ") || "Developer";

          // Clear gap below navbar: starts at 7.75rem on desktop (6rem on mobile), stepped per card
          const stickyTopOffset = `calc(6.5rem + ${index * 2.25}rem)`;
          const isHovered = hoveredIdx === index;

          return (
            <div
              key={exp.id || index}
              ref={(el) => {
                cardElementsRef.current[index] = el;
              }}
              style={{
                top: stickyTopOffset,
                zIndex: index + 10,
              }}
              className="sticky transition-all duration-300"
            >
              <article className="group relative overflow-hidden rounded-2xl sm:rounded-3xl min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] p-7 sm:p-12 lg:p-14 border border-white/[0.12] bg-[#14110e] text-[#f2ede6] shadow-[0_25px_65px_rgba(0,0,0,0.5)] dark:shadow-[0_35px_80px_rgba(0,0,0,0.9)] hover:border-white/25 transition-all duration-300 flex flex-col justify-between">
                {/* Dynamic Mouse Cursor Glow */}
                <div
                  className="card-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"
                />

                {/* Ambient Index Watermark */}
                <div
                  className="absolute right-4 -top-2 sm:right-8 sm:-top-6 font-black text-6xl sm:text-8xl lg:text-9xl text-white/[0.035] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {formattedIndex}
                </div>

                {/* ── TOP ROW: Giant Two-Line Title + Clean Year & Meta ── */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
                  {/* Left: Headline & Company */}
                  <div>
                    <h3 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] text-[#ffffff] break-words">
                      <span className="block">{line1}</span>
                      <span className="block text-[#c7b89f]">{line2}</span>
                    </h3>
                    <a
                      href={exp.companyUrl || "#"}
                      target={exp.companyUrl ? "_blank" : undefined}
                      rel={exp.companyUrl ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 mt-2 sm:mt-3 text-sm sm:text-lg font-bold text-[#d97706] hover:text-[#fbbf24] transition-colors tracking-tight group/link"
                    >
                      <span>@ {exp.company}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>

                  {/* Right: Clean Year Badge & Location */}
                  <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs sm:text-sm text-[#9e958b]">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/[0.08] border border-white/10 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs">
                      {exp.isCurrent && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#827a72] mt-0.5 font-medium">
                      <span>{exp.location}</span>
                      <span>•</span>
                      <span>{exp.type}</span>
                    </div>
                  </div>
                </div>

                {/* ── MIDDLE ROW: Technology Stack Pill Stream ── */}
                <div className="relative z-10 my-6 sm:my-8 flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-medium">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-[#f2ede6] hover:bg-white/[0.09] hover:border-white/20 transition-all"
                    >
                      <SkillIcon name={tech} className="w-3.5 h-3.5" />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>

                {/* ── BOTTOM ROW: Narrative Summary & Key Highlights ── */}
                <div className="relative z-10 pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col lg:flex-row lg:items-start justify-between gap-5 sm:gap-8">
                  {/* Left Narrative */}
                  <div className="flex items-start gap-3 max-w-2xl">
                    <span className="text-base text-[#d97706] select-none leading-none mt-1">
                      ✦
                    </span>
                    <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-[#a8a096] font-normal">
                      {exp.description}
                    </p>
                  </div>

                  {/* Right Key Deliverables */}
                  <div className="flex flex-col gap-2 shrink-0 max-w-md">
                    {exp.responsibilities.slice(0, 2).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-[#d4c3b7] leading-relaxed"
                      >
                        <span className="text-[#d97706] font-bold mt-0.5 select-none">✦</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </Section>
  );
}