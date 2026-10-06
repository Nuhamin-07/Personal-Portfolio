"use client";

import { useState } from "react";
import Section from "@/components/shared/Section";

export default function ContactCTA() {
  const [copied, setCopied] = useState(false);
  const email = "nuhamin.gulilat.7@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border px-4 sm:px-8 md:px-12 py-10 sm:py-16 md:py-20 text-center text-foreground shadow-xl transition-colors">
        {/* Ambient Background Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <span>Get In Touch</span>
          </div>

          <h2 className="mt-4 text-2xl xs:text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground leading-tight">
            Let&apos;s build something exceptional together.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-base text-muted-foreground sm:text-lg leading-relaxed">
            I am currently open to full-time remote Full-Stack Developer &amp; Frontend Engineer roles, technical collaborations, and enterprise web projects. Operating on UTC+3 with flexible overlap for US &amp; EU timezones.
          </p>

          {/* Copyable Email Badge */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 rounded-xl border border-border bg-muted/60 px-3 sm:px-4 py-2 font-mono text-xs sm:text-sm font-medium text-primary backdrop-blur-sm shadow-sm max-w-full">
            <span className="truncate max-w-[220px] sm:max-w-none">✉️ {email}</span>
            <button
              onClick={copyEmail}
              type="button"
              className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-sans font-semibold text-primary transition-all hover:bg-primary hover:text-white cursor-pointer shrink-0"
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row w-full">
            <a
              href={`mailto:${email}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
            >
              <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Direct Email
            </a>

            <a
              href="https://linkedin.com/in/nuhamin-gulilat-66635318b"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-95"
            >
              Connect on LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}