"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ExternalLink,
  ChevronUp,
  ChevronDown,
  CheckSquare,
  Box,
  ShoppingBag,
  Sparkles,
  GraduationCap,
  HeartPulse,
  Store,
  Building2,
  Zap,
  ArrowUp,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import SkillIcon from "@/components/shared/SkillIcon";
import { projects } from "@/data/projects";

interface ProjectVisualTheme {
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowBorder: string;
  glowBoxShadow: string;
  badgeBg: string;
  badgeText: string;
  pulseDot: string;
  statLabel: string;
  statValue: string;
  chartPath: string;
  chipLabel: string;
}

const PROJECT_THEMES: Record<number, ProjectVisualTheme> = {
  0: {
    icon: CheckSquare,
    accentColor: "emerald",
    glowBorder: "border-emerald-500/50 dark:border-emerald-400/50",
    glowBoxShadow: "shadow-[0_0_35px_rgba(16,185,129,0.22)]",
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-400/15 border-emerald-500/30",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    pulseDot: "bg-emerald-500 dark:bg-emerald-400",
    statLabel: "Active Sessions",
    statValue: "157 Tasks Active",
    chartPath: "M0 18 Q 15 6, 30 16 T 60 10 T 100 4",
    chipLabel: "Session Auth • SQLite",
  },
  1: {
    icon: Box,
    accentColor: "cyan",
    glowBorder: "border-cyan-500/50 dark:border-cyan-400/50",
    glowBoxShadow: "shadow-[0_0_35px_rgba(6,182,212,0.22)]",
    badgeBg: "bg-cyan-500/10 dark:bg-cyan-400/15 border-cyan-500/30",
    badgeText: "text-cyan-700 dark:text-cyan-300",
    pulseDot: "bg-cyan-500 dark:bg-cyan-400",
    statLabel: "3D Pipeline",
    statValue: "Next.js & WebGL",
    chartPath: "M0 16 Q 20 4, 45 18 T 75 6 T 100 12",
    chipLabel: "3D Asset Marketplace",
  },
  2: {
    icon: ShoppingBag,
    accentColor: "amber",
    glowBorder: "border-amber-500/50 dark:border-amber-400/50",
    glowBoxShadow: "shadow-[0_0_35px_rgba(245,158,11,0.22)]",
    badgeBg: "bg-amber-500/10 dark:bg-amber-400/15 border-amber-500/30",
    badgeText: "text-amber-700 dark:text-amber-300",
    pulseDot: "bg-amber-500 dark:bg-amber-400",
    statLabel: "Checkout Flow",
    statValue: "< 120ms Latency",
    chartPath: "M0 20 Q 25 8, 45 16 T 70 4 T 100 2",
    chipLabel: "Scalable Frontend",
  },
  3: {
    icon: Sparkles,
    accentColor: "purple",
    glowBorder: "border-purple-500/50 dark:border-purple-400/50",
    glowBoxShadow: "shadow-[0_0_35px_rgba(168,85,247,0.22)]",
    badgeBg: "bg-purple-500/10 dark:bg-purple-400/15 border-purple-500/30",
    badgeText: "text-purple-700 dark:text-purple-300",
    pulseDot: "bg-purple-500 dark:bg-purple-400",
    statLabel: "Booking Workflow",
    statValue: "Mobile-First UX",
    chartPath: "M0 15 Q 30 20, 55 5 T 80 12 T 100 4",
    chipLabel: "Dynamic Routing",
  },
  4: {
    icon: GraduationCap,
    accentColor: "rose",
    glowBorder: "border-rose-500/50 dark:border-rose-400/50",
    glowBoxShadow: "shadow-[0_0_35px_rgba(244,63,94,0.22)]",
    badgeBg: "bg-rose-500/10 dark:bg-rose-400/15 border-rose-500/30",
    badgeText: "text-rose-700 dark:text-rose-300",
    pulseDot: "bg-rose-500 dark:bg-rose-400",
    statLabel: "Enterprise DB",
    statValue: "Dataverse & Liquid",
    chartPath: "M0 22 Q 25 10, 50 18 T 75 4 T 100 8",
    chipLabel: "Power Pages System",
  },
  5: {
    icon: HeartPulse,
    accentColor: "teal",
    glowBorder: "border-teal-500/50 dark:border-teal-400/50",
    glowBoxShadow: "shadow-[0_0_35px_rgba(20,184,166,0.22)]",
    badgeBg: "bg-teal-500/10 dark:bg-teal-400/15 border-teal-500/30",
    badgeText: "text-teal-700 dark:text-teal-300",
    pulseDot: "bg-teal-500 dark:bg-teal-400",
    statLabel: "Diagnostic Flow",
    statValue: "Pathology Reports",
    chartPath: "M0 16 Q 20 2, 40 18 T 70 8 T 100 14",
    chipLabel: "Clinical Java System",
  },
  6: {
    icon: Store,
    accentColor: "blue",
    glowBorder: "border-blue-500/50 dark:border-blue-400/50",
    glowBoxShadow: "shadow-[0_0_35px_rgba(59,130,246,0.22)]",
    badgeBg: "bg-blue-500/10 dark:bg-blue-400/15 border-blue-500/30",
    badgeText: "text-blue-700 dark:text-blue-300",
    pulseDot: "bg-blue-500 dark:bg-blue-400",
    statLabel: "Automated Tests",
    statValue: "Cypress E2E",
    chartPath: "M0 14 Q 25 18, 45 4 T 75 10 T 100 2",
    chipLabel: "Multi-Tenant SaaS",
  },
  7: {
    icon: Building2,
    accentColor: "orange",
    glowBorder: "border-orange-500/50 dark:border-orange-400/50",
    glowBoxShadow: "shadow-[0_0_35px_rgba(249,115,22,0.22)]",
    badgeBg: "bg-orange-500/10 dark:bg-orange-400/15 border-orange-500/30",
    badgeText: "text-orange-700 dark:text-orange-300",
    pulseDot: "bg-orange-500 dark:bg-orange-400",
    statLabel: "HR & Finance",
    statValue: "Redux Architecture",
    chartPath: "M0 20 Q 30 6, 50 16 T 80 4 T 100 8",
    chipLabel: "Enterprise ERP",
  },
};

export default function Projects() {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const cardPanelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // GSAP ScrollTrigger Stacked Animation
  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardPanelsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0 || !pinWrapperRef.current) return;

      // Initial card placements:
      // Project 1 is fully centered and visible in the showcase viewport.
      // Projects 2..N are positioned below the visible showcase area (yPercent: 105%),
      // ready to enter from the bottom boundary.
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { yPercent: 0, scale: 1, opacity: 1 });
        } else {
          gsap.set(card, { yPercent: 105, scale: 0.96, opacity: 0.35 });
        }
      });

      // Pin the showcase container and drive the timeline directly from scroll progress
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "projects-scroll-trigger",
          trigger: pinWrapperRef.current,
          start: "top top+=72",
          end: () => `+=${(cards.length - 1) * 650}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const prog = self.progress;
            const currentIdx = Math.min(
              cards.length - 1,
              Math.max(0, Math.round(prog * (cards.length - 1)))
            );
            if (currentIdx !== activeIndexRef.current) {
              activeIndexRef.current = currentIdx;
              setActiveIndex(currentIdx);
            }
          },
        },
      });

      // Build sequential scroll-driven transitions:
      // For each step i from 0 to N-2:
      // 1. Outgoing project i moves upward (yPercent: 0 -> -105%) and disappears behind the top edge
      // 2. Incoming project i+1 rises from bottom (yPercent: 105% -> 0) and takes over the primary position
      for (let i = 0; i < cards.length - 1; i++) {
        // Outgoing project exits out the top clipping boundary
        tl.to(
          cards[i],
          {
            yPercent: -105,
            scale: 0.92,
            opacity: 0.15,
            ease: "power1.inOut",
            duration: 1,
          },
          i
        );

        // Incoming project enters from below the bottom clipping boundary
        tl.to(
          cards[i + 1],
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            ease: "power1.inOut",
            duration: 1,
          },
          i
        );
      }
    }, pinWrapperRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  // Smooth jump to specific project
  const scrollToProject = useCallback((targetIndex: number) => {
    if (typeof window === "undefined") return;
    const st = ScrollTrigger.getById("projects-scroll-trigger");
    if (st && st.start !== undefined && st.end !== undefined) {
      const scrollRange = st.end - st.start;
      const targetScroll =
        st.start + (targetIndex / (projects.length - 1)) * scrollRange;
      window.scrollTo({
        top: targetScroll + 2,
        behavior: "smooth",
      });
    } else {
      setActiveIndex(targetIndex);
    }
  }, []);

  const handlePrev = useCallback(() => {
    const nextIdx = Math.max(0, activeIndex - 1);
    scrollToProject(nextIdx);
  }, [activeIndex, scrollToProject]);

  const handleNext = useCallback(() => {
    const nextIdx = Math.min(projects.length - 1, activeIndex + 1);
    scrollToProject(nextIdx);
  }, [activeIndex, scrollToProject]);

  return (
    <Section id="projects" className="relative z-10 w-full py-10 sm:py-16">
      {/* ── Section Header ── */}
      <SectionHeader
        tag="[ 02 / SELECTED WORKS ]"
        title="Kinetic"
        titleSecondLine="Projects."
        stickerText="SCROLL-DRIVEN SHOWCASE"
        countBadge={projects.length}
        description="Vertical kinetic flow featuring full-stack applications, enterprise platforms, and interactive software engineered with precision."
      />

      {/* ── Reduced Motion Fallback (Accessible standard vertical list) ── */}
      {reducedMotion ? (
        <div className="space-y-8 max-w-5xl mx-auto">
          {projects.map((project, idx) => {
            const theme = PROJECT_THEMES[idx] || PROJECT_THEMES[0];
            const ThemeIcon = theme.icon;
            return (
              <article
                key={project.title}
                className={`rounded-2xl border ${theme.glowBorder} bg-white/95 dark:bg-[#0c121e]/95 p-6 sm:p-8 shadow-md`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <ThemeIcon className={`w-5 h-5 ${theme.badgeText}`} />
                  <span className="font-mono text-xs font-bold uppercase text-slate-500">
                    PROJECT {(idx + 1).toString().padStart(2, "0")} • {project.category}
                  </span>
                </div>
                <h3 className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 font-mono text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8b4513] dark:bg-[#b45309] text-white font-mono text-xs font-bold"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono text-xs font-bold"
                    >
                      <span>CODE REPO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* ── Full Scroll-Driven Pinned Kinetic Showcase ── */
        <div ref={pinWrapperRef} className="relative w-full max-w-6xl mx-auto">
          {/* ── Studio Window Header (Inspired by Option 4 Reference Image) ── */}
          <div className="px-4 sm:px-6 py-3 border border-b-0 border-[#8b4513]/25 dark:border-white/10 bg-stone-100/90 dark:bg-[#0f1420]/95 backdrop-blur-md rounded-t-2xl sm:rounded-t-3xl flex items-center justify-between">
            {/* Left: Window Control Dots */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
              </div>
              <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 hidden sm:inline">
                OPTION 04: THE INFINITE KINETIC FLOW
              </span>
            </div>

            {/* Center: Kinetic Live Beacon */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8b4513] dark:bg-[#b45309] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8b4513] dark:bg-[#b45309]" />
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8b4513] dark:text-[#e09045]">
                SCROLL-DRIVEN STACK
              </span>
            </div>

            {/* Right: Active Project Index */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                {(activeIndex + 1).toString().padStart(2, "0")} /{" "}
                {projects.length.toString().padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* ── Main Showcase Viewport: Physical Clipping Window ── */}
          <div className="relative w-full h-[580px] sm:h-[620px] lg:h-[640px] overflow-hidden rounded-b-2xl sm:rounded-b-3xl border border-[#8b4513]/25 dark:border-white/10 bg-stone-50/90 dark:bg-[#070b12]/95 backdrop-blur-2xl shadow-2xl">
            {/* Ambient Background Grid & Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(#8b4513_1px,transparent_1px)] dark:bg-[radial-gradient(#38bdf8_1px,transparent_1px)] opacity-[0.04] [background-size:20px_20px] pointer-events-none" />

            {/* Stacked Project Panels */}
            {projects.map((project, idx) => {
              const theme = PROJECT_THEMES[idx] || PROJECT_THEMES[0];
              const ThemeIcon = theme.icon;
              const isCurrent = idx === activeIndex;

              return (
                <div
                  key={project.title}
                  ref={(el) => {
                    cardPanelsRef.current[idx] = el;
                  }}
                  className={`absolute inset-0 w-full h-full p-3 sm:p-5 lg:p-7 flex items-center justify-center will-change-transform ${
                    isCurrent ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                  style={{
                    zIndex: 10 + idx * 5,
                  }}
                >
                  {/* Project Card Element */}
                  <div
                    className={`w-full h-full max-w-5xl rounded-2xl sm:rounded-3xl border-2 ${theme.glowBorder} ${theme.glowBoxShadow} bg-white/95 dark:bg-[#0d131f]/95 backdrop-blur-xl p-4 sm:p-6 lg:p-8 flex flex-col justify-between overflow-hidden relative transition-all duration-300`}
                  >
                    {/* Top Header Strip inside Card */}
                    <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-black/10 dark:border-white/10 w-full shrink-0">
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-xl ${theme.badgeBg} border ${theme.glowBorder} flex items-center justify-center shrink-0`}
                        >
                          <ThemeIcon
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.badgeText}`}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              PROJECT {(idx + 1).toString().padStart(2, "0")}
                            </span>
                            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">
                              •
                            </span>
                            <span
                              className={`font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider ${theme.badgeText} truncate`}
                            >
                              {project.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Live Feature Badge */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText} border`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${theme.pulseDot} animate-pulse`}
                          />
                          <span className="hidden sm:inline">
                            {theme.chipLabel}
                          </span>
                          <span className="sm:hidden">LIVE</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Body: 2 Columns on Desktop */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center flex-1 my-2 sm:my-4 min-h-0">
                      {/* Left Column: Metadata & Actions (7 Columns) */}
                      <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-2 sm:space-y-3.5">
                        <div>
                          <h3 className="font-mono text-base sm:text-xl lg:text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-snug">
                            {project.title}
                          </h3>

                          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 sm:line-clamp-3">
                            {project.description}
                          </p>

                          {project.highlights && project.highlights[0] && (
                            <div className="mt-2.5 hidden sm:flex items-start gap-2 p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                              <span
                                className={`font-mono text-xs font-bold ${theme.badgeText} shrink-0`}
                              >
                                CORE:
                              </span>
                              <p className="text-xs text-slate-700 dark:text-slate-200 leading-normal line-clamp-2">
                                {project.highlights[0]}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Tech Stack Pills */}
                        <div>
                          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5">
                            TECHNOLOGY STACK
                          </div>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {project.technologies.slice(0, 5).map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono text-[10px] sm:text-[11px] text-slate-800 dark:text-slate-200"
                              >
                                <SkillIcon
                                  name={tech}
                                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0"
                                />
                                <span>{tech}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider uppercase text-white ${
                                theme.accentColor === "emerald"
                                  ? "bg-emerald-600 hover:bg-emerald-500"
                                  : theme.accentColor === "cyan"
                                  ? "bg-cyan-600 hover:bg-cyan-500"
                                  : theme.accentColor === "amber"
                                  ? "bg-amber-600 hover:bg-amber-500"
                                  : theme.accentColor === "purple"
                                  ? "bg-purple-600 hover:bg-purple-500"
                                  : theme.accentColor === "rose"
                                  ? "bg-rose-600 hover:bg-rose-500"
                                  : theme.accentColor === "teal"
                                  ? "bg-teal-600 hover:bg-teal-500"
                                  : theme.accentColor === "blue"
                                  ? "bg-blue-600 hover:bg-blue-500"
                                  : "bg-orange-600 hover:bg-orange-500"
                              } shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer`}
                            >
                              <Zap className="w-3.5 h-3.5 fill-current" />
                              <span>LIVE DEMO</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : project.githubUrl ? (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
                            >
                              <SkillIcon
                                name="github"
                                className="w-4 h-4 shrink-0"
                              />
                              <span>VIEW SOURCE</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs text-slate-500 dark:text-slate-400 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 uppercase">
                              Enterprise Core System
                            </span>
                          )}

                          {project.githubUrl && project.liveUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-700 dark:text-slate-200 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/15 transition-all duration-200 active:scale-95 cursor-pointer"
                            >
                              <SkillIcon
                                name="github"
                                className="w-4 h-4 shrink-0"
                              />
                              <span>CODE REPO</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Right Column: Visual Data Feed & Live Screenshot (5 Columns) */}
                      <div className="lg:col-span-5 relative w-full h-40 sm:h-56 lg:h-full min-h-[170px] sm:min-h-[220px] lg:min-h-[260px] flex items-center justify-center">
                        <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border border-black/15 dark:border-white/15 bg-slate-950 shadow-xl group">
                          {/* Mini Browser Bar */}
                          <div className="px-3 py-1 border-b border-white/10 bg-slate-900/90 flex items-center justify-between z-10 relative">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-green-500/80 inline-block" />
                            </div>
                            <span className="font-mono text-[9px] text-slate-400 truncate max-w-[140px]">
                              {project.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.app
                            </span>
                          </div>

                          {/* Screenshot */}
                          <div className="relative w-full h-[calc(100%-21px)] overflow-hidden">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 40vw"
                              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                          </div>

                          {/* Floating Live Data Widget (Option 4 Data Card Reproduction) */}
                          <div className="absolute bottom-2.5 right-2.5 p-2 sm:p-2.5 rounded-xl bg-slate-900/95 dark:bg-black/90 border border-white/20 backdrop-blur-md shadow-2xl flex flex-col gap-1 z-20 max-w-[150px] sm:max-w-[180px]">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                                {theme.statLabel}
                              </span>
                              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            </div>
                            <div className="font-mono text-[11px] sm:text-xs font-black text-white">
                              {theme.statValue}
                            </div>
                            <svg
                              className="w-full h-3.5 sm:h-4 text-emerald-400 overflow-visible"
                              viewBox="0 0 100 24"
                              fill="none"
                            >
                              <path
                                d={theme.chartPath}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Kinetic Navigation Bar ── */}
          <div className="mt-4 px-3 sm:px-6 py-2.5 rounded-xl border border-[#8b4513]/20 dark:border-white/10 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
            {/* Left: Scroll Cue */}
            <div className="flex items-center gap-2 font-mono text-xs text-slate-600 dark:text-slate-400">
              <ArrowUp className="w-3.5 h-3.5 animate-bounce text-[#8b4513] dark:text-[#e09045]" />
              <span>SCROLL DOWN TO ADVANCE STACK</span>
            </div>

            {/* Center: Interactive Project Stepper */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
              {projects.map((p, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={p.title}
                    onClick={() => scrollToProject(idx)}
                    type="button"
                    className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#8b4513] dark:bg-[#b45309] text-white shadow-sm scale-105"
                        : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400"
                    }`}
                    aria-label={`Jump to project ${idx + 1}: ${p.title}`}
                  >
                    {(idx + 1).toString().padStart(2, "0")}
                  </button>
                );
              })}
            </div>

            {/* Right: Prev/Next Quick Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="p-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer text-slate-700 dark:text-slate-300"
                aria-label="Previous project"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === projects.length - 1}
                className="p-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer text-slate-700 dark:text-slate-300"
                aria-label="Next project"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}