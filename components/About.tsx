"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ABOUT_TEXT =
  "I'm a developer passionate about building seamless, high-performance digital experiences. With expertise in modern web technologies, clean code, and user-centric design, I create scalable solutions that bring ideas to life, whether front-end interfaces, backend systems, or full-stack development.";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const words = ABOUT_TEXT.split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const container = containerRef.current;
    const textContainer = textContainerRef.current;

    if (!section || !container || !textContainer) return;

    const wordElements = textContainer.querySelectorAll<HTMLSpanElement>(".about-word-item");
    if (!wordElements || wordElements.length === 0) return;

    const ctx = gsap.context(() => {
      // Pin the section when it reaches the top, and scrub through the words
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        scrub: 0.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          const totalWords = wordElements.length;
          // Calculate how many words should be highlighted based on scroll progress
          const activeIndex = Math.floor(self.progress * (totalWords + 1));

          wordElements.forEach((el, index) => {
            if (index < activeIndex) {
              el.classList.add("is-read");
            } else {
              el.classList.remove("is-read");
            }
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full min-h-screen relative text-[#1c140e] dark:text-[#faf6f0] flex flex-col justify-center overflow-hidden py-12 sm:py-16"
    >
      <div
        ref={containerRef}
        className="w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-between"
      >
        {/* ── 1. Top Section: Clean 2-Column Layout (Matching Reference Screenshot) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pt-4 sm:pt-8">
          {/* Left: ABOUT ME Title */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1c140e] dark:text-[#faf6f0] uppercase font-sans">
              ABOUT ME
            </h2>
          </div>

          {/* Right: Narrative with Pinned Scroll-Driven Reading Highlight */}
          <div
            ref={textContainerRef}
            className="lg:col-span-8 font-sans text-base sm:text-lg lg:text-[1.28rem] leading-[1.8] font-medium select-text"
          >
            <p className="flex flex-wrap gap-x-2 gap-y-2">
              {words.map((word, i) => {
                const clean = word.toLowerCase().replace(/[^a-z0-9-]/g, "");
                const isKeyWord = [
                  "developer",
                  "passionate",
                  "seamless",
                  "high-performance",
                  "expertise",
                  "clean",
                  "code",
                  "user-centric",
                  "scalable",
                  "solutions",
                  "front-end",
                  "backend",
                  "full-stack",
                ].includes(clean);

                return (
                  <span
                    key={i}
                    className={`about-word-item inline-block px-1.5 py-0.5 rounded-md ${
                      isKeyWord ? "is-keyword" : ""
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          </div>
        </div>

        {/* ── 2. Bottom Section: Elevated White/Dark Stats Card Over Solid Flat Brown Base ── */}
        <div className="mt-16 sm:mt-24 relative">
          {/* Solid Flat Big Base - Brand Brown (No Gradient) */}
          <div className="w-full h-44 sm:h-56 lg:h-64 rounded-2xl sm:rounded-3xl bg-[#8b4513] shadow-xl relative overflow-hidden" />

          {/* Floating Elevated Stats Card (Overlapping the Solid Base) */}
          <div className="absolute -top-10 sm:-top-14 inset-x-3 sm:inset-x-8 lg:inset-x-12 z-10 bg-white dark:bg-[#18110b] rounded-xl sm:rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.6)] p-6 sm:p-8 lg:p-10 border border-black/5 dark:border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 text-center items-center divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-white/10">
              {/* Stat 1 */}
              <div className="flex flex-col items-center justify-center p-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c140e] dark:text-[#faf6f0] tracking-tight">
                  10+
                </span>
                <span className="mt-2 text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 font-sans">
                  Awards & Certs
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center justify-center p-2 pt-4 sm:pt-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c140e] dark:text-[#faf6f0] tracking-tight">
                  4+
                </span>
                <span className="mt-2 text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 font-sans">
                  Years of Experience
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center justify-center p-2 pt-4 sm:pt-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#8b4513] dark:text-[#e08338] tracking-tight">
                  98%
                </span>
                <span className="mt-2 text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 font-sans">
                  Happy Clients
                </span>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center justify-center p-2 pt-4 sm:pt-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c140e] dark:text-[#faf6f0] tracking-tight">
                  20+
                </span>
                <span className="mt-2 text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 font-sans">
                  Projects Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-word-item {
          background-color: transparent;
          color: #2a1e16;
          transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
          will-change: transform;
        }
        .dark .about-word-item {
          color: #dfd7cc;
        }
        .about-word-item.is-read {
          background-color: rgba(139, 69, 19, 0.15);
          color: #8b4513;
          font-weight: 600;
        }
        .dark .about-word-item.is-read {
          background-color: rgba(217, 119, 6, 0.22);
          color: #fce7cf;
          font-weight: 600;
        }
        .about-word-item.is-read.is-keyword {
          background-color: #8b4513;
          color: #ffffff;
          font-weight: 700;
          transform: scale(1.08) translateY(-1px);
          box-shadow: 0 4px 12px rgba(139, 69, 19, 0.35);
        }
        .dark .about-word-item.is-read.is-keyword {
          background-color: #9a4d18;
          color: #ffffff;
          font-weight: 700;
          transform: scale(1.08) translateY(-1px);
          box-shadow: 0 4px 14px rgba(154, 77, 24, 0.55);
        }
      `}</style>
    </section>
  );
}