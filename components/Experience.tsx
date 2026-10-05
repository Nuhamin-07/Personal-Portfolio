"use client";

import { useState, useEffect, useCallback } from "react";
import { experiences, ExperienceItem } from "@/data/experiences";
import Section from "@/components/shared/Section";
import {
  Briefcase,
  Calendar,
  MapPin,
  Sparkles,
  Building2,
  CheckCircle2,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";

const AUTOPLAY_INTERVAL = 3000; // 3 seconds display time per experience
const ANIMATION_DURATION = 1400; // 1400ms smooth overlap transition duration

export default function Experience() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isSlideActive, setIsSlideActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const total = experiences.length;

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Bottom-to-top overlapping transition trigger
  const startTransition = useCallback(
    (targetIndex: number) => {
      if (isAnimating || targetIndex === currentIndex) return;

      setIsAnimating(true);
      setIncomingIndex(targetIndex);
      setIsSlideActive(false);
    },
    [currentIndex, isAnimating]
  );

  // Next and Previous handlers
  const nextSlide = useCallback(() => {
    const nextIdx = (currentIndex + 1) % total;
    startTransition(nextIdx);
  }, [currentIndex, total, startTransition]);

  const prevSlide = useCallback(() => {
    const prevIdx = (currentIndex - 1 + total) % total;
    startTransition(prevIdx);
  }, [currentIndex, total, startTransition]);

  const goToSlide = (index: number) => {
    startTransition(index);
  };

  // Two-phase animation trigger: once incoming card is mounted at initial position (translateY 75%), animate to translateY(0%)
  useEffect(() => {
    if (incomingIndex !== null && !isSlideActive) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsSlideActive(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [incomingIndex, isSlideActive]);

  // Complete transition after duration finishes
  useEffect(() => {
    if (incomingIndex === null || !isSlideActive) return;

    const duration = reducedMotion ? 200 : ANIMATION_DURATION;
    const timer = setTimeout(() => {
      setCurrentIndex(incomingIndex);
      setIncomingIndex(null);
      setIsSlideActive(false);
      setIsAnimating(false);
      setProgress(0);
    }, duration);

    return () => clearTimeout(timer);
  }, [incomingIndex, isSlideActive, reducedMotion]);

  // Autoplay timer effect
  useEffect(() => {
    if (isPaused || isAnimating) return;

    const startTime = Date.now();
    setProgress(0);

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / AUTOPLAY_INTERVAL) * 100);
      setProgress(pct);
    }, 50);

    const timer = setTimeout(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [currentIndex, isPaused, isAnimating, nextSlide]);

  // Render Card Content Helper
  const renderCardContent = (exp: ExperienceItem, index: number) => {
    const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;
    return (
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          {/* Card Top Meta Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
            <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
              <span className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-mono text-sm sm:text-base font-black shadow-sm">
                {formattedIndex}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                    {exp.role}
                  </h3>
                  <span className="hidden sm:inline text-muted-foreground/60">•</span>
                  <span className="text-base sm:text-lg font-semibold text-primary">
                    {exp.company}
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground font-medium">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary/70" />
                    {exp.location}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-primary/70" />
                    {exp.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Date Period Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs sm:text-sm font-semibold text-primary">
              <Calendar className="w-4 h-4" />
              {exp.period}
            </span>
          </div>

          {/* Associated Project Tag */}
          {exp.project && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-amber-700 dark:text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Key Project: {exp.project}</span>
            </div>
          )}

          {/* Summary Description */}
          <p className="mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
            {exp.description}
          </p>

          {/* Key Responsibilities List */}
          <div className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              <span>Key Responsibilities & Impact</span>
            </h4>
            <ul className="space-y-2.5">
              {exp.responsibilities.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technologies Stack */}
        <div className="mt-8 pt-6 border-t border-border/60">
          <h5 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Technologies & Tools Used
          </h5>
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full bg-primary/10 border border-primary/15 px-3.5 py-1 font-mono text-xs font-medium text-primary dark:bg-primary/15 dark:text-primary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Section id="experience">
      {/* Section Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Career Track</span>
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Professional Experience
        </h2>

        <p className="mt-3.5 text-base text-muted-foreground sm:text-lg leading-relaxed">
          Nearly 4 years of hands-on software development experience building web products, enterprise systems, and client solutions.
        </p>

        {/* Navigation Tabs & Autoplay Toggle */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {experiences.map((exp, idx) => {
            const isActive = currentIndex === idx || incomingIndex === idx;
            return (
              <button
                key={exp.company + idx}
                type="button"
                onClick={() => goToSlide(idx)}
                disabled={isAnimating}
                className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md scale-105 ring-2 ring-primary/30"
                    : "border border-border/80 bg-card text-muted-foreground hover:bg-muted hover:text-foreground hover:border-primary/40"
                }`}
                aria-label={`Go to experience ${idx + 1}: ${exp.company}`}
              >
                <span
                  className={`font-mono text-[11px] px-1.5 py-0.5 rounded-md ${
                    isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  0{idx + 1}
                </span>
                <span>{exp.company}</span>
              </button>
            );
          })}

          {/* Pause / Play Autoplay Toggle */}
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-border/80 bg-card text-muted-foreground hover:bg-muted hover:text-foreground transition-all cursor-pointer ml-1"
            aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
            title={isPaused ? "Resume autoplay" : "Pause autoplay"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-primary fill-primary" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Experience Card Stage */}
      <div
        className="max-w-4xl mx-auto relative px-2 sm:px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Animated Progress Bar */}
        <div className="w-full bg-border/40 h-1.5 rounded-full overflow-hidden mb-6 max-w-md mx-auto">
          <div
            className="bg-primary h-full transition-all duration-75 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Card Stage Container with Side Navigation Controls */}
        <div className="relative">
          {/* Previous Slide Button */}
          <button
            type="button"
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-border/80 bg-background/90 text-foreground shadow-xl backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 hover:border-primary cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous experience"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Next Slide Button */}
          <button
            type="button"
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-border/80 bg-background/90 text-foreground shadow-xl backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 hover:border-primary cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next experience"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Overlapping Card Container Stage */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-card shadow-xl">
            {/* 1. Layout Spacer (invisible, in DOM flow to maintain responsive section height) */}
            <div
              className="invisible pointer-events-none select-none p-6 sm:p-8 lg:p-10"
              aria-hidden="true"
            >
              {renderCardContent(experiences[currentIndex], currentIndex)}
            </div>

            {/* 2. Current Card (Layer 1 - z-index 10, stays stationary behind) */}
            <article
              className="absolute inset-0 z-10 w-full h-full p-6 sm:p-8 lg:p-10 bg-card rounded-2xl sm:rounded-3xl border border-border/80 shadow-md flex flex-col justify-between overflow-y-auto"
              style={{ transform: "translateY(0)" }}
            >
              {renderCardContent(experiences[currentIndex], currentIndex)}
            </article>

            {/* 3. Incoming Card (Layer 2 - z-index 20, emerges from bottom inside container & slides up over current card) */}
            {incomingIndex !== null && (
              <article
                className="absolute inset-0 z-20 w-full h-full p-6 sm:p-8 lg:p-10 bg-card rounded-2xl sm:rounded-3xl border border-border/80 border-t-2 border-t-primary/40 shadow-[0_-15px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_-15px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-y-auto"
                style={{
                  transition: reducedMotion
                    ? "opacity 200ms ease"
                    : "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)",
                  transform: reducedMotion
                    ? "translateY(0)"
                    : isSlideActive
                    ? "translateY(0%) scale(1)"
                    : "translateY(75%) scale(0.98)",
                  opacity: reducedMotion ? (isSlideActive ? 1 : 0) : 1,
                }}
              >
                {renderCardContent(experiences[incomingIndex], incomingIndex)}
              </article>
            )}
          </div>
        </div>

        {/* Pagination Indicator Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {experiences.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToSlide(idx)}
              disabled={isAnimating}
              className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer ${
                (currentIndex === idx && incomingIndex === null) || incomingIndex === idx
                  ? "w-8 bg-primary"
                  : "w-2.5 bg-border hover:bg-muted-foreground/40"
              }`}
              aria-label={`Go to experience ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}