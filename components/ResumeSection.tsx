"use client";

import { useState } from "react";
import Section from "@/components/shared/Section";
import ResumeModal from "@/components/ResumeModal";

export default function ResumeSection() {
  const [isCvOpen, setIsCvOpen] = useState(false);

  return (
    <Section id="resume" className="py-16">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-12 shadow-xl">
        {/* Background Ambient Accent Glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Text & Content Column */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <span>Verified Resume</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Curriculum Vitae / Resume
            </h2>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Full-Stack Developer with nearly 4 years of experience building enterprise applications, business systems, and modern web platforms. Specialized in Next.js, React, TypeScript, Node.js, Express.js, and Microsoft Power Platform solutions across education, healthcare, ERP, and e-commerce domains.
            </p>

            {/* Quick Details Badges */}
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
              <span className="rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-foreground">
                🎓 B.Sc. Electrical & Computer Engineering (AMU)
              </span>
              <span className="rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-foreground">
                💼 Nearly 4 Years Experience
              </span>
              <span className="rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-foreground">
                📍 Addis Ababa, Ethiopia (UTC+3)
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              {/* Preview CV Button */}
              <button
                onClick={() => setIsCvOpen(true)}
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:scale-105 cursor-pointer"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview CV
              </button>

              {/* Download CV Button */}
              <a
                href="/cv/Nuhamin-Gulilat-CV.pdf"
                download="Nuhamin-Gulilat-CV.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-xs transition-all hover:bg-muted hover:border-primary/40"
              >
                <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download CV (PDF)
              </a>

              {/* Direct Open PDF Link */}
              <a
                href="/cv/Nuhamin-Gulilat-CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors py-2 px-1"
              >
                Open PDF in Tab ↗
              </a>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs rounded-2xl border border-border bg-muted/30 p-6 text-center shadow-sm backdrop-blur-xs">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary text-3xl font-bold">
                📄
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">Nuhamin Gulilat CV</h3>
              <p className="mt-1 text-xs text-muted-foreground">Official Verified PDF Document</p>
              
              <div className="mt-5 space-y-2 pt-4 border-t border-border/60 text-left text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Format:</span>
                  <span className="font-mono text-foreground font-medium">PDF Document</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>File Name:</span>
                  <span className="font-mono text-foreground font-medium">Nuhamin-Gulilat-CV.pdf</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">✓ Up to Date</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CV Modal */}
      <ResumeModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </Section>
  );
}
