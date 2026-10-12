"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Radio,
  CheckCircle2,
  X,
} from "lucide-react";
import gsap from "gsap";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import SkillIcon from "@/components/shared/SkillIcon";
import { projects } from "@/data/projects";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);
  const bgCard1Ref = useRef<HTMLDivElement>(null);
  const bgCard2Ref = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const wheelThrottleRef = useRef<boolean>(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Filter tabs definition
  const filterTabs = [
    "All Projects",
    "Full-Stack",
    "Frontend",
    "Enterprise / Cloud",
  ];

  // Filtered projects list based on category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All Projects") {
      return projects;
    }
    if (selectedCategory === "Full-Stack") {
      return projects.filter(
        (p) =>
          p.category.toLowerCase().includes("full-stack") ||
          p.title.includes("Task Management") ||
          p.title.includes("E-Commerce") ||
          p.title.includes("PrintForge")
      );
    }
    if (selectedCategory === "Frontend") {
      return projects.filter(
        (p) =>
          p.category.toLowerCase().includes("frontend") ||
          p.title.includes("Tattoo")
      );
    }
    if (selectedCategory === "Enterprise / Cloud") {
      return projects.filter(
        (p) =>
          p.category.toLowerCase().includes("enterprise") ||
          p.category.toLowerCase().includes("saas") ||
          p.category.toLowerCase().includes("healthcare") ||
          p.technologies.some((t) => t.toLowerCase().includes("power"))
      );
    }
    return projects;
  }, [selectedCategory]);

  // Ensure active index stays strictly within bounds of filtered list
  const safeActiveIndex =
    filteredProjects.length > 0 ? activeProjectIndex % filteredProjects.length : 0;
  const activeProject = filteredProjects[safeActiveIndex] || projects[0];

  // Layered background cards (only when multiple projects exist)
  const backgroundCard1 =
    filteredProjects.length > 1
      ? filteredProjects[(safeActiveIndex + 1) % filteredProjects.length]
      : null;
  const backgroundCard2 =
    filteredProjects.length > 2
      ? filteredProjects[(safeActiveIndex + 2) % filteredProjects.length]
      : null;

  const handleSelectProject = (index: number) => {
    if (index === safeActiveIndex) return;
    setDirection(index > safeActiveIndex ? 1 : -1);
    setActiveProjectIndex(index);
  };

  const handlePrev = useCallback(() => {
    if (filteredProjects.length <= 1) return;
    setDirection(-1);
    setActiveProjectIndex(
      (prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length
    );
  }, [filteredProjects.length]);

  const handleNext = useCallback(() => {
    if (filteredProjects.length <= 1) return;
    setDirection(1);
    setActiveProjectIndex((prev) => (prev + 1) % filteredProjects.length);
  }, [filteredProjects.length]);

  // 3-second auto-slide interval (pauses on user interaction/hover)
  useEffect(() => {
    if (filteredProjects.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setActiveProjectIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [filteredProjects.length, isPaused]);

  // Smooth sliding transition displaying current project at the center with full coverage
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const dir = direction !== 0 ? direction : 1;
    const ctx = gsap.context(() => {
      // Current project slides smoothly across the center covering the behind space
      if (activeCardRef.current) {
        gsap.fromTo(
          activeCardRef.current,
          {
            x: dir > 0 ? 60 : -60,
            opacity: 0.65,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.52,
            ease: "power2.out",
          }
        );
      }

      // Behind cards subtle scale/opacity sync directly behind at the center
      if (bgCard1Ref.current) {
        gsap.fromTo(
          bgCard1Ref.current,
          {
            scale: 0.94,
            opacity: 0.4,
          },
          {
            scale: 0.97,
            opacity: 0.75,
            duration: 0.48,
            ease: "power2.out",
          }
        );
      }

      // Details Drawer: adapt panel contents with smooth fade & lift
      if (drawerRef.current) {
        gsap.fromTo(
          drawerRef.current,
          {
            opacity: 0.4,
            y: 6,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          }
        );
      }
    }, stageRef);

    return () => ctx.revert();
  }, [safeActiveIndex, direction]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Touch swipe support (respects vertical scroll)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Trigger navigation only when horizontal swipe is intentional and dominant
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Horizontal wheel / trackpad gesture support (does not interfere with normal vertical scrolling)
  const handleWheel = (e: React.WheelEvent) => {
    if (
      Math.abs(e.deltaX) > 35 &&
      Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5
    ) {
      if (wheelThrottleRef.current) return;
      wheelThrottleRef.current = true;
      if (e.deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setTimeout(() => {
        wheelThrottleRef.current = false;
      }, 450);
    }
  };

  return (
    <Section id="projects" className="overflow-hidden">
      {/* ── 1. Reusable Shared Section Header ── */}
      <SectionHeader
        tag="[ 02 / SELECTED WORKS ]"
        title="Project Portfolio"
        titleSecondLine="Showcase."
        stickerText="NUHAMIN DEV"
        countBadge={`${projects.length} Works`}
        description="Interactive 3D showcase featuring full-stack applications, distributed enterprise portals, and modern digital experiences."
      />

      {/* ── 2. Category Filter Tabs (With Portfolio Brand Accent) ── */}
      <div className="mb-6 flex flex-wrap items-center gap-2 max-w-full">
        {filterTabs.map((tab) => {
          const isActive = selectedCategory === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setSelectedCategory(tab);
                setActiveProjectIndex(0);
                setDirection(1);
              }}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-1.5 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#8b4513] dark:bg-[#b45309] text-white scale-105"
                  : "border border-[#8b4513]/20 dark:border-[#b45309]/30 bg-white/80 dark:bg-[#1a120c]/80 text-[#664d3d] dark:text-[#c9b4a5] hover:bg-[#8b4513]/10 dark:hover:bg-[#b45309]/20 hover:text-[#8b4513] dark:hover:text-[#e09045]"
              }`}
            >
              <span>{tab}</span>
            </button>
          );
        })}
      </div>

      {/* ── 3. SHOWCASE STAGE (No Container Box Shadow, Clean Minimal Aesthetics) ── */}
      <div
        ref={stageRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full max-w-full rounded-3xl border border-[#8b4513]/20 dark:border-[#b45309]/30 bg-gradient-to-b from-[#fdfbf7] via-white to-[#faf4ed] dark:from-[#140e09] dark:via-[#120c08] dark:to-[#1a130d] p-4 sm:p-6 lg:p-8 overflow-hidden min-w-0"
      >
        {/* Floating Reopen Button for Details Drawer if user closes it */}
        {!isDrawerOpen && (
          <div className="flex justify-end mb-3 relative z-20">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#8b4513]/40 dark:border-[#b45309]/50 bg-[#8b4513]/8 dark:bg-[#b45309]/20 text-[#8b4513] dark:text-[#e09045] px-3 py-1 font-mono text-xs font-bold hover:bg-[#8b4513] hover:text-white dark:hover:bg-[#b45309] dark:hover:text-white transition-all cursor-pointer"
            >
              <span>OPEN DETAILS DRAWER</span>
            </button>
          </div>
        )}

        {/* ── Main Content Grid: Centered Full-Coverage Project Deck + Details Drawer ── */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full min-w-0">
          {/* ── Left / Center Area: Project Deck with Centered Full-Coverage Card ── */}
          <div
            className={`${
              isDrawerOpen ? "lg:col-span-7 xl:col-span-8" : "lg:col-span-12"
            } w-full min-w-0 flex flex-col justify-between transition-all duration-300 relative z-10`}
          >
            {/* Card Stage Container — Centers Current Project with Full Coverage */}
            <div
              className="relative w-full max-w-full min-w-0 min-h-[490px] sm:min-h-[530px] lg:min-h-[550px] flex items-center justify-center overflow-hidden outline-hidden"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
              aria-label="Interactive project showcase carousel with 3-second auto-slide. Use arrow keys or horizontal gestures to navigate."
            >
              {/* ── Background Layer 2 (Centered Directly Behind, Covered by Front Project) ── */}
              {backgroundCard2 && (
                <div
                  ref={bgCard2Ref}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                  aria-hidden="true"
                >
                  <div className="w-full max-w-full h-full rounded-2xl border border-[#8b4513]/10 dark:border-[#b45309]/15 bg-white/50 dark:bg-[#140e09]/50 transform scale-[0.94] transition-all duration-300" />
                </div>
              )}

              {/* ── Background Layer 1 (Centered Directly Behind, Covered by Front Project) ── */}
              {backgroundCard1 && (
                <div
                  ref={bgCard1Ref}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                  aria-hidden="true"
                >
                  <div className="w-full max-w-full h-full rounded-2xl border border-[#8b4513]/20 dark:border-[#b45309]/25 bg-white/70 dark:bg-[#1a120c]/70 transform scale-[0.97] transition-all duration-300" />
                </div>
              )}

              {/* ── CURRENT PROJECT CARD (Centered at Stage with Full Coverage, Covering Behind Projects) ── */}
              <div
                ref={activeCardRef}
                className="relative w-full max-w-full rounded-2xl border-2 border-[#8b4513] dark:border-[#b45309] bg-white/95 dark:bg-[#1c130d]/95 backdrop-blur-xl p-4 sm:p-6 transition-all duration-300 z-20 min-w-0"
              >
                {/* Card Header Strip with Signal Pulse */}
                <div className="flex items-center justify-between border-b border-[#8b4513]/20 dark:border-[#b45309]/25 pb-2.5 mb-3 min-w-0">
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#8b4513] dark:text-[#e09045] uppercase truncate max-w-[85%]">
                    PROJECT {(safeActiveIndex + 1).toString().padStart(2, "0")}:{" "}
                    {activeProject.title}
                  </span>
                  <div
                    className="flex items-center gap-1.5 text-[#8b4513] dark:text-[#c26510] shrink-0"
                    title="Active Live Project"
                  >
                    <span className="font-mono text-[10px] uppercase font-bold hidden sm:inline text-slate-500 dark:text-slate-400">
                      3s SLIDE
                    </span>
                    <Radio className="w-4 h-4 animate-pulse" />
                  </div>
                </div>

                {/* High-Resolution Full-Coverage Screenshot Frame */}
                <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] overflow-hidden rounded-xl border border-[#8b4513]/20 dark:border-[#b45309]/25 bg-slate-950 group">
                  <Image
                    key={activeProject.image}
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 60vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Highlights / Role Block */}
                <div className="mt-4 space-y-1 font-mono text-xs text-slate-700 dark:text-slate-300 min-w-0">
                  <p className="font-bold text-[#8b4513] dark:text-[#c26510] truncate">
                    Role: Full-Stack Developer &amp; Architect
                  </p>
                  {activeProject.highlights.slice(0, 2).map((highlight, idx) => (
                    <p key={idx} className="line-clamp-1 text-slate-600 dark:text-slate-400">
                      • {highlight}
                    </p>
                  ))}
                </div>

                {/* Outlined Tech Badges (Matching Portfolio Brand Theme) */}
                <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-[#8b4513]/15 dark:border-[#b45309]/20">
                  {activeProject.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[#8b4513]/25 dark:border-[#b45309]/35 bg-[#8b4513]/8 dark:bg-[#b45309]/20 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-bold text-[#8b4513] dark:text-[#e09045] uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Quick Action Links on Front Card */}
                <div className="mt-4 flex items-center justify-between sm:hidden pt-2.5 border-t border-[#8b4513]/15 dark:border-[#b45309]/20">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#8b4513] dark:text-[#e09045] hover:text-[#70360f] dark:hover:text-[#f3b579]"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#8b4513] dark:text-[#e09045] hover:text-[#70360f] dark:hover:text-[#f3b579]"
                    >
                      <span>GITHUB</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* ── Bottom Project Scrubber / Controls ── */}
            {filteredProjects.length > 1 ? (
              <div className="mt-6 pt-5 border-t border-[#8b4513]/15 dark:border-[#b45309]/20 w-full min-w-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest text-[#8b4513] dark:text-[#e09045] uppercase">
                    PROJECT {(safeActiveIndex + 1).toString().padStart(2, "0")} / {filteredProjects.length.toString().padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="w-7 h-7 rounded-full border border-[#8b4513]/35 dark:border-[#b45309]/40 bg-white/80 dark:bg-[#1a120c]/80 text-[#8b4513] dark:text-[#e09045] hover:bg-[#8b4513] hover:text-white dark:hover:bg-[#b45309] dark:hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
                      aria-label="Previous project"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-7 h-7 rounded-full border border-[#8b4513]/35 dark:border-[#b45309]/40 bg-white/80 dark:bg-[#1a120c]/80 text-[#8b4513] dark:text-[#e09045] hover:bg-[#8b4513] hover:text-white dark:hover:bg-[#b45309] dark:hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
                      aria-label="Next project"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar with Connected Project Nodes */}
                <div className="relative flex items-center justify-between w-full max-w-full py-2 min-w-0">
                  {/* Connecting Line Track */}
                  <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-0.5 bg-[#8b4513]/15 dark:bg-[#b45309]/25 pointer-events-none" />
                  <div
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-0.5 bg-[#8b4513] dark:bg-[#b45309] transition-all duration-300 pointer-events-none"
                    style={{
                      width: `${(safeActiveIndex /
                        Math.max(filteredProjects.length - 1, 1)) *
                        100
                        }%`,
                      maxWidth: "calc(100% - 16px)",
                    }}
                  />

                  {/* Interactive Project Nodes */}
                  {filteredProjects.map((p, idx) => {
                    const isActive = idx === safeActiveIndex;
                    return (
                      <button
                        key={p.title}
                        type="button"
                        onClick={() => handleSelectProject(idx)}
                        aria-label={`Project ${(idx + 1).toString().padStart(2, "0")}: ${p.title}`}
                        title={`Project ${(idx + 1).toString().padStart(2, "0")}: ${p.title}`}
                        className="relative z-10 flex items-center justify-center p-1.5 group cursor-pointer focus:outline-hidden"
                      >
                        {/* Node Circle */}
                        <div
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all duration-300 flex items-center justify-center ${
                            isActive
                              ? "bg-[#8b4513] dark:bg-[#b45309] scale-125 ring-4 ring-[#8b4513]/25 dark:ring-[#b45309]/30"
                              : "bg-white dark:bg-[#120c08] border border-[#8b4513]/40 dark:border-[#b45309]/40 group-hover:border-[#8b4513] dark:group-hover:border-[#b45309] group-hover:scale-115"
                          }`}
                        >
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Single Project Status Bar */
              <div className="mt-6 pt-4 border-t border-[#8b4513]/15 dark:border-[#b45309]/20 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8b4513] dark:text-[#e09045]">
                  <span className="w-2 h-2 rounded-full bg-[#8b4513] dark:bg-[#b45309] animate-pulse" />
                  <span>FEATURED SHOWCASE PROJECT • 1 OF 1 IN CATEGORY</span>
                </div>
              </div>
            )}
          </div>

          {/* ── Right Side Panel: "DETAILS DRAWER" (No Box Shadow, Clean Border Framing) ── */}
          {isDrawerOpen && (
            <div
              ref={drawerRef}
              className="lg:col-span-5 xl:col-span-4 w-full min-w-0 rounded-2xl border border-[#8b4513]/25 dark:border-[#b45309]/35 bg-white/95 dark:bg-[#1c130d]/95 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between relative z-25"
            >
              <div>
                {/* Drawer Header with Close Button */}
                <div className="flex items-center justify-between border-b border-[#8b4513]/20 dark:border-[#b45309]/25 pb-3 mb-4">
                  <span className="font-mono text-xs sm:text-sm font-extrabold tracking-widest text-[#8b4513] dark:text-[#e09045] uppercase">
                    DETAILS DRAWER
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-slate-400 hover:text-[#8b4513] dark:hover:text-[#e09045] transition-colors cursor-pointer p-1"
                    aria-label="Close details drawer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Project Title & Narrative Explanation */}
                <div className="mb-4">
                  <h4 className="font-mono text-sm sm:text-base font-extrabold text-slate-900 dark:white leading-snug">
                    Project {(safeActiveIndex + 1).toString().padStart(2, "0")}:{" "}
                    {activeProject.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
                    {activeProject.description}
                  </p>
                </div>

                {/* Verified Skills Section */}
                <div className="mb-4 pt-3 border-t border-[#8b4513]/15 dark:border-[#b45309]/20">
                  <span className="font-mono text-[11px] font-bold text-[#8b4513] dark:text-[#e09045] uppercase tracking-wider block mb-2">
                    Verified Skills:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 rounded-md bg-[#8b4513]/8 dark:bg-[#b45309]/20 border border-[#8b4513]/20 dark:border-[#b45309]/30 px-2 py-0.5 font-mono text-[10px] text-[#8b4513] dark:text-[#e09045] font-semibold"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#8b4513] dark:text-[#c26510]" />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications Section */}
                <div className="mb-4 pt-3 border-t border-[#8b4513]/15 dark:border-[#b45309]/20">
                  <span className="font-mono text-[11px] font-bold text-[#8b4513] dark:text-[#e09045] uppercase tracking-wider block mb-2">
                    Technical Specifications:
                  </span>
                  <ul className="space-y-1.5 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                    <li>• Category: {activeProject.category}</li>
                    <li>• Production Status: Verified &amp; Live</li>
                    <li>• Architecture: Responsive Component System</li>
                  </ul>
                </div>

                {/* Case Study Highlights */}
                <div className="mb-6 pt-3 border-t border-[#8b4513]/15 dark:border-[#b45309]/20">
                  <span className="font-mono text-[11px] font-bold text-[#8b4513] dark:text-[#e09045] uppercase tracking-wider block mb-2">
                    Key Highlights:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeProject.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#8b4513] dark:text-[#c26510] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ── Action Buttons Matching Portfolio Brand Accent ── */}
              <div className="space-y-2.5 pt-3 border-t border-[#8b4513]/20 dark:border-[#b45309]/25">
                {activeProject.liveUrl ? (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#8b4513] hover:bg-[#70360f] dark:bg-[#b45309] dark:hover:bg-[#92400e] text-white font-mono text-xs sm:text-sm font-black tracking-wider uppercase py-3 px-4 transition-all duration-200 active:scale-98 cursor-pointer"
                  >
                    <span>VIEW LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : activeProject.githubUrl ? (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#8b4513] hover:bg-[#70360f] dark:bg-[#b45309] dark:hover:bg-[#92400e] text-white font-mono text-xs sm:text-sm font-black tracking-wider uppercase py-3 px-4 transition-all duration-200 active:scale-98 cursor-pointer"
                  >
                    <span>VIEW CODE</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="w-full text-center py-2 font-mono text-xs text-slate-400 uppercase">
                    Internal Enterprise Project
                  </div>
                )}

                {activeProject.githubUrl && activeProject.liveUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#8b4513]/40 hover:border-[#8b4513] dark:border-[#b45309]/50 dark:hover:border-[#b45309] text-[#8b4513] dark:text-[#e09045] hover:bg-[#8b4513]/10 dark:hover:bg-[#b45309]/20 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase py-2.5 px-4 transition-all duration-200 active:scale-98 cursor-pointer"
                  >
                    <SkillIcon name="github" className="w-4 h-4" />
                    <span>EXPLORE REPOSITORY</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Empty State Fallback */}
      {filteredProjects.length === 0 && (
        <div className="py-16 text-center border border-dashed border-[#8b4513]/30 dark:border-[#b45309]/30 rounded-2xl bg-white/50 dark:bg-[#1c130d]/50">
          <p className="font-mono text-sm text-[#8b4513] dark:text-[#e09045] uppercase tracking-wider">
            No projects found in this category.
          </p>
        </div>
      )}
    </Section>
  );
}