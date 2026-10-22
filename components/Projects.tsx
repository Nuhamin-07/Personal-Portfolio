"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillIcon from "@/components/shared/SkillIcon";
import { projects, type Project } from "@/data/projects";

function ProjectPreview({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/20 bg-black/10 shadow-lg">
      <Image
        src={src}
        alt={`${title} interface preview`}
        fill
        sizes="(max-width: 640px) 84vw, (max-width: 1024px) 410px, 490px"
        className="scale-[1.16] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.2]"
      />
    </div>
  );
}

function ProjectTitle({ color = "text-foreground", decorative = false, flipped = false }: { color?: string; decorative?: boolean; flipped?: boolean }) {
  return (
    <div aria-hidden={decorative} className={`project-heading-scene ${color} ${flipped ? "is-flipped" : ""}`}>
      {!decorative && <h2 tabIndex={0} className="sr-only">My projects</h2>}
      <span className="project-heading-face project-heading-front" aria-hidden="true">MY PROJECTS</span>
      <span className="project-heading-face project-heading-back" aria-hidden="true">
        <span className="project-heading-number">
          <span className="project-heading-digits">
            <span>{String(Math.max(0, projects.length - 1)).padStart(2, "0")}</span>
            <span>{String(projects.length).padStart(2, "0")}</span>
          </span>
        </span>
        <span>SELECTED WORKS</span>
      </span>
    </div>
  );
}

function ProjectTechStack({ technologies, accent = false }: { technologies: string[]; accent?: boolean }) {
  return (
    <ul aria-label="Technology stack" className="flex flex-wrap gap-2">
      {technologies.map((technology) => (
        <li
          key={technology}
          title={technology}
          className={`inline-flex min-h-9 items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${accent ? "border-white/80 bg-white text-[#3a2112] shadow-sm hover:bg-[#f7eee6]" : "border-border bg-muted/60 text-foreground hover:bg-muted"}`}
        >
          <SkillIcon name={technology} className="h-4 w-4 shrink-0" />
          <span>{technology}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectActions({ project, accent = false }: { project: Project; accent?: boolean }) {
  if (!project.liveUrl && !project.githubUrl) return null;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open live demo for ${project.title}`}
          className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${accent ? "bg-white text-[#71370f] hover:bg-white/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
        >
          Live demo
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`View source code for ${project.title}`}
          className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-semibold transition-colors ${accent ? "border-white/40 text-white hover:bg-white/10" : "border-border text-foreground hover:bg-muted"}`}
        >
          Source code
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [projectTitleFlipped, setProjectTitleFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for mobile viewport / touch device
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        window.matchMedia("(hover: none) and (pointer: coarse)").matches
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
        onToggle: (self) => {
          if (self.isActive) {
            document.documentElement.dataset.projectsPinned = "true";
            window.dispatchEvent(
              new CustomEvent("projects-active", { detail: true })
            );
          } else {
            delete document.documentElement.dataset.projectsPinned;
            window.dispatchEvent(
              new CustomEvent("projects-active", { detail: false })
            );
          }
        },
        onUpdate: (self) => {
          const prog = self.progress;
          // First 25% of progress is Panel 0 accent circle expanding from left to right;
          // Remaining 75% maps through project cards 0 to 7
          if (prog < 0.25) {
            setActiveIndex((prev) => {
              if (prev !== 0) {
                setHoveredCardIndex(null);
                return 0;
              }
              return prev;
            });
          } else {
            const cardProg = (prog - 0.25) / 0.75;
            const currentIdx = Math.min(
              projects.length - 1,
              Math.max(0, Math.floor(cardProg * projects.length))
            );
            setActiveIndex((prev) => {
              if (prev !== currentIdx) {
                setHoveredCardIndex(null);
                return currentIdx;
              }
              return prev;
            });
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
      delete document.documentElement.dataset.projectsPinned;
      window.dispatchEvent(
        new CustomEvent("projects-active", { detail: false })
      );
      ScrollTrigger.getById("projects-horizontal-scroll")?.kill();
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      id="projects"
      className="relative w-full bg-background text-foreground transition-colors overflow-x-clip"
    >
      {/* ── Accessible Reduced Motion Fallback (Vertical Responsive Grid) ── */}
      {reducedMotion ? (
        <div className="mx-auto max-w-5xl px-4 sm:px-8 py-16 space-y-8 bg-background text-foreground">
          {/* Header Panel */}
          <div className="mb-12 text-center">
            <ProjectTitle />
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
              A showcase of full-stack systems, modern web applications, and scalable platforms.
            </p>
          </div>

          {/* Reduced-motion cards keep the full project information visible. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8"
              >
                <h3 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  {project.title}
                </h3>
                <div className="mt-5 overflow-hidden rounded-xl">
                  <ProjectPreview src={project.image} title={project.title} />
                </div>
                <p className="mt-4 max-w-prose text-sm sm:text-base leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Tech stack</p>
                    <ProjectTechStack technologies={project.technologies} />
                </div>
                <ProjectActions project={project} />
              </article>
            ))}
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
            <div className="relative flex-shrink-0 w-screen h-full flex items-center justify-center px-4 sm:px-8 overflow-hidden bg-background text-foreground header-panel select-none">
              {/* Expanding Accent Reveal Layer that enters from top-left (0% 0%) and sweeps to bottom-right */}
              <div
                ref={circleRef}
                className="absolute inset-0 bg-primary flex items-center justify-center px-4 sm:px-8 overflow-hidden pointer-events-none z-10"
                style={{ clipPath: "circle(0% at 0% 0%)" }}
              >
                <ProjectTitle color="text-primary-foreground" decorative flipped={projectTitleFlipped} />
              </div>

              {/* Base Header Layer (Visible before accent reveal) */}
              <div
                className="relative z-0 w-full text-center text-foreground pointer-events-auto"
                onPointerEnter={() => setProjectTitleFlipped(true)}
                onPointerLeave={() => setProjectTitleFlipped(false)}
                onFocusCapture={() => setProjectTitleFlipped(true)}
                onBlurCapture={() => setProjectTitleFlipped(false)}
              >
                <ProjectTitle flipped={projectTitleFlipped} />
              </div>
            </div>

            {/* ── Panel 1..N: Individual Project Cards Track ── */}
            <div
              onMouseLeave={() => setHoveredCardIndex(null)}
              className="flex flex-shrink-0 h-full items-stretch"
            >
              {projects.map((project, idx) => {
                const projectType = project.category
                  .replace(/(?:\s*&)?\s*Web App$/i, "")
                  .replace(/\s+(?:System|Software)$/i, "");
                const projectLabel = `${projectType} Project ${String(idx + 1).padStart(2, "0")}`;
                const isCardActive =
                  hoveredCardIndex !== null
                    ? hoveredCardIndex === idx
                    : activeIndex === idx;
                const toggleCard = () => {
                  if (isMobile) {
                    if (hoveredCardIndex === idx) {
                      setHoveredCardIndex(-1);
                    } else if (hoveredCardIndex === -1 && activeIndex === idx) {
                      setHoveredCardIndex(idx);
                    } else if (hoveredCardIndex === null && activeIndex === idx) {
                      setHoveredCardIndex(-1);
                    } else {
                      setHoveredCardIndex(idx);
                    }
                  } else {
                    setHoveredCardIndex((prev) => (prev === idx ? null : idx));
                  }
                };

                return (
                  <div
                    role="group"
                    key={project.title}
                    aria-label={`${projectLabel}: ${project.title}`}
                    onMouseEnter={() => {
                      if (!isMobile) setHoveredCardIndex(idx);
                    }}
                    onMouseOver={() => {
                      if (!isMobile) setHoveredCardIndex(idx);
                    }}
                    onMouseMove={() => {
                      if (!isMobile && hoveredCardIndex !== idx) {
                        setHoveredCardIndex(idx);
                      }
                    }}
                    onMouseLeave={() => {
                      if (!isMobile) setHoveredCardIndex(null);
                    }}
                    className={`relative flex-shrink-0 w-[84vw] max-w-[340px] sm:max-w-[410px] lg:max-w-[460px] xl:max-w-[490px] h-full border-r border-[#ebdcd0] dark:border-[#3d2a1e] flex flex-col justify-between overflow-hidden cursor-pointer bg-card transition-colors duration-300 group project-card outline-none focus-visible:ring-2 focus-visible:ring-primary ${isCardActive ? "is-hovered is-active bg-[#8b4513] dark:bg-[#b45309]" : ""
                      }`}
                  >
                    {/* One title panel; the definition and stack rise into view beneath it. */}
                    <div
                      className={`absolute inset-0 p-6 sm:p-10 flex flex-col justify-center z-10 transition-colors duration-500 ${isCardActive ? "text-white" : "text-foreground"}`}
                    >
                      <div className={`mx-auto w-full max-w-sm transition-transform duration-500 ease-out ${isCardActive ? "-translate-y-3" : "translate-y-0"}`}>
                        <button
                          type="button"
                          onClick={toggleCard}
                          aria-expanded={isCardActive}
                          aria-label={`${isCardActive ? "Hide" : "Show"} details for ${project.title}`}
                          className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                        >
                          <p className={`mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] ${isCardActive ? "text-white/75" : "text-muted-foreground"}`}>
                            {projectLabel}
                          </p>
                          <span className={`block font-sans text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight leading-[1.12] ${isCardActive ? "text-white" : "text-foreground"}`}>
                            {project.title}
                          </span>
                        </button>
                        <div className={`overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-out ${isCardActive ? "mt-5 max-h-[calc(100dvh-8rem)] opacity-100" : "mt-0 max-h-0 opacity-0"}`}>
                          <ProjectPreview src={project.image} title={project.title} />
                          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/90">
                            {project.description}
                          </p>
                          <div className="mt-6 border-t border-white/30 pt-4">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/65">Tech stack</p>
                            <ProjectTechStack technologies={project.technologies} accent />
                          </div>
                          <ProjectActions project={project} accent />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* ── Finale Card: Closing Banner at the End of the Track ── */}
              <div className="w-[84vw] max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] flex-shrink-0 h-full bg-[#8b4513] dark:bg-[#b45309] text-white flex flex-col justify-between p-6 sm:p-12 border-l border-white/15 select-none">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/70">
                  COMPLETE SHOWCASE
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

        </div>
      )}

      {/* Global CSS for #projects background, full-height navbar hide, and card hover */}
      <style jsx global>{`
        #projects {
          background-color: var(--background) !important;
          color: var(--foreground) !important;
          scroll-margin-top: 0 !important;
        }

        /* Auto-hide header when projects section is active for 100% full height */
        html[data-projects-pinned="true"] header,
        body[data-projects-pinned="true"] header {
          transform: translateY(-100%) !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }

        .project-card.is-active {
          background-color: #8b4513 !important;
        }

        .project-heading-scene {
          position: relative;
          display: grid;
          width: 100%;
          container-type: inline-size;
          overflow: hidden;
          perspective: 1100px;
          font-size: clamp(2.5rem, 13vw, 13rem);
          font-weight: 900;
          line-height: 0.86;
          letter-spacing: -0.045em;
          white-space: nowrap;
          text-align: center;
        }

        .project-heading-face {
          grid-area: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.14em;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          transition: transform 1200ms cubic-bezier(0.65, 0, 0.35, 1), opacity 400ms ease;
        }

        .project-heading-front {
          transform-origin: center bottom;
          transform: rotateX(0deg);
        }

        .project-heading-back {
          position: relative;
          max-width: 100%;
          font-size: clamp(1.5rem, 8.3cqw, 10rem);
          transform-origin: center top;
          transform: rotateX(90deg);
          opacity: 0;
        }

        .project-heading-number {
          display: inline-flex;
          width: 1.3em;
          height: 1.1em;
          box-sizing: content-box;
          padding-inline: 0.08em;
          font-size: 1em;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
          overflow: hidden;
        }

        .project-heading-digits {
          display: flex;
          flex-direction: column;
          width: 100%;
          line-height: 1.1;
          transition: transform 1200ms cubic-bezier(0.65, 0, 0.35, 1);
        }

        .project-heading-digits > span {
          display: block;
          min-width: 100%;
          text-align: center;
        }

        .project-heading-scene:hover .project-heading-front,
        .project-heading-scene:focus-within .project-heading-front,
        .project-heading-scene.is-flipped .project-heading-front {
          transform: rotateX(-90deg);
          opacity: 0;
        }

        .project-heading-scene:focus-within {
          outline: 2px solid currentColor;
          outline-offset: 0.12em;
          border-radius: 0.04em;
        }

        .project-heading-scene:hover .project-heading-back,
        .project-heading-scene:focus-within .project-heading-back,
        .project-heading-scene.is-flipped .project-heading-back {
          transform: rotateX(0deg);
          opacity: 1;
        }

        .project-heading-scene:hover .project-heading-digits,
        .project-heading-scene:focus-within .project-heading-digits,
        .project-heading-scene.is-flipped .project-heading-digits {
          transform: translateY(-1.1em);
        }

        @media (prefers-reduced-motion: reduce) {
          .project-heading-face,
          .project-heading-digits {
            transition: none;
          }
        }

        .dark .project-card.is-active,
        [data-theme="dark"] .project-card.is-active {
          background-color: #b45309 !important;
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
