"use client";

import { useState } from "react";
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

  return (
    <Section id="resume" className="overflow-hidden">
      {/* ── 1. Reusable Shared Section Header ── */}
      <SectionHeader
        title="Curriculum"
        titleSecondLine="Vitae."
        stickerText="OFFICIAL PDF"
        countBadge="04+ Yrs"
        description="Full-Stack Developer with nearly 4 years of experience building enterprise applications, modern web platforms, and scalable digital solutions."
      />

      {/* ── 2. Cinematic Futuristic Console Stage ── */}
      <div className="relative w-full max-w-full rounded-3xl border border-[#8b4513]/20 dark:border-[#b45309]/30 bg-gradient-to-b from-[#fdfbf7] via-white to-[#faf4ed] dark:from-[#140e09] dark:via-[#120c08] dark:to-[#1a130d] p-5 sm:p-8 md:p-12 overflow-hidden min-w-0">
        {/* Background Ambient Accent Glow Orbs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#8b4513]/10 dark:bg-[#b45309]/15 blur-3xl select-none" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#8b4513]/10 dark:bg-[#b45309]/15 blur-3xl select-none" />



        {/* ── Content Container ── */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* ── 3. Centered Header & Narrative ── */}
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider text-slate-900 dark:text-white uppercase font-sans">
              FULL-STACK DEVELOPER
            </h3>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base font-semibold text-slate-700 dark:text-slate-200 leading-relaxed max-w-2xl mx-auto">
              Nearly 4 Years of Experience building enterprise applications,
              business systems, and modern web platforms.
            </p>
            <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Specialized in Next.js, React, TypeScript, Node.js, Express.js, and
              Microsoft Power Platform, across education, healthcare, ERP, and
              e-commerce domains.
            </p>
          </div>

          {/* ── 4. Upper Circuit Tree Connecting Lines ── */}
          <div className="w-full flex justify-center my-3 sm:my-4 select-none pointer-events-none">
            <svg
              className="w-64 sm:w-80 md:w-96 h-8 sm:h-10 text-[#8b4513]/40 dark:text-[#b45309]/50"
              viewBox="0 0 384 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="192"
                y1="0"
                x2="192"
                y2="20"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="192" cy="20" r="3" fill="currentColor" />
              <line
                x1="96"
                y1="20"
                x2="288"
                y2="20"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="96"
                y1="20"
                x2="96"
                y2="40"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="288"
                y1="20"
                x2="288"
                y2="40"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="96" cy="40" r="2.5" fill="currentColor" />
              <circle cx="288" cy="40" r="2.5" fill="currentColor" />
            </svg>
          </div>

          {/* ── 5. Two Cards Side-by-Side ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full items-stretch">
            {/* ── Card 1: ACADEMIC BACKGROUND ── */}
            <div className="relative rounded-2xl border-2 border-[#8b4513]/30 dark:border-[#b45309]/35 bg-white/90 dark:bg-[#1a120c]/90 backdrop-blur-md p-4 sm:p-5 transition-all duration-300 hover:border-[#8b4513] dark:hover:border-[#b45309] flex flex-col justify-between">
              {/* Header Strip */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#8b4513]/15 dark:border-[#b45309]/20">
                <GraduationCap className="w-4 h-4 text-[#8b4513] dark:text-[#e09045]" />
                <span className="font-mono text-xs sm:text-[13px] font-extrabold uppercase tracking-widest text-[#8b4513] dark:text-[#e09045]">
                  ACADEMIC BACKGROUND
                </span>
              </div>

              {/* Card Body */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                {/* Icon Box */}
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-[#8b4513]/30 dark:border-[#b45309]/40 bg-[#8b4513]/8 dark:bg-[#b45309]/15 text-[#8b4513] dark:text-[#e09045] shadow-inner shrink-0">
                  <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm md:text-[15px] font-extrabold text-slate-900 dark:text-slate-100 leading-snug">
                    B.Sc. Electrical &amp; Computer Engineering (AMU)
                  </h4>
                  <span className="mt-1 font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-[#8b4513] dark:text-[#e09045] block truncate">
                    VERIFICATION DATA: [VERIFIED_AMU]
                  </span>
                </div>
              </div>
            </div>

            {/* ── Card 2: LOCATION & TIMEZONE ── */}
            <div className="relative rounded-2xl border-2 border-[#8b4513]/30 dark:border-[#b45309]/35 bg-white/90 dark:bg-[#1a120c]/90 backdrop-blur-md p-4 sm:p-5 transition-all duration-300 hover:border-[#8b4513] dark:hover:border-[#b45309] flex flex-col justify-between">
              {/* Header Strip */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#8b4513]/15 dark:border-[#b45309]/20">
                <MapPin className="w-4 h-4 text-[#8b4513] dark:text-[#e09045]" />
                <span className="font-mono text-xs sm:text-[13px] font-extrabold uppercase tracking-widest text-[#8b4513] dark:text-[#e09045]">
                  LOCATION &amp; TIMEZONE
                </span>
              </div>

              {/* Card Body */}
              <div className="flex items-center gap-3.5 sm:gap-4 justify-between">
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  {/* Icon Box */}
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-[#8b4513]/30 dark:border-[#b45309]/40 bg-[#8b4513]/8 dark:bg-[#b45309]/15 text-[#8b4513] dark:text-[#e09045] shadow-inner shrink-0">
                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  {/* Details */}
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm md:text-[15px] font-extrabold text-slate-900 dark:text-slate-100 leading-snug">
                      Addis Ababa, Ethiopia
                    </h4>
                    <span className="mt-1 font-mono text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 block">
                      (UTC+3)
                    </span>
                  </div>
                </div>

                {/* Radar Beacon Animation */}
                <div
                  className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 shrink-0 ml-2"
                  title="Active Location Ping"
                >
                  <div className="absolute inset-0 rounded-full border border-[#8b4513]/30 dark:border-[#b45309]/40 animate-ping opacity-40" />
                  <div className="absolute inset-1 rounded-full border border-[#8b4513]/40 dark:border-[#b45309]/50" />
                  <div className="absolute inset-2.5 rounded-full border border-[#8b4513]/60 dark:border-[#b45309]/70" />
                  <div className="relative z-10 w-5 h-5 rounded-full bg-[#8b4513]/20 dark:bg-[#b45309]/30 flex items-center justify-center text-[#8b4513] dark:text-[#e09045]">
                    <MapPin className="w-3 h-3 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 6. Lower Circuit Tree & Console Watermark ── */}
          <div className="w-full relative flex flex-col items-center justify-center my-3 sm:my-4 select-none pointer-events-none">
            <svg
              className="w-72 sm:w-96 md:w-[420px] h-8 sm:h-10 text-[#8b4513]/40 dark:text-[#b45309]/50"
              viewBox="0 0 420 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="105"
                y1="0"
                x2="105"
                y2="18"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="315"
                y1="0"
                x2="315"
                y2="18"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M105 18 H315"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="210"
                y1="18"
                x2="210"
                y2="40"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="210" cy="18" r="3" fill="currentColor" />
              <circle cx="210" cy="40" r="2.5" fill="currentColor" />
            </svg>
            <span className="font-mono text-[9px] text-[#8b4513]/30 dark:text-[#b45309]/40 tracking-widest uppercase mt-0.5">
              {"{system:terminal:cv_verification:ready}"}
            </span>
          </div>

          {/* ── 7. Action Buttons Row ── */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full">
            {/* Button 1: PREVIEW CV */}
            <button
              onClick={() => setIsCvOpen(true)}
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#8b4513]/40 hover:border-[#8b4513] dark:border-[#b45309]/50 dark:hover:border-[#b45309] bg-white/80 dark:bg-[#1a120c]/80 hover:bg-[#8b4513]/10 dark:hover:bg-[#b45309]/20 text-[#8b4513] dark:text-[#e09045] font-mono text-xs sm:text-sm font-bold tracking-wider uppercase px-5 sm:px-6 py-3 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(139,69,19,0.25)] dark:hover:shadow-[0_0_25px_rgba(180,83,9,0.35)] active:scale-95 w-full sm:w-auto"
            >
              <FileText className="w-4 h-4" />
              <span>PREVIEW CV</span>
            </button>

            {/* Button 2: DOWNLOAD CV (PDF) */}
            <a
              href="/cv/Nuhamin-Gulilat-CV.pdf"
              download="Nuhamin-Gulilat-CV.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#8b4513] dark:border-[#b45309] bg-[#8b4513] hover:bg-[#70360f] dark:bg-[#b45309] dark:hover:bg-[#92400e] text-white font-mono text-xs sm:text-sm font-black tracking-wider uppercase px-6 sm:px-7 py-3 transition-all duration-200 cursor-pointer shadow-[0_4px_16px_rgba(139,69,19,0.35)] dark:shadow-[0_4px_16px_rgba(180,83,9,0.45)] hover:shadow-[0_0_25px_rgba(139,69,19,0.5)] dark:hover:shadow-[0_0_30px_rgba(180,83,9,0.6)] active:scale-95 w-full sm:w-auto"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD CV (PDF)</span>
            </a>

            {/* Button 3: OPEN PDF IN TAB */}
            <a
              href="/cv/Nuhamin-Gulilat-CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#8b4513]/40 hover:border-[#8b4513] dark:border-[#b45309]/50 dark:hover:border-[#b45309] bg-white/80 dark:bg-[#1a120c]/80 hover:bg-[#8b4513]/10 dark:hover:bg-[#b45309]/20 text-[#8b4513] dark:text-[#e09045] font-mono text-xs sm:text-sm font-bold tracking-wider uppercase px-5 sm:px-6 py-3 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(139,69,19,0.25)] dark:hover:shadow-[0_0_25px_rgba(180,83,9,0.35)] active:scale-95 w-full sm:w-auto"
            >
              <ExternalLink className="w-4 h-4" />
              <span>OPEN PDF IN TAB</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── 8. Resume / CV Interactive Modal ── */}
      <ResumeModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </Section>
  );
}
