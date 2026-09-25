"use client";

import { useState } from "react";
import ResumeModal from "@/components/ResumeModal";

export default function Hero() {
  const [isCvOpen, setIsCvOpen] = useState(false);

  return (
    <section className="w-full py-16 lg:py-24 relative overflow-hidden">
      {/* Background ambient blue-black lighting */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Bio & CTAs */}
          <div className="lg:col-span-7">
            {/* Availability & Remote Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span>Available for Remote Roles (US / EU / Global)</span>
              </div>

              <span className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                📍 Addis Ababa, Ethiopia (UTC+3)
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
              Nuhamin Gulilat
            </h1>

            <h2 className="mt-3 text-xl font-semibold text-primary sm:text-2xl lg:text-3xl">
              Full-Stack Developer & Frontend Engineer
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Building modern, performant web applications with{" "}
              <span className="font-semibold text-foreground">React, Next.js, TypeScript, Node.js, Express</span>, and enterprise cloud solutions. Nearly 4 years of hands-on experience crafting scalable SaaS platforms, automated Cypress test suites, and enterprise portals.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
              >
                View Projects
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>

              <button
                onClick={() => setIsCvOpen(true)}
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-5 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white shadow-sm cursor-pointer"
              >
                📄 View / Download CV
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:border-muted-foreground/30"
              >
                Get In Touch
              </a>
            </div>

            {/* Stats Summary Grid */}
            <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-primary/40">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Nearly 4</p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
                  Years Experience
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-primary/40">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">6+</p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
                  Production Systems
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-primary/40">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">100%</p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
                  Remote Proven
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Developer Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl overflow-hidden transition-all hover:border-primary/50">
              {/* Card Window Header */}
              <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">nuhamin.ts</span>
                <span className="text-xs text-emerald-500 font-mono font-medium">● Open to Remote</span>
              </div>

              {/* Code Snippet Content */}
              <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto bg-slate-950 text-slate-100">
                <div>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-400">engineer</span>{" "}
                  <span className="text-slate-400">=</span> {"{"}
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">name:</span>{" "}
                  <span className="text-emerald-300">&quot;Nuhamin Gulilat&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">degree:</span>{" "}
                  <span className="text-emerald-300">&quot;B.Sc. Computer Engineering&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">experience:</span>{" "}
                  <span className="text-amber-300">&quot;Nearly 4 Years&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">coreStack:</span> [
                </div>
                <div className="pl-8 text-sky-300">
                  &quot;Next.js&quot;, &quot;React&quot;, &quot;TypeScript&quot;,
                </div>
                <div className="pl-8 text-sky-300">
                  &quot;Node.js&quot;, &quot;Express&quot;, &quot;Cypress&quot;
                </div>
                <div className="pl-4">],</div>
                <div className="pl-4">
                  <span className="text-slate-400">enterprise:</span>{" "}
                  <span className="text-emerald-300">&quot;Power Pages & Dataverse&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">location:</span>{" "}
                  <span className="text-emerald-300">&quot;Addis Ababa (UTC+3)&quot;</span>
                </div>
                <div>{"};"}</div>

                <div className="mt-4 pt-4 border-t border-slate-800 text-slate-400 text-xs">
                  <span className="text-purple-400">console</span>.<span className="text-blue-400">log</span>(
                  <span className="text-emerald-300">&quot;Ready for your next big challenge! 🚀&quot;</span>);
                </div>
              </div>

              {/* Card Footer Highlights */}
              <div className="p-4 bg-muted/30 border-t border-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>Full-Stack & Frontend</span>
                </div>
                <span className="font-medium text-foreground">US/EU Remote Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </section>
  );
}

