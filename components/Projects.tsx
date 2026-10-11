"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Radio,
  CheckCircle2,
  X,
} from "lucide-react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import SkillIcon from "@/components/shared/SkillIcon";
import { projects } from "@/data/projects";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);

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
    setActiveProjectIndex(index);
  };

  const handlePrev = () => {
    if (filteredProjects.length <= 1) return;
    setActiveProjectIndex(
      (prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length
    );
  };

  const handleNext = () => {
    if (filteredProjects.length <= 1) return;
    setActiveProjectIndex((prev) => (prev + 1) % filteredProjects.length);
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
              }}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-1.5 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${isActive
                ? "bg-[#8b4513] dark:bg-[#b45309] text-white shadow-[0_4px_14px_rgba(139,69,19,0.35)] dark:shadow-[0_4px_14px_rgba(180,83,9,0.4)] scale-105"
                : "border border-[#8b4513]/20 dark:border-[#b45309]/30 bg-white/80 dark:bg-[#1a120c]/80 text-[#664d3d] dark:text-[#c9b4a5] hover:bg-[#8b4513]/10 dark:hover:bg-[#b45309]/20 hover:text-[#8b4513] dark:hover:text-[#e09045]"
                }`}
            >
              <span>{tab}</span>
            </button>
          );
        })}
      </div>

      {/* ── 3. 3D SHOWCASE PRESENTATION STAGE (No Unnecessary Top HUD Header) ── */}
      <div
        ref={stageRef}
        className="relative w-full max-w-full rounded-3xl border border-[#8b4513]/20 dark:border-[#b45309]/30 bg-gradient-to-b from-[#fdfbf7] via-white to-[#faf4ed] dark:from-[#140e09] dark:via-[#120c08] dark:to-[#1a130d] p-4 sm:p-6 lg:p-8 shadow-lg dark:shadow-[0_0_50px_rgba(180,83,9,0.08)] overflow-hidden min-w-0"
      >
        {/* Background Circuit Traces (Left Margin) */}
        <div className="absolute top-12 left-2 sm:left-4 w-28 sm:w-40 h-72 pointer-events-none select-none opacity-30 dark:opacity-40 z-0">
          <svg
            className="w-full h-full text-[#8b4513] dark:text-[#c26510]"
            viewBox="0 0 160 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 20 H60 L90 50 H150"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="150" cy="50" r="3.5" fill="currentColor" />
            <path
              d="M10 80 H80 L110 110 H140"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="140" cy="110" r="3" fill="currentColor" />
            <path
              d="M10 160 H50 L80 190 H155"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="155" cy="190" r="4" fill="currentColor" />
            <path
              d="M10 240 H70 L100 270 H135"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="135" cy="270" r="3" fill="currentColor" />
            <line
              x1="45"
              y1="50"
              x2="45"
              y2="140"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
          </svg>
        </div>

        {/* Floating Reopen Button for Details Drawer if user closes it */}
        {!isDrawerOpen && (
          <div className="flex justify-end mb-3 relative z-20">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#8b4513]/40 dark:border-[#b45309]/50 bg-[#8b4513]/8 dark:bg-[#b45309]/20 text-[#8b4513] dark:text-[#e09045] px-3 py-1 font-mono text-xs font-bold hover:bg-[#8b4513] hover:text-white dark:hover:bg-[#b45309] dark:hover:text-white transition-all cursor-pointer shadow-xs"
            >
              <span>OPEN DETAILS DRAWER</span>
            </button>
          </div>
        )}

        {/* ── Main Content Grid: 3D Holographic Deck + Details Drawer ── */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full min-w-0">
          {/* ── Left / Center Area: 3D Layered Cards Deck ── */}
          <div
            className={`${isDrawerOpen ? "lg:col-span-8 xl:col-span-8" : "lg:col-span-12"
              } w-full min-w-0 flex flex-col justify-between transition-all duration-300 relative z-10`}
          >
            {/* Card Stage Container */}
            <div className="relative w-full max-w-full min-w-0 min-h-[480px] sm:min-h-[510px] lg:min-h-[530px] flex items-center justify-start lg:perspective-[1400px]">
              {/* ── Background Card 2 (Layer 3 — Deepest Layer, z-10) ── */}
              {backgroundCard2 && (
                <div
                  onClick={() =>
                    handleSelectProject(
                      (safeActiveIndex + 2) % filteredProjects.length
                    )
                  }
                  className="hidden md:block absolute top-6 lg:top-7 left-[285px] md:left-[390px] lg:left-[450px] xl:left-[565px] w-[320px] md:w-[350px] lg:w-[370px] xl:w-[420px] max-w-none cursor-pointer rounded-2xl border border-[#8b4513]/30 dark:border-[#b45309]/35 bg-white/85 dark:bg-[#1a120c]/90 backdrop-blur-md p-4 sm:p-5 shadow-2xl transition-all duration-500 ease-out hover:opacity-100 hover:scale-[0.89] [transform:translate3d(0,-12px,-140px)_rotateY(-12deg)_scale(0.85)] opacity-80 dark:opacity-85 select-none z-10"
                  title={`Click to view ${backgroundCard2.title}`}
                >
                  {/* Clean Monospace Header Bar */}
                  <div className="flex items-center justify-between border-b border-[#8b4513]/15 dark:border-[#b45309]/20 pb-2 mb-2.5">
                    <span className="font-mono text-xs font-bold text-[#8b4513] dark:text-[#e09045] uppercase tracking-wider truncate">
                      {String(((safeActiveIndex + 2) % filteredProjects.length) + 1).padStart(2, "0")}_{backgroundCard2.title.replace(/[\s-]+/g, "_").toUpperCase()}
                    </span>
                  </div>

                  {/* High-Resolution Screenshot Frame */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-[#8b4513]/20 dark:border-[#b45309]/25 bg-slate-950 shadow-inner">
                    <Image
                      src={backgroundCard2.image}
                      alt={backgroundCard2.title}
                      fill
                      className="object-cover opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* 3 Metadata Lines (Role + 2 Highlights Matching Card 1) */}
                  <div className="mt-3 space-y-1 font-mono text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 min-w-0">
                    <p className="font-bold text-[#8b4513] dark:text-[#c26510] truncate">
                      Role: Full-Stack Developer
                    </p>
                    {backgroundCard2.highlights.slice(0, 2).map((highlight, idx) => (
                      <p key={idx} className="line-clamp-1 text-slate-600 dark:text-slate-400">
                        • {highlight}
                      </p>
                    ))}
                  </div>

                  {/* Outlined Tech Pill Badges */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5 pt-2.5 border-t border-[#8b4513]/15 dark:border-[#b45309]/20">
                    {backgroundCard2.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[#8b4513]/25 dark:border-[#b45309]/35 bg-[#8b4513]/8 dark:bg-[#b45309]/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#8b4513] dark:text-[#e09045] uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Background Card 1 (Layer 2 — Middle Layer, z-20) ── */}
              {backgroundCard1 && (
                <div
                  onClick={() =>
                    handleSelectProject(
                      (safeActiveIndex + 1) % filteredProjects.length
                    )
                  }
                  className="hidden sm:block absolute top-3 lg:top-4 left-[155px] md:left-[215px] lg:left-[225px] xl:left-[280px] w-[330px] md:w-[370px] lg:w-[380px] xl:w-[430px] max-w-none cursor-pointer rounded-2xl border border-[#8b4513]/35 dark:border-[#b45309]/40 bg-white/90 dark:bg-[#1c130d]/92 backdrop-blur-md p-4 sm:p-5 shadow-xl transition-all duration-500 ease-out hover:opacity-100 hover:scale-[0.96] [transform:translate3d(0,-6px,-70px)_rotateY(-9deg)_scale(0.92)] opacity-88 dark:opacity-92 select-none z-20"
                  title={`Click to view ${backgroundCard1.title}`}
                >
                  {/* Clean Monospace Header Bar */}
                  <div className="flex items-center justify-between border-b border-[#8b4513]/20 dark:border-[#b45309]/25 pb-2 mb-2.5">
                    <span className="font-mono text-xs font-bold text-[#8b4513] dark:text-[#e09045] uppercase tracking-wider truncate">
                      {String(((safeActiveIndex + 1) % filteredProjects.length) + 1).padStart(2, "0")}_{backgroundCard1.title.replace(/[\s-]+/g, "_").toUpperCase()}
                    </span>
                  </div>

                  {/* High-Resolution Screenshot Frame */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-[#8b4513]/20 dark:border-[#b45309]/25 bg-slate-950 shadow-inner">
                    <Image
                      src={backgroundCard1.image}
                      alt={backgroundCard1.title}
                      fill
                      className="object-cover opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* 3 Metadata Lines (Role + 2 Highlights Matching Card 1) */}
                  <div className="mt-3 space-y-1 font-mono text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 min-w-0">
                    <p className="font-bold text-[#8b4513] dark:text-[#c26510] truncate">
                      Role: Full-Stack Developer
                    </p>
                    {backgroundCard1.highlights.slice(0, 2).map((highlight, idx) => (
                      <p key={idx} className="line-clamp-1 text-slate-600 dark:text-slate-400">
                        • {highlight}
                      </p>
                    ))}
                  </div>

                  {/* Outlined Tech Pill Badges */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5 pt-2.5 border-t border-[#8b4513]/15 dark:border-[#b45309]/20">
                    {backgroundCard1.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[#8b4513]/25 dark:border-[#b45309]/35 bg-[#8b4513]/8 dark:bg-[#b45309]/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#8b4513] dark:text-[#e09045] uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── FRONT ACTIVE CARD (Layer 1 — Foreground, z-30) ── */}
              <div className="relative w-full max-w-full sm:max-w-[420px] md:max-w-[430px] lg:max-w-[400px] xl:max-w-[460px] rounded-2xl border-2 border-[#8b4513] dark:border-[#b45309] shadow-[0_0_30px_rgba(139,69,19,0.22),inset_0_0_15px_rgba(139,69,19,0.06)] dark:shadow-[0_0_35px_rgba(180,83,9,0.32),inset_0_0_15px_rgba(180,83,9,0.08)] bg-white/95 dark:bg-[#1c130d]/95 backdrop-blur-xl p-4 sm:p-5 transition-all duration-300 z-30 min-w-0 [transform:perspective(1200px)_rotateY(4deg)]">
                {/* Card Header Strip with Signal Pulse */}
                <div className="flex items-center justify-between border-b border-[#8b4513]/20 dark:border-[#b45309]/25 pb-2.5 mb-3 min-w-0">
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#8b4513] dark:text-[#e09045] uppercase truncate max-w-[85%]">
                    PROJECT {(safeActiveIndex + 1).toString().padStart(2, "0")}:{" "}
                    {activeProject.title}
                  </span>
                  <div className="flex items-center gap-0.5 text-[#8b4513] dark:text-[#c26510] shrink-0" title="Active Signal">
                    <Radio className="w-4 h-4 animate-pulse" />
                  </div>
                </div>

                {/* High-Resolution Screenshot Frame */}
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-[#8b4513]/20 dark:border-[#b45309]/25 bg-slate-950 shadow-inner group">
                  <Image
                    key={activeProject.image}
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Highlights / Metadata Block */}
                <div className="mt-3.5 space-y-1 font-mono text-xs text-slate-700 dark:text-slate-300 min-w-0">
                  <p className="font-bold text-[#8b4513] dark:text-[#c26510] truncate">
                    Role: Full-Stack Developer & Architect
                  </p>
                  {activeProject.highlights.slice(0, 2).map((highlight, idx) => (
                    <p key={idx} className="line-clamp-1 text-slate-600 dark:text-slate-400">
                      • {highlight}
                    </p>
                  ))}
                </div>

                {/* Outlined Tech Badges (Matching Portfolio Brand Theme) */}
                <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-[#8b4513]/15 dark:border-[#b45309]/20">
                  {activeProject.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[#8b4513]/25 dark:border-[#b45309]/35 bg-[#8b4513]/8 dark:bg-[#b45309]/20 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-bold text-[#8b4513] dark:text-[#e09045] uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Quick Mobile Action Links on Front Card */}
                <div className="mt-3.5 flex items-center justify-between sm:hidden pt-2 border-t border-[#8b4513]/15 dark:border-[#b45309]/20">
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
                      className="w-7 h-7 rounded-full border border-[#8b4513]/35 dark:border-[#b45309]/40 bg-white/80 dark:bg-[#1a120c]/80 text-[#8b4513] dark:text-[#e09045] hover:bg-[#8b4513] hover:text-white dark:hover:bg-[#b45309] dark:hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
                      aria-label="Previous project"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-7 h-7 rounded-full border border-[#8b4513]/35 dark:border-[#b45309]/40 bg-white/80 dark:bg-[#1a120c]/80 text-[#8b4513] dark:text-[#e09045] hover:bg-[#8b4513] hover:text-white dark:hover:bg-[#b45309] dark:hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
                      aria-label="Next project"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar with Connected Project Nodes (No Milestone Labels) */}
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
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all duration-300 flex items-center justify-center ${isActive
                            ? "bg-[#8b4513] dark:bg-[#b45309] shadow-[0_0_12px_rgba(139,69,19,0.45)] dark:shadow-[0_0_12px_rgba(180,83,9,0.55)] scale-125 ring-4 ring-[#8b4513]/25 dark:ring-[#b45309]/30"
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
              /* Single Project Status Bar (No stretch overflow) */
              <div className="mt-6 pt-4 border-t border-[#8b4513]/15 dark:border-[#b45309]/20 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8b4513] dark:text-[#e09045]">
                  <span className="w-2 h-2 rounded-full bg-[#8b4513] dark:bg-[#b45309] animate-pulse shadow-[0_0_8px_rgba(139,69,19,0.5)] dark:shadow-[0_0_8px_rgba(180,83,9,0.6)]" />
                  <span>FEATURED SHOWCASE PROJECT • 1 OF 1 IN CATEGORY</span>
                </div>
              </div>
            )}
          </div>

          {/* ── Right Floating Side Panel: "DETAILS DRAWER" ── */}
          {isDrawerOpen && (
            <div className="lg:col-span-4 xl:col-span-4 w-full min-w-0 rounded-2xl border border-[#8b4513]/25 dark:border-[#b45309]/35 bg-white/95 dark:bg-[#1c130d]/95 backdrop-blur-xl p-5 sm:p-6 shadow-2xl dark:shadow-[0_0_35px_rgba(0,0,0,0.6)] flex flex-col justify-between animate-in fade-in duration-300 relative z-25">
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
                  <h4 className="font-mono text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug">
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
                    <li>• Production Status: Verified & Live</li>
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
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#8b4513] hover:bg-[#70360f] dark:bg-[#b45309] dark:hover:bg-[#92400e] text-white font-mono text-xs sm:text-sm font-black tracking-wider uppercase py-3 px-4 shadow-[0_4px_16px_rgba(139,69,19,0.35)] dark:shadow-[0_4px_16px_rgba(180,83,9,0.45)] transition-all duration-200 active:scale-98 cursor-pointer"
                  >
                    <span>VIEW LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : activeProject.githubUrl ? (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#8b4513] hover:bg-[#70360f] dark:bg-[#b45309] dark:hover:bg-[#92400e] text-white font-mono text-xs sm:text-sm font-black tracking-wider uppercase py-3 px-4 shadow-[0_4px_16px_rgba(139,69,19,0.35)] dark:shadow-[0_4px_16px_rgba(180,83,9,0.45)] transition-all duration-200 active:scale-98 cursor-pointer"
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