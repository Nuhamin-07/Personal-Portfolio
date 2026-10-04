"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { MapPin, Code2, Zap } from "lucide-react";
import ResumeModal from "@/components/ResumeModal";

export default function Hero() {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Helper: query within hero container
    const qs = (sel: string) => container.querySelector(sel);
    const qsa = (sel: string) => container.querySelectorAll(sel);

    const tl = gsap.timeline();
    tl.fromTo(
        qsa(".hero-headline-line"),
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.15, ease: "power4.out" }
      )
      .fromTo(
        qs(".hero-location"),
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        qsa(".hero-cta"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        qs(".hero-portrait"),
        { scale: 0.85, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.85, ease: "back.out(1.4)" },
        "-=0.7"
      )
      .fromTo(
        qs(".hero-hire-badge"),
        { scale: 0, opacity: 0, rotation: -160 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.7, ease: "back.out(1.7)" },
        "-=0.4"
      )
      .fromTo(
        qs(".hero-card"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
        "-=0.3"
      );

    // Arrow draw-in
    if (arrowRef.current) {
      const path = arrowRef.current.querySelector(
        ".twisted-arrow-path"
      ) as SVGPathElement | null;
      if (path) {
        const length = path.getTotalLength ? path.getTotalLength() : 260;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(
          path,
          { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" },
          "-=0.5"
        );
      }
      gsap.to(arrowRef.current, {
        y: -6,
        rotation: 3,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Spinning portrait ring
    const ringAnim = ringRef.current
      ? gsap.to(ringRef.current, {
          rotation: 360,
          duration: 16,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        })
      : null;

    // Glow pulse
    const glowEl = qs(".hero-glow");
    const glowAnim = glowEl
      ? gsap.to(glowEl, {
          scale: 1.18,
          opacity: 0.65,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      : null;

    return () => {
      tl.kill();
      ringAnim?.kill();
      glowAnim?.kill();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full pt-2 pb-6 lg:pt-3 lg:pb-8 overflow-hidden"
    >
      {/* Radial ambient glow */}
      <div
        className="hero-glow absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,69,19,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col gap-6 lg:gap-8 relative z-10">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8 pt-1">

          {/* ── Left Column ── */}
          <div className="relative lg:col-span-7 flex flex-col justify-center">

            {/* Headline — each line clips from below */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.9rem] xl:text-[4.5rem] font-black tracking-tight text-[#1c140e] dark:text-[#faf6f0] leading-[1.08]">
              <span className="block overflow-hidden pb-1">
                <span className="hero-headline-line block">Hi, I&apos;m Nuhamin</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-headline-line block">
                  Gulilat,{" "}
                  <span className="text-[#8b4513] dark:text-[#c26510] relative inline-block">
                    Full‑Stack
                    <svg
                      className="absolute -bottom-1 left-0 w-full"
                      viewBox="0 0 200 8"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M2,5 C40,1 80,7 120,3 C160,-1 190,6 198,4"
                        stroke="#8b4513"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="dark:stroke-[#c26510] opacity-50"
                      />
                    </svg>
                  </span>
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-headline-line block text-[#8b4513] dark:text-[#c26510]">
                  Developer
                </span>
              </span>
            </h1>

            {/* Hand-drawn twisted arrow */}
            <div className="hidden md:block absolute right-2 bottom-3 lg:-right-2 lg:bottom-3 w-48 h-24 pointer-events-none z-10">
              <svg
                ref={arrowRef}
                viewBox="0 0 180 90"
                fill="none"
                className="w-full h-full text-[#38261a] dark:text-[#e8d5c8]"
              >
                <path
                  className="twisted-arrow-path"
                  d="M 12,38 C 45,6 78,80 102,48 C 114,30 96,12 115,10 C 135,8 154,42 172,52"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 154,52 L 174,53 L 165,36"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Location */}
            <div className="hero-location mt-6 sm:mt-7 flex items-center gap-2.5 text-sm sm:text-base font-semibold text-[#664d3d] dark:text-[#c9b4a5]">
              <div className="flex items-center justify-center p-1.5 rounded-full bg-[#8b4513]/10 text-[#8b4513] dark:text-[#c26510] animate-bounce">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span>Based in Addis Ababa, Ethiopia.</span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="hero-cta group inline-flex items-center gap-2 rounded-full bg-[#8b4513] hover:bg-[#70360f] dark:bg-[#b45309] dark:hover:bg-[#92400e] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 cursor-pointer"
              >
                <Code2 className="w-4 h-4" />
                View My Work
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="hero-cta group inline-flex items-center gap-2 rounded-full border-2 border-[#8b4513]/40 dark:border-[#b45309]/40 bg-transparent hover:bg-[#8b4513]/10 dark:hover:bg-[#b45309]/10 px-7 py-3.5 text-sm font-bold text-[#8b4513] dark:text-[#c26510] transition-all duration-300 hover:scale-105 hover:border-[#8b4513] dark:hover:border-[#c26510] active:scale-95 cursor-pointer"
              >
                <Zap className="w-4 h-4 transition-transform group-hover:rotate-12" />
                Let&apos;s Talk
              </button>
            </div>
          </div>

          {/* ── Right Column: Portrait ── */}
          <div className="lg:col-span-5 flex justify-center items-center relative pr-4 sm:pr-8">
            <div className="hero-portrait relative w-64 h-64 sm:w-76 sm:h-76 lg:w-[21rem] lg:h-[21rem] xl:w-[23rem] xl:h-[23rem] flex items-center justify-center">

              {/* Spinning gradient ring */}
              <div className="absolute inset-0 rounded-full pointer-events-none" style={{ willChange: "transform" }}>
                <svg ref={ringRef} viewBox="0 0 400 400" className="w-full h-full opacity-30">
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b4513" />
                      <stop offset="50%" stopColor="transparent" />
                      <stop offset="100%" stopColor="#c26510" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="200" cy="200" r="192"
                    fill="none"
                    stroke="url(#ringGrad)"
                    strokeWidth="3"
                    strokeDasharray="80 40"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Soft circular background */}
              <div className="absolute inset-0 rounded-full bg-[#f0e4d8] dark:bg-[#261a12] shadow-inner" />

              {/* Portrait image */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-[#faf4ed] dark:border-[#1c130d]">
                <img
                  src="/nuhamin-img.jpg"
                  alt="Nuhamin Gulilat"
                  className="w-full h-full object-cover object-top grayscale-[8%] contrast-[105%] hover:grayscale-0 transition-all duration-500 hover:scale-105"
                />
              </div>

              {/* ── HIRE ME BADGE ── */}
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="hero-hire-badge absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6 lg:-right-8 w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-[#8b4513] hover:bg-[#70360f] text-white flex flex-col items-center justify-center shadow-2xl transition-colors duration-300 hover:scale-110 active:scale-95 group cursor-pointer z-30 ring-4 ring-white dark:ring-[#120c08]"
                aria-label="Hire Nuhamin - Scroll to Contact"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Curved "HIRE ME" arc text */}
                <svg
                  viewBox="0 0 120 120"
                  className="absolute inset-0 w-full h-full p-1 pointer-events-none"
                  aria-hidden="true"
                >
                  <defs>
                    <path
                      id="hireMeArc"
                      d="M 10,68 A 50,50 0 0,1 110,68"
                      fill="none"
                    />
                  </defs>
                  <text
                    fontSize="17"
                    fontWeight="900"
                    letterSpacing="4"
                    fill="white"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    textAnchor="middle"
                  >
                    <textPath href="#hireMeArc" startOffset="50%">
                      HIRE ME
                    </textPath>
                  </text>
                </svg>

                {/* Centred down arrow */}
                <svg
                  className="h-7 w-7 lg:h-8 lg:w-8 text-white mt-5 transition-transform duration-300 group-hover:translate-y-1.5 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── BOTTOM DARK CARD ── */}
        <div className="hero-card w-full rounded-3xl bg-[#160f0b] border border-[#38261a] text-white p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(139,69,19,0.15) 0%, transparent 70%)",
            }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col space-y-2.5 sm:space-y-3">
              <span className="text-[#d97706] text-xs sm:text-sm font-black tracking-widest uppercase">
                Testimonials
              </span>
              <blockquote className="text-lg sm:text-xl lg:text-[1.45rem] xl:text-[1.6rem] font-semibold leading-snug text-[#faf4ed] tracking-tight">
                "Working with Nuhamin has been a great experience. She is a very
                talented full-stack developer who builds robust, scalable web
                platforms."
              </blockquote>
              <div className="flex items-center gap-4 pt-1 sm:pt-1.5">
                <span className="text-[#d97706] font-bold text-base sm:text-lg">
                  Nuhamin Gulilat
                </span>
                <div className="h-[2px] w-24 sm:w-36 bg-[#d97706]/80" />
              </div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-start lg:justify-end gap-5">
              <div className="w-28 h-36 sm:w-36 sm:h-44 rounded-2xl overflow-hidden bg-[#241912] shadow-xl border border-[#4a3426] flex-shrink-0">
                <img
                  src="/nuhamin.jpg"
                  alt="Nuhamin Gulilat"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-3.5 flex-shrink-0">
                <a
                  href="#projects"
                  className="group inline-flex items-center justify-center gap-2 w-36 sm:w-40 py-3.5 rounded-full bg-[#241812] hover:bg-[#34231a] text-white text-xs sm:text-sm font-bold border border-[#4d3425] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span>Portfolio</span>
                  <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <button
                  onClick={() => scrollToSection("contact")}
                  type="button"
                  className="group inline-flex items-center justify-center gap-2 w-36 sm:w-40 py-3.5 rounded-full bg-gradient-to-r from-[#8b4513] to-[#a04e17] hover:from-[#73380e] hover:to-[#8b4513] text-white text-xs sm:text-sm font-bold transition-all duration-300 shadow-lg hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                >
                  <span>Hire Me</span>
                  <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ResumeModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </section>
  );
}
