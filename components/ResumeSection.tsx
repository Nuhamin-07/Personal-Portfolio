"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import ResumeModal from "@/components/ResumeModal";
import {
  GraduationCap,
  MapPin,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";

export default function ResumeSection() {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const isNarrow = window.matchMedia("(max-width: 767px)").matches;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: content,
          start: "top 76%",
          once: true,
        },
      });

      timeline
        .fromTo(
          "[data-cv-rule]",
          { scaleX: 0, transformOrigin: "center center" },
          {
            scaleX: 1,
            duration: 0.85,
            ease: "power3.out",
            immediateRender: false,
          },
        )
        .fromTo(
          "[data-cv-title]",
          { clipPath: "inset(0 0 100% 0)", y: 20 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            immediateRender: false,
          },
          0.14,
        )
        .fromTo(
          "[data-cv-summary]",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            immediateRender: false,
          },
          0.43,
        )
        .fromTo(
          '[data-cv-credential="education"]',
          { opacity: 0, x: isNarrow ? -14 : -32, y: isNarrow ? 10 : 0 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.58,
            ease: "power3.out",
            immediateRender: false,
          },
          0.56,
        )
        .fromTo(
          '[data-cv-credential="location"]',
          { opacity: 0, x: isNarrow ? 14 : 32, y: isNarrow ? 10 : 0 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.58,
            ease: "power3.out",
            immediateRender: false,
          },
          0.68,
        )
        .fromTo(
          "[data-cv-actions]",
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.42,
            ease: "power3.out",
            immediateRender: false,
          },
          0.95,
        );
    }, content);

    return () => context.revert();
  }, []);

  return (
    <Section id="resume">
      <SectionHeader
        title="Curriculum"
        titleSecondLine="Vitae."
        description="Full-Stack Developer with nearly 4 years of experience building enterprise applications, modern web platforms, and scalable digital solutions."
        className="mb-8 sm:mb-12 lg:mb-16"
      />

      <div ref={contentRef} className="mx-auto max-w-6xl">
        <div className="relative grid gap-5 border-y border-[#8b4513]/20 py-8 sm:gap-8 sm:py-11 lg:grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-12">
          <div
            aria-hidden="true"
            data-cv-rule
            className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center bg-[#8b4513] dark:bg-[#e09045]"
          />
          <h3 data-cv-title className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Full-Stack Developer
          </h3>
          <div data-cv-summary className="max-w-3xl space-y-3">
            <p className="text-base font-medium leading-relaxed text-foreground sm:text-lg">
              Nearly 4 years of experience building enterprise applications,
              business systems, and modern web platforms.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Specialized in Next.js, React, TypeScript, Node.js, Express.js, and
              Microsoft Power Platform, across education, healthcare, ERP, and
              e-commerce domains.
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-1 border-b border-[#8b4513]/20 md:grid-cols-2">
          <div data-cv-credential="education" className="py-6 sm:py-8 md:pr-10">
            <dt className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b4513] dark:text-[#e09045]">
              <GraduationCap aria-hidden="true" className="h-4 w-4" />
              Academic background
            </dt>
            <dd className="text-base font-semibold leading-snug text-foreground sm:text-lg">
              B.Sc. Electrical &amp; Computer Engineering (AMU)
            </dd>
            <dd className="mt-1 text-sm text-muted-foreground">
              Verified at AMU
            </dd>
          </div>

          <div data-cv-credential="location" className="border-t border-[#8b4513]/20 py-6 sm:py-8 md:border-l md:border-t-0 md:pl-10">
            <dt className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b4513] dark:text-[#e09045]">
              <MapPin aria-hidden="true" className="h-4 w-4" />
              Location &amp; timezone
            </dt>
            <dd className="text-base font-semibold leading-snug text-foreground sm:text-lg">
              Addis Ababa, Ethiopia
            </dd>
            <dd className="mt-1 text-sm text-muted-foreground">UTC+3</dd>
          </div>
        </dl>

        <div data-cv-actions className="flex flex-col items-start gap-4 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
          <button
            onClick={() => setIsCvOpen(true)}
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#8b4513] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#70360f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b4513]"
          >
            <FileText aria-hidden="true" className="h-4 w-4" />
            <span>Preview CV</span>
          </button>

          <a
            href="/cv/Nuhamin-Gulilat-CV.pdf"
            download="Nuhamin-Gulilat-CV.pdf"
            className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-foreground underline decoration-[#8b4513]/40 underline-offset-4 transition-colors hover:text-[#8b4513] hover:decoration-[#8b4513] dark:hover:text-[#e09045]"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            <span>Download CV</span>
          </a>

          <a
            href="/cv/Nuhamin-Gulilat-CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-foreground underline decoration-[#8b4513]/40 underline-offset-4 transition-colors hover:text-[#8b4513] hover:decoration-[#8b4513] dark:hover:text-[#e09045]"
          >
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
            <span>Open PDF in new tab</span>
          </a>
        </div>
      </div>

      <ResumeModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </Section>
  );
}
