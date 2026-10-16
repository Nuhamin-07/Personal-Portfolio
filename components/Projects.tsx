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

  // GSAP ScrollTrigger Pinned Horizontal Movement Setup (Runs on all viewports)
  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const pinWrapper = pinWrapperRef.current;
    const track = trackRef.current;
    const circle = circleRef.current;

    if (!pinWrapper || !track || !circle) return;

    // Reset initial states: circle starts hidden at 0% in top-left corner
    gsap.set(circle, { clipPath: "circle(0% at 0% 0%)" });
    gsap.set(track, { x: 0 });

    const getScrollDistance = () => {
      return Math.max(0, track.scrollWidth - window.innerWidth);
    };

    // Total vertical scroll range calculated dynamically based on card track dimensions
    const totalScrollDistance = () => {
      return Math.max(
        window.innerHeight * 2.8,
        getScrollDistance() + window.innerHeight * 0.8
      );
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
          // First 25% of progress is Panel 0 accent circle expanding from left to right;
          // Remaining 75% maps through project cards 0 to 7
          if (prog < 0.25) {
            setActiveIndex(0);
          } else {
            const cardProg = (prog - 0.25) / 0.75;
            const currentIdx = Math.min(
              projects.length - 1,
              Math.max(0, Math.floor(cardProg * projects.length))
            );
            setActiveIndex(currentIdx);
          }
        },
      },
    });

    // Stage 1: Left-to-Right Accent Background Reveal over Panel 0 (Reference Screenshots 1-5)
    // The accent circle enters from top-left (0% 0%) and sweeps across the screen to the right
    tl.to(circle, {
      clipPath: "circle(180% at 0% 0%)",
      ease: "power1.inOut",
      duration: 1.2,
    });

    // Stage 2: Track translates horizontally to the left, revealing Project Cards
    tl.to(
      track,
      {
        x: () => -getScrollDistance(),
        ease: "none",
        duration: 3.8,
      },
      "-=0.15" // Smooth organic overlap as circle reaches full expansion
    );

    // Refresh ScrollTrigger when images or fonts load
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(refreshTimer);
      ScrollTrigger.getById("projects-horizontal-scroll")?.kill();
      tl.kill();
    };
  }, [reducedMotion]);

  // Smooth scroll jump to a specific project card
  const scrollToProject = useCallback(
    (targetIndex: number) => {
      if (typeof window === "undefined") return;
      const st = ScrollTrigger.getById("projects-horizontal-scroll");
      if (st && st.start !== undefined && st.end !== undefined) {
        const totalDist = st.end - st.start;
        const targetProgress = 0.26 + (targetIndex / projects.length) * 0.72;
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

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToProject(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < projects.length - 1) {
      scrollToProject(activeIndex + 1);
    }
  };

  return (
    <section
      id="projects"
      className="relative w-full bg-background text-foreground transition-colors overflow-x-clip"
    >
      {/* ── Accessible Reduced Motion Fallback (Vertical Responsive Grid) ── */}
      {reducedMotion ? (
        <div className="mx-auto max-w-5xl px-4 sm:px-8 py-16 space-y-8 bg-background text-foreground">
          {/* Header Panel */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-6xl font-black uppercase mt-3 text-foreground">
              PROJECTS
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
              A showcase of full-stack systems, modern web applications, and scalable platforms.
            </p>
          </div>

          {/* Project Cards (Title-only default, reveal on hover/tap) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => {
              const isHovered = hoveredCardIndex === idx;
              const primaryUrl = project.liveUrl || project.githubUrl;

              return (
                <div
                  key={project.title}
                  tabIndex={0}
                  onMouseEnter={() => setHoveredCardIndex(idx)}
                  onMouseOver={() => setHoveredCardIndex(idx)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                  onFocus={() => setHoveredCardIndex(idx)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      setHoveredCardIndex(null);
                    }
                  }}
                  onClick={() => {
                    setHoveredCardIndex(hoveredCardIndex === idx ? null : idx);
                  }}
                  className={`relative rounded-2xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden project-card transition-colors duration-300 min-h-[460px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary ${isHovered ? "is-hovered" : ""
                    }`}
                  aria-label={`${project.title} - Click to toggle details`}
                >
                  <div
                    className={`project-card-accent-bg ${isHovered ? "is-active" : ""
                      }`}
                    style={{
                      clipPath: isHovered
                        ? "circle(160% at 0% 0%)"
                        : undefined,
                    }}
                  />

                  {/* 1. Default State: Title Only */}
                  <div
                    className={`absolute inset-0 p-6 sm:p-8 flex flex-col justify-between transition-all duration-400 z-10 ${isHovered
                      ? "opacity-0 scale-95 pointer-events-none"
                      : "opacity-100 scale-100 pointer-events-auto"
                      }`}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                        PROJECT {(idx + 1).toString().padStart(2, "0")}
                      </span>
                      <span className="font-mono text-xs uppercase text-muted-foreground">
                        {project.category}
                      </span>
                    </div>

                    <div className="my-auto py-6">
                      <h3 className="font-mono text-2xl sm:text-3xl font-black uppercase text-foreground leading-snug">
                        {project.title}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between text-muted-foreground font-mono text-xs">
                      <span>VIEW DETAILS</span>
                      <span className="inline-flex items-center gap-1 text-primary font-bold">
                        <span>EXPLORE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* 2. Hovered State: Details & Image */}
                  <div
                    className={`absolute inset-0 p-6 flex flex-col justify-between transition-all duration-400 z-20 overflow-y-auto no-scrollbar ${isHovered
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-3 pointer-events-none"
                      }`}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-white/20">
                        <span className="font-mono text-xs font-bold uppercase text-white">
                          PROJECT {(idx + 1).toString().padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="mt-2 font-mono text-xl font-black uppercase text-white">
                        {project.title}
                      </h3>

                      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden my-2.5 border border-white/25">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="object-cover object-top"
                        />
                      </div>

                      <p className="text-xs text-white/95 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/20 space-y-2.5 mt-2">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded font-mono text-[10px] bg-white/20 text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#8b4513] font-mono text-xs font-bold uppercase shadow-sm"
                          >
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
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 text-white font-mono text-xs font-bold uppercase border border-white/30"
                          >
                            <span>Code</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ── Continuous Scroll-Linked Pinned Showcase (Responsive on Desktop, Tablet & Mobile) ── */
        <div
          ref={pinWrapperRef}
          className="relative w-full h-screen overflow-hidden bg-background text-foreground flex flex-col justify-between"
        >
          {/* Main Horizontal Sliding Track */}
          <div
            ref={trackRef}
            className="absolute top-0 left-0 flex h-full will-change-transform w-max select-none"
          >
            {/* ── Panel 0: Single Cinematic Project Header (Reference Screenshots 1-5) ── */}
            <div className="relative flex-shrink-0 w-screen h-full flex flex-col items-center justify-center p-6 sm:p-12 lg:p-20 overflow-hidden bg-background text-foreground header-panel select-none">
              {/* Expanding Accent Reveal Layer that enters from top-left (0% 0%) and sweeps to bottom-right */}
              <div
                ref={circleRef}
                className="absolute inset-0 bg-[#8b4513] dark:bg-[#b45309] flex flex-col items-center justify-center p-6 sm:p-12 lg:p-20 overflow-hidden pointer-events-none z-10"
                style={{ clipPath: "circle(0% at 0% 0%)" }}
              >
                {/* High-Contrast White Text Version of Header (Revealed with pixel-perfect alignment) */}
                <div className="relative flex flex-col items-center text-center max-w-4xl px-4 text-white">
                  <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-none drop-shadow-sm">
                    PROJECTS
                  </h2>

                  <div className="mt-4 sm:mt-6 inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-white text-[#8b4513] font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md -rotate-2 select-none">
                    PROJECT SHOWCASE • 08 WORKS
                  </div>

                  <p className="mt-4 sm:mt-6 text-xs sm:text-base lg:text-lg font-medium text-white/90 max-w-xl leading-relaxed">
                    A continuous horizontal journey through full-stack systems, modern web
                    applications, and scalable platforms.
                  </p>

                  <div className="mt-6 sm:mt-10 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/30 bg-white/15 font-mono text-xs font-bold uppercase tracking-wider text-white">
                    <span>SCROLL DOWN TO ADVANCE CARDS</span>
                    <ArrowRight className="w-4 h-4 text-white animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Base Header Layer (Visible before accent reveal) */}
              <div className="relative z-0 flex flex-col items-center text-center max-w-4xl px-4 text-foreground pointer-events-auto">
                <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-foreground leading-none drop-shadow-xs">
                  PROJECTS
                </h2>

                <div className="mt-4 sm:mt-6 inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-primary text-primary-foreground font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md -rotate-2 select-none border border-black/10">
                  PROJECT SHOWCASE • 08 WORKS
                </div>

                <p className="mt-4 sm:mt-6 text-xs sm:text-base lg:text-lg font-medium text-muted-foreground max-w-xl leading-relaxed">
                  A continuous horizontal journey through full-stack systems, modern web
                  applications, and scalable platforms.
                </p>

                <div className="mt-6 sm:mt-10 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/10 font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                  <span>SCROLL DOWN TO ADVANCE CARDS</span>
                  <ArrowRight className="w-4 h-4 text-primary animate-pulse" />
                </div>
              </div>
            </div>

            {/* ── Panel 1..N: Individual Project Cards Track ── */}
            <div
              onMouseLeave={() => setHoveredCardIndex(null)}
              className="flex flex-shrink-0 h-full items-stretch"
            >
              {projects.map((project, idx) => {
                const isHovered = hoveredCardIndex === idx;
                const primaryUrl = project.liveUrl || project.githubUrl;

                return (
                  <div
                    key={project.title}
                    tabIndex={0}
                    onMouseEnter={() => setHoveredCardIndex(idx)}
                    onMouseOver={() => setHoveredCardIndex(idx)}
                    onMouseMove={() => {
                      if (hoveredCardIndex !== idx) setHoveredCardIndex(idx);
                    }}
                    onMouseLeave={() => setHoveredCardIndex(null)}
                    onFocus={() => setHoveredCardIndex(idx)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget)) {
                        setHoveredCardIndex(null);
                      }
                    }}
                    onClick={() => {
                      setHoveredCardIndex(hoveredCardIndex === idx ? null : idx);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setHoveredCardIndex(hoveredCardIndex === idx ? null : idx);
                      }
                    }}
                    className={`relative flex-shrink-0 w-[84vw] max-w-[340px] sm:max-w-[410px] lg:max-w-[460px] xl:max-w-[490px] h-full border-r border-[#ebdcd0] dark:border-[#3d2a1e] flex flex-col justify-between overflow-hidden cursor-pointer bg-card transition-colors duration-300 group project-card outline-none focus-visible:ring-2 focus-visible:ring-primary ${isHovered ? "is-hovered" : ""
                      }`}
                    aria-label={`${project.title} - Click or hover to view details`}
                  >
                    {/* Expanding Accent Background Circle on Card Hover & onMouseOver */}
                    <div
                      className={`project-card-accent-bg ${isHovered ? "is-active" : ""
                        }`}
                      style={{
                        clipPath: isHovered
                          ? "circle(160% at 0% 0%)"
                          : undefined,
                      }}
                    />

                    {/* ── 1. Default State: Title-Only Minimalist View ── */}
                    <div
                      className={`absolute inset-0 p-6 sm:p-10 flex flex-col justify-between transition-all duration-400 z-10 ${isHovered
                        ? "opacity-0 scale-95 pointer-events-none"
                        : "opacity-100 scale-100 pointer-events-auto"
                        }`}
                    >
                      {/* Top Header */}
                      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-black/10 dark:border-white/10">
                        <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
                          PROJECT {(idx + 1).toString().padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground truncate max-w-[170px]">
                          {project.category}
                        </span>
                      </div>

                      {/* Center Prominent Title */}
                      <div className="my-auto py-6 sm:py-10">
                        <h3 className="font-mono text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tight text-foreground leading-[1.12]">
                          {project.title}
                        </h3>
                      </div>

                      {/* Bottom Footer Cue */}
                      <div className="pt-3 sm:pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-muted-foreground font-mono text-[11px] sm:text-xs">
                        <span className="uppercase tracking-wider font-semibold">VIEW DETAILS</span>
                        <span className="inline-flex items-center gap-1.5 text-primary font-bold">
                          <span>HOVER / TAP</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>

                    {/* ── 2. Hover / Active State: Full Details & Screenshot View ── */}
                    <div
                      className={`absolute inset-0 p-5 sm:p-8 flex flex-col justify-between transition-all duration-400 z-20 overflow-y-auto no-scrollbar ${isHovered
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-3 pointer-events-none"
                        }`}
                    >
                      <div>
                        {/* Top Header Strip */}
                        <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/20">
                          <span className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-widest text-white">
                            PROJECT {(idx + 1).toString().padStart(2, "0")}
                          </span>
                          <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30 truncate max-w-[170px]">
                            {project.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="mt-2.5 sm:mt-3 font-mono text-lg sm:text-2xl font-black uppercase tracking-tight text-white leading-snug line-clamp-2">
                          {project.title}
                        </h3>

                        {/* Visual Image Preview */}
                        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden my-2.5 sm:my-3 border border-white/25 shadow-xl bg-slate-950">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 640px) 320px, (max-width: 1024px) 410px, 490px"
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Project Narrative Description */}
                        <p className="text-xs sm:text-sm text-white/95 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {/* Highlight (if available) */}
                        {project.highlights?.[0] && (
                          <div className="mt-2 p-2 rounded-lg bg-white/15 border border-white/25 text-white">
                            <p className="text-[10px] sm:text-[11px] leading-relaxed line-clamp-2">
                              <span className="font-mono font-bold uppercase mr-1 text-white">
                                HIGHLIGHT:
                              </span>
                              <span>{project.highlights[0]}</span>
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Bottom: Tech Stack Pills & Action Links */}
                      <div className="pt-2.5 sm:pt-3 border-t border-white/20 space-y-2.5 sm:space-y-3 mt-2">
                        {/* Technology Stack Pills */}
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[10px] font-semibold bg-white/15 border border-white/25 text-white"
                            >
                              <SkillIcon name={tech} className="w-2.5 h-2.5 shrink-0" />
                              <span>{tech}</span>
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-1.5 py-0.5 rounded font-mono text-[10px] text-white/80">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons: Live Demo & GitHub */}
                        <div className="flex items-center justify-between gap-2 pt-1">
                          <div className="flex items-center gap-2">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-white text-[#8b4513] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
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
                                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-white/20 border border-white/35 text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
                              >
                                <SkillIcon name="github" className="w-3.5 h-3.5 shrink-0" />
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
                              className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white text-[#8b4513] hover:scale-110 active:scale-95 transition-all shrink-0 shadow-sm"
                              aria-label={`Open ${project.title}`}
                            >
                              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* ── Finale Card: Closing Banner at the End of the Track ── */}
              <div className="w-[84vw] max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] flex-shrink-0 h-full bg-[#8b4513] dark:bg-[#b45309] text-white flex flex-col justify-between p-6 sm:p-12 border-l border-white/15 select-none">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/70">
                  08 / 08 • COMPLETE SHOWCASE
                </div>

                <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white text-[#8b4513] shadow-xl flex flex-col items-center justify-center font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider">
                    <span>LET&apos;S</span>
                    <span>BUILD</span>
                    <ArrowRight className="w-4 h-4 mt-0.5 text-[#8b4513]" />
                  </div>

                  <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-white">
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
          <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 px-3 sm:px-6 py-1.5 sm:py-2 rounded-full border border-black/10 dark:border-white/10 bg-card/90 text-card-foreground backdrop-blur-md shadow-xl flex items-center gap-2 sm:gap-4 max-w-[94vw]">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-primary">
              <span>PROJECT {(activeIndex + 1).toString().padStart(2, "0")}</span>
              <span className="text-muted-foreground">/ 08</span>
            </div>

            <span className="text-border">•</span>

            {/* Numeric Quick Jump Trackers */}
            <div className="hidden sm:flex items-center gap-1">
              {projects.map((p, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={p.title}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToProject(idx);
                    }}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${isActive
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

      {/* Global CSS for #projects background and card hover */}
      <style jsx global>{`
        #projects {
          background-color: var(--background) !important;
          color: var(--foreground) !important;
        }

        /* ── Project Cards Hover & MouseOver Accent Background (#8b4513 / #b45309) ── */
        .project-card-accent-bg {
          position: absolute;
          inset: 0;
          background-color: #8b4513 !important;
          clip-path: circle(0% at 0% 0%);
          transition: clip-path 0.65s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          z-index: 0;
        }

        .dark .project-card-accent-bg,
        [data-theme="dark"] .project-card-accent-bg {
          background-color: #b45309 !important;
        }

        .project-card:hover .project-card-accent-bg,
        .project-card:active .project-card-accent-bg,
        .project-card:focus-within .project-card-accent-bg,
        .project-card-accent-bg.is-active,
        .project-card.is-hovered .project-card-accent-bg {
          clip-path: circle(160% at 0% 0%) !important;
        }

        /* Hide scrollbars on internal card details */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}