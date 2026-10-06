"use client";

import React, { useState } from "react";

interface SectionHeaderProps {
  tag?: string; // e.g. "[ 02 / SELECTED WORKS ]"
  title: string; // e.g. "Selected" or "Professional"
  titleSecondLine?: string; // e.g. "works." or "Experience."
  stickerText?: string; // e.g. "FROM 2021 — NOW", "4+ YEARS EXP"
  description?: string; // Right-aligned narrative description
  countBadge?: string | number; // e.g. "08", "04", "30+"
  className?: string;
}

export default function SectionHeader({
  tag,
  title,
  titleSecondLine,
  stickerText,
  description,
  countBadge,
  className = "",
}: SectionHeaderProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Clean count formatting for the folder stamp (e.g. "08", "04", "30+")
  const countDisplay =
    countBadge !== undefined
      ? typeof countBadge === "string"
        ? countBadge.match(/\d+[\+]?/)?.[0] || countBadge
        : countBadge < 10
        ? `0${countBadge}`
        : `${countBadge}`
      : "";

  return (
    <div className={`mb-14 sm:mb-20 lg:mb-24 w-full ${className}`}>
      {/* ── Top Tag / Category Breadcrumb ── */}
      {tag && (
        <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold tracking-widest text-[#8b4513] dark:text-[#e09045] uppercase mb-4 sm:mb-6">
          <span className="inline-block w-6 sm:w-8 h-[2px] bg-[#8b4513] dark:bg-[#e09045] rounded-full" />
          <span>{tag}</span>
        </div>
      )}

      {/* ── Main Grid: Headline on Left, 3D Folder & Description on Right ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column (7 cols): Giant Editorial Headline with Standardized Sticker */}
        <div className="lg:col-span-7 relative">
          <h2 className="text-5xl sm:text-7xl lg:text-[4.8rem] xl:text-[5.4rem] font-black tracking-tight text-[#1c140e] dark:text-[#faf6f0] leading-[0.95] relative inline-block">
            <span className="block">{title}</span>
            {titleSecondLine && (
              <span className="relative inline-flex items-center gap-3 sm:gap-4 flex-wrap mt-1">
                <span>{titleSecondLine}</span>

                {/* Standardized Uniform Vintage Badge with BLACK text */}
                {stickerText && (
                  <span className="inline-flex items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-lg bg-[#e29d57] dark:bg-[#d98b3f] text-[#120c06] font-extrabold text-[11px] sm:text-xs tracking-wider uppercase shadow-[0_4px_12px_rgba(226,157,87,0.35)] transform -rotate-3 hover:rotate-0 transition-all duration-200 select-none border border-[#f5c28a]/60 dark:border-amber-300/30 whitespace-nowrap">
                    {stickerText}
                  </span>
                )}
              </span>
            )}
          </h2>
        </div>

        {/* Right Column (5 cols): Ultra-realistic 3D Folder Icon & High-Contrast Description */}
        <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end min-h-[140px] sm:min-h-[170px] lg:min-h-[190px] gap-6">
          {/* Top: Premium Realistic Manila File Folder with Pure White Paper */}
          {countBadge !== undefined && (
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative cursor-pointer select-none transition-transform duration-300 hover:scale-105 self-start lg:self-end"
              aria-label="Section summary folder"
            >
              <div className="relative w-24 h-18 sm:w-28 sm:h-20">
                {/* 1. Back Manila Folder Flap with Tab */}
                <div
                  className="absolute inset-0 rounded-b-xl rounded-tr-2xl bg-gradient-to-br from-[#d9aa5e] via-[#e5be75] to-[#ba8b3e] shadow-md border border-[#f7d89b]/40"
                  style={{
                    clipPath: "polygon(0% 26%, 36% 26%, 46% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  }}
                />

                {/* 2. Pure White Document Paper Sheets Peeking Out */}
                {/* Background sub-sheet for realistic depth */}
                <div
                  className={`absolute left-4 right-4 top-1.5 h-11 rounded bg-white/85 border border-black/5 shadow-xs transition-transform duration-300 ease-out ${
                    isHovered ? "-translate-y-5 rotate-1" : "-translate-y-2 rotate-0.5"
                  }`}
                />
                {/* Main front pure white paper sheet */}
                <div
                  className={`absolute left-3 right-3 top-1 h-12 rounded-md bg-[#ffffff] border border-black/10 p-2 shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out flex flex-col justify-center gap-1.5 ${
                    isHovered ? "-translate-y-4" : "-translate-y-1.5"
                  }`}
                >
                  {/* Document heading line */}
                  <div className="w-8 sm:w-10 h-1 bg-[#c78b35]/70 rounded-full" />
                  {/* Subtle document content lines */}
                  <div className="w-12 sm:w-14 h-0.5 bg-neutral-300 rounded-full" />
                  <div className="w-9 sm:w-11 h-0.5 bg-neutral-200 rounded-full" />
                </div>

                {/* 3. Front Manila Pocket with Depth & Stamped Count */}
                <div className="absolute inset-x-0 bottom-0 h-14 sm:h-16 rounded-xl bg-gradient-to-t from-[#c48d37] via-[#e0ad5c] to-[#eec77d] border-t border-white/50 shadow-[0_12px_24px_rgba(0,0,0,0.18)] dark:shadow-[0_14px_30px_rgba(0,0,0,0.65)] flex flex-col justify-between p-2.5 sm:p-3">
                  {/* Pocket rim highlight */}
                  <div className="w-full h-[1px] bg-white/40 shadow-xs" />
                  
                  {/* Stamped Count Label */}
                  <div className="flex items-center justify-end">
                    <span className="font-mono text-base sm:text-lg font-black text-[#261608] tracking-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
                      {countDisplay}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom: Narrative Description with Enhanced Legibility & Contrast */}
          {description && (
            <p className="text-sm sm:text-base lg:text-[1.02rem] text-[#2c1f17] dark:text-[#e2d5cb] lg:text-right max-w-sm sm:max-w-md leading-relaxed font-medium">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
