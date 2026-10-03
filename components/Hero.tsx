"use client";

import { useState } from "react";
import ResumeModal from "@/components/ResumeModal";

export default function Hero() {
  const [isCvOpen, setIsCvOpen] = useState(false);

  return (
    <section className="w-full py-14 lg:py-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Bio & CTAs */}
          <div className="lg:col-span-7">
            {/* Availability & Location Badge */}
            <div className="flex flex-wrap items-center gap-3">
              {/* <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span>Available for Remote Roles (Global / US / EU)</span>
              </div> */}

              <span className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                📍 Addis Ababa, Ethiopia (UTC+3)
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
              Nuhamin Gulilat
            </h1>

            <h2 className="mt-3 text-xl font-semibold text-primary sm:text-2xl lg:text-3xl">
              Full-Stack Developer | Next.js • React • TypeScript • Node.js • Express.js
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Full-Stack Developer with 4 years of experience building enterprise applications, business systems, and modern web platforms. Specialized in Next.js, React, TypeScript, Node.js, Express.js, and Microsoft Power Platform solutions across education, healthcare, ERP, and e-commerce domains.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:scale-105"
              >
                View Projects
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>

              <button
                onClick={() => setIsCvOpen(true)}
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:border-primary/40 hover:bg-muted hover:text-primary-foreground cursor-pointer"
              >
                📄 Preview CV
              </button>

              <a
                href="/cv/Nuhamin-Gulilat-CV.pdf"
                download="Nuhamin-Gulilat-CV.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-5 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground shadow-xs"
              >
                📥 Download CV
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:text-primary-foreground cursor-pointer"
              >
                Get In Touch
              </a>
            </div>

            {/* Stats Summary Grid */}
            <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-primary/40">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">4</p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
                  Years Experience
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-primary/40">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">8+</p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
                  Featured Projects
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-primary/40">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">100%</p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
                  Remote Proven
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Developer Showcase Card */}
          <div className="lg:col-span-5 flex justify-center w-100 h-100 rounded-full border-1">
            <img src="/nuhamin-img.jpg" alt="Developer" className="w-full h-full object-cover w-100 h-100 rounded-full" />
            {/* <div className="relative w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl overflow-hidden transition-all hover:border-primary/50"> */}
            {/* Card Window Header */}
            {/* <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">nuhamin.ts</span>
                <span className="text-xs text-emerald-500 font-mono font-medium">● Available Remote</span>
              </div> */}

            {/* Code Snippet Content */}
            {/* <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto bg-[#070e1b] text-slate-100">
                <div>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-400">engineer</span>{" "}
                  <span className="text-slate-400">=</span> {"{"}
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">name:</span>{" "}
                  <span className="text-emerald-300">&quot;Nuhamin Gulilat Masresha&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">title:</span>{" "}
                  <span className="text-emerald-300">&quot;Full-Stack Developer&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">education:</span>{" "}
                  <span className="text-emerald-300">&quot;B.Sc. Computer Engineering&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">experience:</span>{" "}
                  <span className="text-amber-300">&quot;4 Years&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">techStack:</span> [
                </div>
                <div className="pl-8 text-sky-300">
                  &quot;Next.js&quot;, &quot;React&quot;, &quot;TypeScript&quot;,
                </div>
                <div className="pl-8 text-sky-300">
                  &quot;Node.js&quot;, &quot;Express&quot;, &quot;Power Platform&quot;
                </div>
                <div className="pl-4">],</div>
                <div className="pl-4">
                  <span className="text-slate-400">databases:</span>{" "}
                  <span className="text-emerald-300">&quot;MongoDB, MySQL, SQLite, Dataverse&quot;</span>
                </div>
                <div>{"};"}</div>

                <div className="mt-4 pt-4 border-t border-slate-800 text-slate-400 text-xs">
                  <span className="text-purple-400">console</span>.<span className="text-blue-400">log</span>(
                  <span className="text-emerald-300">&quot;Delivering high-quality software! 🚀&quot;</span>);
                </div>
              </div>

              {/* Card Footer Highlights *
              <div className="p-4 bg-muted/30 border-t border-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>Full-Stack & Enterprise</span>
                </div>
                <span className="font-medium text-foreground">Global Remote Ready</span>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </section>
  );
}


