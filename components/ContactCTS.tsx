"use client";

import React, { useState } from "react";
import { ArrowUp, Copy, Check, Mail, Phone, MessageCircleCheck } from "lucide-react";

export default function ContactCTA() {
  const [copied, setCopied] = useState<string | null>(null);
  const email = "nuhamin.gulilat.7@gmail.com";
  const phone = "+251 977 40 40 46";
  const currentYear = new Date().getFullYear();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="contact"
      className="w-full relative py-16 sm:py-24 lg:py-32 px-6 sm:px-12 lg:px-20 text-[#1c140e] dark:text-[#faf6f0] font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[65vh] sm:min-h-[75vh]">
        {/* ── 1. Top Row: Copyright & Back To Top ── */}
        <div className="flex items-center justify-between w-full">
          <div className="text-sm sm:text-base font-semibold tracking-tight text-[#1c140e]/60 dark:text-[#faf6f0]/60">
            © {currentYear}
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="group inline-flex items-center gap-3 cursor-pointer text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c140e] dark:text-[#faf6f0] transition-opacity hover:opacity-80"
          >
            <span className="hidden xs:inline tracking-wider">BACK TO TOP</span>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1c140e] dark:bg-[#faf6f0] text-white dark:text-[#120c08] flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 shadow-sm">
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
          </button>
        </div>

        {/* ── 2. Middle Row: Editorial Giant Headline & Direct Contacts ── */}
        <div className="my-14 sm:my-20 lg:my-28 flex flex-col items-start w-full">
          <span className="text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] uppercase text-[#1c140e]/70 dark:text-[#faf6f0]/70 mb-2 sm:mb-4">
            HAVE A PROJECT IN MIND?
          </span>

          {/* Giant Editorial LET'S TALK Headline */}
          <a
            href={`mailto:${email}`}
            className="group block w-full select-none"
          >
            <h2 className="text-6xl xs:text-8xl sm:text-[10rem] md:text-[13rem] lg:text-[15rem] font-black tracking-tighter leading-[0.85] text-neutral-200 dark:text-neutral-800 group-hover:text-[#8b4513] dark:group-hover:text-[#d97706] transition-colors duration-300 uppercase">
              LET&apos;S TALK
            </h2>
          </a>

          {/* Quick Contact & Copy Bar */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
            <button
              onClick={() => handleCopy(email, "email")}
              type="button"
              className="inline-flex items-center gap-2 text-[#8b4513] dark:text-[#d97706] hover:underline cursor-pointer font-bold"
            >
              <Mail className="w-4 h-4" />
              <span>{copied === "email" ? "✓ Email Copied!" : email}</span>
            </button>

            <span className="text-[#1c140e]/30 dark:text-[#faf6f0]/30">•</span>

            <button
              onClick={() => handleCopy(phone, "phone")}
              type="button"
              className="inline-flex items-center gap-2 text-[#1c140e]/75 dark:text-[#faf6f0]/75 hover:text-[#8b4513] dark:hover:text-[#d97706] hover:underline cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>{copied === "phone" ? "✓ Phone Copied!" : phone}</span>
            </button>

            <span className="text-[#1c140e]/30 dark:text-[#faf6f0]/30 hidden sm:inline">•</span>

            <a
              href="https://t.me/Nuhamin_07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#1c140e]/75 dark:text-[#faf6f0]/75 hover:text-[#8b4513] dark:hover:text-[#d97706] hover:underline"
            >
              <MessageCircleCheck className="w-4 h-4" />
              <span>Telegram: @Nuhamin_07</span>
            </a>
          </div>
        </div>

        {/* ── 3. Bottom Row: Rounded Pill Buttons & Studio Credits ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-[#1c140e]/10 dark:border-white/10 w-full">
          {/* Left: Capsule Pill Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="https://github.com/Nuhamin-07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 sm:px-9 py-3 rounded-full border border-[#1c140e]/20 dark:border-white/20 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c140e] dark:text-[#faf6f0] hover:bg-[#8b4513] hover:border-[#8b4513] hover:text-white dark:hover:bg-[#8b4513] dark:hover:border-[#8b4513] dark:hover:text-white transition-all duration-200 active:scale-95"
            >
              GITHUB
            </a>

            <a
              href="https://linkedin.com/in/nuhamin-gulilat-66635318b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 sm:px-9 py-3 rounded-full border border-[#1c140e]/20 dark:border-white/20 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c140e] dark:text-[#faf6f0] hover:bg-[#8b4513] hover:border-[#8b4513] hover:text-white dark:hover:bg-[#8b4513] dark:hover:border-[#8b4513] dark:hover:text-white transition-all duration-200 active:scale-95"
            >
              LINKEDIN
            </a>

            <a
              href="https://t.me/Nuhamin_07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 sm:px-9 py-3 rounded-full border border-[#1c140e]/20 dark:border-white/20 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c140e] dark:text-[#faf6f0] hover:bg-[#8b4513] hover:border-[#8b4513] hover:text-white dark:hover:bg-[#8b4513] dark:hover:border-[#8b4513] dark:hover:text-white transition-all duration-200 active:scale-95"
            >
              TWITTER / TELEGRAM
            </a>
          </div>

          {/* Right: Studio Credits */}
          <div className="text-left md:text-right text-xs sm:text-sm font-medium text-[#1c140e]/70 dark:text-[#faf6f0]/70 leading-relaxed">
            <div>Design &amp; Development by Nuhamin Gulilat</div>
            <div>Full-Stack Developer &bull; Available for Global Roles</div>
          </div>
        </div>
      </div>
    </section>
  );
}