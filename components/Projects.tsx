"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ExternalLink,
  ArrowRight,
  ArrowUpRight,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillIcon from "@/components/shared/SkillIcon";
import { projects } from "@/data/projects";

export default function Projects() {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number | null>(0);
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

  // Responsive breakpoint check
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // GSAP ScrollTrigger Pinned Horizontal Movement Setup
  useEffect(() => {
    if (reducedMotion || isMobile || typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const pinWrapper = pinWrapperRef.current;
      const track = trackRef.current;
      const circle = circleRef.current;

      if (!pinWrapper || !track || !circle) return;

      // Initial visual states matching Screenshot 1:
      // A small circle dot in the top-left corner
      gsap.set(circle, { clipPath: "circle(20px at 40px 40px)" });
      gsap.set(track, { x: 0 });

      const getScrollDistance = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth);
      };

      // Total vertical scroll range calculated dynamically based on card track dimensions
      const totalScrollDistance = () => {
        return Math.max(window.innerHeight * 3.5, getScrollDistance() + window.innerHeight * 0.8);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "projects-horizontal-scroll",
          trigger: pinWrapper,
          start: "top top",
          end: () => `+=${totalScrollDistance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const prog = self.progress;
            // First 22% of progress is Panel 0 circle expanding;
            // Remaining 78% maps through project cards 0 to 7
            if (prog < 0.22) {
              setActiveIndex(0);
            } else {
              const cardProg = (prog - 0.22) / 0.78;
              const currentIdx = Math.min(
                projects.length - 1,
                Math.max(0, Math.floor(cardProg * projects.length))
              );
              setActiveIndex(currentIdx);
            }
          },
        },
      });

      // Stage 1: Circle expands from top-left corner over Panel 0 (Screenshots 1 -> 2 -> 3)
      tl.to(circle, {
        clipPath: "circle(150% at 0% 0%)",
        ease: "power1.inOut",
        duration: 1,
      });

      // Stage 2: Track translates horizontally to the left, revealing Project Cards (Screenshots 3 -> 4 -> 5)
      tl.to(
        track,
        {
          x: () => -getScrollDistance(),
          ease: "none",
          duration: 3.6,
        },
        "-=0.2" // Smooth organic overlap as circle reaches full expansion
      );
    });

    return () => {
      mm.revert();
    };
  }, [reducedMotion, isMobile]);

  // Smooth scroll jump to a specific project card
  const scrollToProject = useCallback(
    (targetIndex: number) => {
      if (typeof window === "undefined") return;
      const st = ScrollTrigger.getById("projects-horizontal-scroll");
      if (st && st.start !== undefined && st.end !== undefined) {
        const totalDist = st.end - st.start;
        const targetProgress = 0.24 + (targetIndex / projects.length) * 0.74;
        const targetScroll = st.start + targetProgress * totalDist;
        window.scrollTo({
          top: targetScroll + 2,
          behavior: "smooth",
        });
      } else {
        setActiveIndex(targetIndex);
      }
    },
    []
  );

  const handlePrev = useCallback(() => {
    const nextIdx = Math.max(0, activeIndex - 1);
    scrollToProject(nextIdx);
  }, [activeIndex, scrollToProject]);

  const handleNext = useCallback(() => {
    const nextIdx = Math.min(projects.length - 1, activeIndex + 1);
    scrollToProject(nextIdx);
  }, [activeIndex, scrollToProject]);

  return (
    <section
      id="projects"
      className="relative z-10 w-full overflow-hidden bg-accent text-accent-foreground scroll-mt-16 transition-colors duration-300"
    >
      {/* ── Accessible Reduced Motion Fallback ── */}
      {reducedMotion ? (
        <div className="mx-auto max-w-5xl px-4 sm:px-8 py-16 space-y-8">
          <div className="text-center mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              [ 02 / SELECTED WORKS ]
            </span>
            <h2 className="text-4xl font-black uppercase mt-2 text-foreground">
              OUR PROJECTS
            </h2>
          </div>
          {projects.map((project, idx) => (
            <article
              key={project.title}
              className="rounded-2xl border border-border bg-card text-card-foreground p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold uppercase text-primary">
                  PROJECT {(idx + 1).toString().padStart(2, "0")}
                </span>
                <span className="font-mono text-xs uppercase text-muted-foreground">
                  {project.category}
                </span>
              </div>
              <h3 className="font-mono text-xl sm:text-2xl font-bold text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
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
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-mono text-xs font-bold"
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
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border font-mono text-xs font-bold text-foreground"
                  >
                    <span>CODE REPO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : isMobile ? (
        /* ── Mobile Layout (Under 768px): Single Clean Header on Accent with Swipe Deck ── */
        <div className="w-full px-4 sm:px-6 py-12">
          {/* Single Project Section Header */}
          <div className="mb-6 px-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 font-mono text-xs font-bold tracking-widest text-primary uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>[ 02 / SELECTED WORKS ]</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-foreground leading-tight">
              OUR PROJECTS
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Interactive showcase featuring full-stack applications and enterprise software.
            </p>
          </div>

          {/* Scroll cue hint */}
          <div className="flex items-center justify-between pb-3 text-xs font-mono text-muted-foreground px-1">
            <span>SWIPE OR TAP TO EXPLORE</span>
            <span>{projects.length} PROJECTS</span>
          </div>

          {/* Touch-Friendly Horizontal Swipe Deck with Snap Points */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 scrollbar-none -mx-4 px-4">
            {projects.map((project, idx) => {
              const isCardActive = mobileActiveIndex === idx;
              const primaryUrl = project.liveUrl || project.githubUrl;

              return (
                <div
                  key={project.title}
                  onClick={() => setMobileActiveIndex(isCardActive ? null : idx)}
                  className={`relative flex-shrink-0 w-[84vw] max-w-[340px] snap-center rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between p-5 select-none ${
                    isCardActive
                      ? "bg-[#8b4513] text-white border-white/20 shadow-lg"
                      : "bg-card border-border text-card-foreground shadow-sm"
                  }`}
                >
                  <div>
                    {/* Header Strip */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-black/10 dark:border-white/10">
                      <span
                        className={`font-mono text-xs font-bold tracking-wider uppercase ${
                          isCardActive ? "text-white" : "text-primary"
                        }`}
                      >
                        PROJECT {(idx + 1).toString().padStart(2, "0")}
                      </span>
                      <span
                        className={`font-mono text-[10px] uppercase font-semibold truncate max-w-[150px] ${
                          isCardActive ? "text-white/80" : "text-muted-foreground"
                        }`}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`mt-3 font-mono text-lg font-bold uppercase leading-snug line-clamp-2 ${
                        isCardActive ? "text-white" : "text-foreground"
                      }`}
                    >
                      {project.title}
                    </h3>

                    {/* Preview Image */}
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden my-3 border border-black/10 dark:border-white/10 bg-slate-950">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="340px"
                        className="object-cover object-top"
                      />
                    </div>

                    {/* Description */}
                    <p
                      className={`text-xs leading-relaxed line-clamp-3 ${
                        isCardActive ? "text-white/90" : "text-muted-foreground"
                      }`}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Footer with Tech & Links */}
                  <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                            isCardActive
                              ? "bg-white/10 text-white border border-white/20"
                              : "bg-black/5 dark:bg-white/5 border border-border text-foreground"
                          }`}
                        >
                          <SkillIcon name={tech} className="w-2.5 h-2.5 shrink-0" />
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-mono text-xs font-bold uppercase shadow-xs ${
                              isCardActive
                                ? "bg-white text-[#8b4513]"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            <span>Live</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-mono text-xs font-bold uppercase border ${
                              isCardActive
                                ? "bg-white/15 text-white border-white/30"
                                : "bg-card border-border text-foreground"
                            }`}
                          >
                            <span>Code</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      {primaryUrl && (
                        <a
                          href={primaryUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                            isCardActive
                              ? "bg-white text-[#8b4513] border-white"
                              : "border-border text-foreground"
                          }`}
                          aria-label={`Open ${project.title}`}
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ── Full Desktop/Tablet Scroll-Linked Pinned Showcase (Single Header inside Panel 0) ── */
        <div
          ref={pinWrapperRef}
          className="relative w-full h-screen overflow-hidden bg-accent text-accent-foreground flex flex-col justify-between"
        >
          {/* Main Horizontal Sliding Track */}
          <div
            ref={trackRef}
            className="absolute top-0 left-0 flex h-full will-change-transform w-max select-none"
          >
            {/* ── Panel 0: Single Cinematic Project Header (Reference Screenshots 1, 2, 3) ── */}
            <div className="relative flex-shrink-0 w-screen h-full flex flex-col items-center justify-center p-6 sm:p-12 lg:p-20 overflow-hidden bg-accent">
              {/* Expanding Accent Circle that grows from top-left corner */}
              <div
                ref={circleRef}
                className="absolute inset-0 bg-[#8b4513]/10 dark:bg-[#8b4513]/25 transition-none pointer-events-none"
                style={{ clipPath: "circle(20px at 40px 40px)" }}
              />

              {/* Title Content */}
              <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/10 font-mono text-xs font-bold tracking-widest text-foreground uppercase mb-4 sm:mb-6 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>[ 02 / SELECTED WORKS ]</span>
                </div>

                <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-foreground leading-none drop-shadow-xs">
                  OUR PROJECTS
                </h2>

                <div className="mt-4 sm:mt-6 inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-primary text-primary-foreground font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md -rotate-2 select-none border border-black/10">
                  SCROLL-DRIVEN SHOWCASE • 08 WORKS
                </div>

                <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg font-medium text-muted-foreground max-w-xl leading-relaxed">
                  A continuous horizontal journey through full-stack systems, modern web
                  applications, and scalable platforms.
                </p>

                <div className="mt-8 sm:mt-10 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/10 font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                  <span>SCROLL DOWN TO ADVANCE CARDS</span>
                  <ArrowRight className="w-4 h-4 text-primary animate-pulse" />
                </div>
              </div>
            </div>

            {/* ── Panel 1..N: Individual Project Cards Track (Reference Screenshots 3, 4, 5) ── */}
            <div className="flex flex-shrink-0 h-full items-stretch">
              {projects.map((project, idx) => {
                const isHovered = hoveredCardIndex === idx;
                const primaryUrl = project.liveUrl || project.githubUrl;

                return (
                  <div
                    key={project.title}
                    onMouseEnter={() => setHoveredCardIndex(idx)}
                    onMouseLeave={() => setHoveredCardIndex(null)}
                    onClick={() => {
                      if (primaryUrl) {
                        window.open(primaryUrl, "_blank", "noreferrer");
                      }
                    }}
                    className="relative flex-shrink-0 w-[360px] sm:w-[410px] lg:w-[460px] xl:w-[490px] h-full border-r border-[#ebdcd0] dark:border-[#3d2a1e] flex flex-col justify-between py-12 sm:py-16 px-6 sm:px-8 lg:px-10 group overflow-hidden cursor-pointer bg-card transition-colors duration-300"
                  >
                    {/* Expanding Accent Circle on Individual Card Hover (Uses #8b4513 Accent) */}
                    <div
                      className="absolute inset-0 bg-[#8b4513] transition-[clip-path] duration-700 ease-in-out z-0 pointer-events-none [clip-path:circle(0%_at_0%_0%)] group-hover:[clip-path:circle(150%_at_0%_0%)]"
                      style={{
                        clipPath: isHovered
                          ? "circle(150% at 0% 0%)"
                          : undefined,
                      }}
                    />

                    {/* Floating Center Badge (from Spotlight screenshot) */}
                    <div
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white text-[#8b4513] shadow-[0_14px_45px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-all duration-300 pointer-events-none ${
                        isHovered
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                      }`}
                    >
                      <span>VIEW</span>
                      <span>PROJECT</span>
                      <ArrowUpRight className="w-3.5 h-3.5 mt-0.5 text-[#8b4513]" />
                    </div>

                    {/* Card Content Container */}
                    <div className="relative z-10 flex flex-col justify-between h-full min-h-0">
                      {/* Top Header Strip */}
                      <div>
                        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-black/10 dark:border-white/10 group-hover:border-white/20 transition-colors">
                          <span
                            className={`font-mono text-xs sm:text-[13px] font-bold uppercase tracking-widest transition-colors ${
                              isHovered ? "text-white" : "text-primary group-hover:text-white"
                            }`}
                          >
                            PROJECT {(idx + 1).toString().padStart(2, "0")}
                          </span>
                          <span
                            className={`font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors truncate max-w-[180px] ${
                              isHovered ? "text-white/80" : "text-muted-foreground group-hover:text-white/80"
                            }`}
                          >
                            {project.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className={`mt-4 sm:mt-5 font-mono text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight leading-snug line-clamp-2 transition-colors ${
                            isHovered ? "text-white" : "text-foreground group-hover:text-white"
                          }`}
                        >
                          {project.title}
                        </h3>

                        {/* Visual Image Preview */}
                        <div className="relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden my-4 sm:my-5 border border-black/10 dark:border-white/10 shadow-sm group-hover:border-white/30 group-hover:shadow-lg transition-all bg-slate-950">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 410px, 490px"
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Project Narrative Description */}
                        <p
                          className={`text-xs sm:text-sm leading-relaxed line-clamp-3 transition-colors ${
                            isHovered ? "text-white/90" : "text-muted-foreground group-hover:text-white/90"
                          }`}
                        >
                          {project.description}
                        </p>

                        {/* Core Highlight */}
                        {project.highlights?.[0] && (
                          <div
                            className={`mt-3 p-2.5 rounded-lg border transition-all ${
                              isHovered
                                ? "bg-white/10 border-white/20 text-white"
                                : "bg-black/5 dark:bg-white/5 border-border text-foreground group-hover:bg-white/10 group-hover:border-white/20 group-hover:text-white"
                            }`}
                          >
                            <p className="text-[11px] leading-relaxed line-clamp-2">
                              <span
                                className={`font-mono font-bold uppercase mr-1.5 ${
                                  isHovered ? "text-white" : "text-primary group-hover:text-white"
                                }`}
                              >
                                HIGHLIGHT:
                              </span>
                              <span>{project.highlights[0]}</span>
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Bottom Footer: Tech Pills & Action Buttons */}
                      <div className="pt-4 border-t border-black/10 dark:border-white/10 group-hover:border-white/20 transition-colors space-y-3 sm:space-y-4">
                        {/* Technology Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md font-mono text-[10px] sm:text-[11px] font-semibold border transition-all ${
                                isHovered
                                  ? "bg-white/10 text-white border-white/20"
                                  : "bg-black/5 dark:bg-white/5 border-border text-foreground group-hover:bg-white/10 group-hover:text-white group-hover:border-white/20"
                              }`}
                            >
                              <SkillIcon name={tech} className="w-3 h-3 shrink-0" />
                              <span>{tech}</span>
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span
                              className={`px-1.5 py-1 rounded font-mono text-[10px] ${
                                isHovered ? "text-white/70" : "text-muted-foreground group-hover:text-white/70"
                              }`}
                            >
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between gap-2 pt-1">
                          <div className="flex items-center gap-2">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer ${
                                  isHovered
                                    ? "bg-white text-[#8b4513] hover:bg-white/90 shadow-md"
                                    : "bg-primary text-primary-foreground group-hover:bg-white group-hover:text-[#8b4513] group-hover:shadow-md"
                                }`}
                              >
                                <Zap className="w-3.5 h-3.5 fill-current" />
                                <span>Demo</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider border transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                                  isHovered
                                    ? "bg-white/15 text-white border-white/30 hover:bg-white/25"
                                    : "bg-black/5 dark:bg-white/5 border-border text-foreground hover:bg-black/10 dark:hover:bg-white/10 group-hover:bg-white/15 group-hover:text-white group-hover:border-white/30"
                                }`}
                              >
                                <SkillIcon name="github" className="w-3.5 h-3.5 shrink-0" />
                                <span>Code</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>

                          {primaryUrl && (
                            <span
                              className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all group-hover:scale-110 shrink-0 ${
                                isHovered
                                  ? "bg-white text-[#8b4513] border-white shadow-xs"
                                  : "border-border text-foreground group-hover:bg-white group-hover:text-[#8b4513] group-hover:border-white group-hover:shadow-xs"
                              }`}
                            >
                              <ArrowUpRight className="w-4 h-4" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* ── Finale Card: Closing Banner at the End of the Track ── */}
              <div className="w-[340px] sm:w-[380px] lg:w-[420px] flex-shrink-0 h-full bg-[#8b4513] text-white flex flex-col justify-between p-8 sm:p-12 border-l border-white/15 select-none">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/70">
                  08 / 08 • COMPLETE SHOWCASE
                </div>

                <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white text-[#8b4513] shadow-xl flex flex-col items-center justify-center font-mono text-xs font-black uppercase tracking-wider">
                    <span>LET&apos;S</span>
                    <span>BUILD</span>
                    <ArrowRight className="w-4 h-4 mt-0.5 text-[#8b4513]" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    HAVE A PROJECT IN MIND?
                  </h3>

                  <p className="text-xs sm:text-sm text-white/85 max-w-xs leading-relaxed font-medium">
                    Let&apos;s build something high-impact and exceptional together.
                  </p>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#8b4513] font-mono text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-md active:scale-95"
                  >
                    <span>Get In Touch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="font-mono text-xs text-center text-white/60 uppercase tracking-widest">
                  Nuhamin Gulilat • Portfolio
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom Floating Kinetic Controls & Project Stepper Bar ── */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 px-4 sm:px-6 py-2 rounded-full border border-black/10 dark:border-white/10 bg-card/90 text-card-foreground backdrop-blur-md shadow-xl flex items-center gap-3 sm:gap-4 max-w-[92vw]">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-primary">
              <span>PROJECT {(activeIndex + 1).toString().padStart(2, "0")}</span>
              <span className="text-muted-foreground">/ 08</span>
            </div>

            <span className="text-border hidden sm:inline">•</span>

            {/* Interactive Jump Buttons */}
            <div className="hidden sm:flex items-center gap-1">
              {projects.map((p, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={p.title}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToProject(idx);
                    }}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs scale-105"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label={`Jump to project ${idx + 1}`}
                  >
                    {(idx + 1).toString().padStart(2, "0")}
                  </button>
                );
              })}
            </div>

            <span className="text-border">•</span>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer text-foreground"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === projects.length - 1}
                className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer text-foreground"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}