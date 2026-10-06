"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardElementsRef.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, i) => {
        const cardInner = card.querySelector(".card-3d-inner") as HTMLDivElement | null;
        const cardGlow = card.querySelector(".card-3d-glow") as HTMLDivElement | null;

        // 1. GSAP ScrollTrigger for 3D Perspective Stacking on Scroll (using rotationX & z)
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1];

          ScrollTrigger.create({
            trigger: nextCard,
            start: "top 85%",
            end: "top 20%",
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress;
              // Smooth, pronounced 3D spatial transformation into Z-axis
              const scale = 1 - progress * 0.055;
              const opacity = 1 - progress * 0.2;
              const rotationX = progress * 6; // 6deg backwards 3D tilt
              const z = progress * -80;
              const y = progress * -16;

              gsap.to(card, {
                scale,
                opacity,
                rotationX,
                z,
                y,
                transformOrigin: "center top",
                duration: 0.1,
                ease: "none",
                overwrite: "auto",
              });
            },
          });
        }

        // 2. 100% Warning-Free 3D Parallax Mouse Tilt via Native CSS & Smooth Animation
        if (cardInner) {
          let reqId: number | null = null;
          let targetRx = 0;
          let targetRy = 0;
          let currentRx = 0;
          let currentRy = 0;

          const updateTilt = () => {
            currentRx += (targetRx - currentRx) * 0.12;
            currentRy += (targetRy - currentRy) * 0.12;

            cardInner.style.transform = `perspective(1000px) rotateX(${currentRx}deg) rotateY(${currentRy}deg)`;

            if (Math.abs(targetRx - currentRx) > 0.01 || Math.abs(targetRy - currentRy) > 0.01) {
              reqId = requestAnimationFrame(updateTilt);
            } else {
              reqId = null;
            }
          };

          const onMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
            const relY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

            targetRy = relX * 12; // -6 to 6 deg
            targetRx = -relY * 12; // -6 to 6 deg

            if (!reqId) {
              reqId = requestAnimationFrame(updateTilt);
            }

            // Move ambient specular sheen
            if (cardGlow) {
              const glowX = (relX + 0.5) * 100;
              const glowY = (relY + 0.5) * 100;
              cardGlow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.08) 0%, transparent 65%)`;
              cardGlow.style.opacity = "1";
            }
          };

          const onMouseLeave = () => {
            targetRx = 0;
            targetRy = 0;
            if (!reqId) {
              reqId = requestAnimationFrame(updateTilt);
            }
            if (cardGlow) {
              cardGlow.style.opacity = "0";
            }
          };

          card.addEventListener("mousemove", onMouseMove);
          card.addEventListener("mouseleave", onMouseLeave);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="experience" className="relative pt-12 pb-36 sm:pb-48">
      {/* ── 1. Reusable Editorial Section Header ── */}
      <SectionHeader
        tag="[ 03 / CAREER & TRACK RECORD ]"
        title="Professional"
        titleSecondLine="Experience."
        stickerText="FROM 2021 — NOW"
        countBadge="04 Roles"
        description="Transforming complex business requirements into high-performance, elegant software systems and scalable enterprise architectures."
      />

      {/* ── 2. 3D Perspective Card Deck Container ── */}
      <div
        ref={containerRef}
        className="relative space-y-12 sm:space-y-16 [perspective:1400px] [transform-style:preserve-3d]"
      >
        {experiences.map((exp, index) => {
          const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

          // Split role into two lines for giant editorial title
          const roleParts = exp.role.split(" ");
          const line1 = roleParts[0];
          const line2 = roleParts.slice(1).join(" ") || "Developer";

          // Breathing room below navbar (4.5rem start on mobile, 7rem on sm+, step gap)
          const stickyTopOffset = `calc(4.5rem + ${index * 1.75}rem)`;

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
              className="sticky will-change-transform [transform-style:preserve-3d]"
            >
              {/* 3D Card Inner Wrapper with Parallax Tilt */}
              <article className="card-3d-inner group relative overflow-hidden rounded-[1.8rem] sm:rounded-[3rem] p-5 sm:p-10 lg:p-14 border border-white/[0.14] border-t-2 border-t-white/[0.3] bg-[#14110e] text-[#f2ede6] shadow-[0_30px_70px_rgba(0,0,0,0.6)] dark:shadow-[0_45px_100px_rgba(0,0,0,0.95)] hover:border-white/25 transition-colors [transform-style:preserve-3d] flex flex-col justify-between">
                {/* Dynamic Specular Sheen Glow on 3D Tilt */}
                <div
                  className="card-3d-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 rounded-[1.8rem] sm:rounded-[3rem]"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 65%)",
                  }}
                />

                {/* Subtle Ambient Index Watermark */}
                <div
                  className="absolute right-4 -top-4 sm:right-6 sm:-top-10 font-black text-6xl sm:text-8xl lg:text-[11rem] text-white/[0.025] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {formattedIndex}
                </div>

                {/* ── TOP ROW: Giant Two-Line Title + Clean Year & Meta (with 3D pop) ── */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6 [transform:translateZ(20px)]">
                  {/* Left: Giant Two-Line Headline */}
                  <div>
                    <h3 className="text-2xl xs:text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] sm:leading-[0.98] text-[#ffffff] break-words">
                      <span className="block">{line1}</span>
                      <span className="block text-[#827a72]">{line2}</span>
                    </h3>
                    <a
                      href={exp.companyUrl || "#"}
                      target={exp.companyUrl ? "_blank" : undefined}
                      rel={exp.companyUrl ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 mt-2 sm:mt-4 text-sm sm:text-xl font-bold text-[#c7b89f] hover:text-[#ffffff] transition-colors tracking-tight group/link"
                    >
                      <span>@ {exp.company}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c7b89f] group-hover/link:text-[#ffffff] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>

                  {/* Right: Clean Year Badge & Location */}
                  <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs sm:text-sm text-[#9e958b]">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/[0.08] border border-white/10 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-white font-bold text-[11px] sm:text-sm tracking-wide shadow-xs">
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

                {/* ── MIDDLE ROW: Single Unified Technology Stack Pill Stream (with 3D pop) ── */}
                <div className="relative z-10 my-4 sm:my-7 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-medium text-[#b5aba0] [transform:translateZ(15px)]">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-medium text-[#f2ede6] hover:bg-white/[0.09] hover:border-white/20 transition-all"
                    >
                      <SkillIcon name={tech} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>

                {/* ── BOTTOM ROW: Narrative Summary & Key Engineering Highlights (with 3D pop) ── */}
                <div className="relative z-10 pt-4 sm:pt-7 border-t border-white/[0.08] flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6 [transform:translateZ(10px)]">
                  {/* Left Narrative */}
                  <div className="flex items-start gap-2.5 sm:gap-3 max-w-2xl">
                    <span className="text-lg sm:text-xl text-[#c7b89f] select-none leading-none mt-0.5">
                      ✦
                    </span>
                    <p className="text-xs sm:text-base leading-relaxed text-[#a8a096] font-normal">
                      {exp.description}
                    </p>
                  </div>

                  {/* Right Key Deliverable Highlights */}
                  <div className="flex flex-col gap-1.5 sm:gap-2 shrink-0 max-w-md">
                    {exp.responsibilities.slice(0, 2).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-[11px] sm:text-sm text-[#d4c3b7] leading-relaxed"
                      >
                        <span className="text-[#c7b89f] font-bold mt-0.5 select-none">✦</span>
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