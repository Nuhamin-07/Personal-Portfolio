"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ResumeModal from "@/components/ResumeModal";
import { X } from "lucide-react";

const navItems = [
  { name: "About", href: "#about", id: "about" },
  { name: "Work", href: "#projects", id: "projects" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Skills", href: "#skills", id: "skills" },
];

const allPageLinks = [
  { name: "HOME", href: "#hero" },
  { name: "ABOUT", href: "#about" },
  { name: "PROJECTS", href: "#projects" },
  { name: "EXPERIENCE", href: "#experience" },
  { name: "SKILLS", href: "#skills" },
  { name: "CERTIFICATIONS", href: "#certifications" },
  { name: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(navItems[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(navItems[i].id);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection("about");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when fullscreen menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#fdfbf7]/95 dark:bg-[#120c08]/95 backdrop-blur-md transition-all duration-200">
        <div className="mx-auto max-w-7xl px-6 sm:px-4 lg:px-8">
          <div className="flex h-24 sm:h-28 items-center justify-between">
            {/* Logo / Brand - Flush with Left Edge */}
            <Link
              href="/"
              className="flex items-center gap-3.5 transition-transform hover:scale-102 group p-0 m-0"
            >
              <img
                src="/logo.png"
                alt="Nuhamin Gulilat Logo"
                className="h-14 sm:h-18 md:h-20 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <span className="flex items-baseline gap-1.5 text-2xl sm:text-3xl font-black tracking-tight text-[#1c140e] dark:text-[#faf6f0]">
                Nuhamin Gulilat
                <span className="text-[10px] font-bold tracking-wider text-white bg-[#8b4513] dark:bg-[#b45309] px-1.5 py-0.5 rounded-full leading-none align-baseline">.dev</span>
              </span>
            </Link>

            {/* Desktop Center Links with Hand-Drawn Animated Arrow Indicator */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setActiveSection(item.id)}
                    className={`relative py-2 text-base font-bold transition-all duration-200 group ${isActive
                      ? "text-[#8b4513] dark:text-[#c26510]"
                      : "text-[#574134] dark:text-[#d4c3b7] hover:text-[#8b4513] dark:hover:text-[#c26510]"
                      }`}
                  >
                    <span>{item.name}</span>

                    {/* Hand-Drawn Animated Arrow Underline (Hero Style) */}
                    {isActive && (
                      <div className="absolute -bottom-2 left-0 right-0 h-4 pointer-events-none flex justify-center animate-in fade-in zoom-in-75 duration-300">
                        <svg
                          viewBox="0 0 75 20"
                          fill="none"
                          className="w-full h-full text-[#8b4513] dark:text-[#c26510] drop-shadow-xs"
                        >
                          {/* Playful curved hand-drawn underline */}
                          <path
                            d="M 4,8 C 22,2 45,18 70,8"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            fill="none"
                            className="[stroke-dasharray:100] [stroke-dashoffset:0] animate-[dash_0.4s_ease-in-out]"
                          />
                          {/* Pointing arrow head */}
                          <path
                            d="M 58,4 L 71,8 L 61,15"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </div>
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Controls: CV Preview + Contact CTA + Fullscreen Menu Trigger */}
            <div className="flex items-center gap-4 sm:gap-5">
              <button
                onClick={() => setIsCvOpen(true)}
                type="button"
                className="hidden sm:inline-block text-base font-semibold text-[#574134] dark:text-[#d4c3b7] hover:text-[#8b4513] dark:hover:text-[#b45309] transition-colors px-2 py-2 cursor-pointer"
              >
                CV Preview
              </button>

              <a
                href="#contact"
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#8b4513] hover:bg-[#70360f] dark:bg-[#b45309] dark:hover:bg-[#92400e] px-7 py-3 text-sm sm:text-base font-bold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              >
                Contact Me
              </a>

              {/* Modern Hamburger Button (Desktop & Mobile) */}
              <button
                onClick={() => setIsMenuOpen(true)}
                type="button"
                className="flex items-center justify-center rounded-full p-3 text-[#1c140e] dark:text-[#faf6f0] hover:bg-[#f3e7dc] dark:hover:bg-[#2a1d15] transition-all cursor-pointer group"
                aria-label="Open Fullscreen Menu"
              >
                <div className="flex flex-col gap-1.5 w-6 items-end">
                  <span className="h-0.5 w-6 bg-[#1c140e] dark:bg-[#faf6f0] transition-all group-hover:w-6" />
                  <span className="h-0.5 w-4 bg-[#8b4513] dark:bg-[#b45309] transition-all group-hover:w-6" />
                  <span className="h-0.5 w-5 bg-[#1c140e] dark:bg-[#faf6f0] transition-all group-hover:w-6" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FULLSCREEN AGENCY OVERLAY MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#ffffff] dark:bg-[#120c08] text-[#1c140e] dark:text-[#faf6f0] px-6 sm:px-8 lg:px-12 py-8 sm:py-12 animate-in fade-in duration-300 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl flex flex-col justify-between h-full min-h-[90vh]">
            {/* Top Bar with 2X Logo */}
            <div className="flex items-center justify-between w-full">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 transition-transform hover:scale-102 p-0 m-0"
              >
                <img
                  src="/logo.png"
                  alt="Nuhamin Logo"
                  className="h-18 sm:h-22 md:h-26 w-auto object-contain drop-shadow-md"
                />
                <span className="flex items-baseline gap-1.5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#1c140e] dark:text-[#faf6f0]">
                  Nuhamin Gulilat
                  <span className="text-[10px] font-bold tracking-wider text-white bg-[#8b4513] dark:bg-[#b45309] px-1.5 py-0.5 rounded-full leading-none align-baseline">.dev</span>
                </span>
              </Link>

              <button
                onClick={() => setIsMenuOpen(false)}
                type="button"
                className="p-3 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer group"
                aria-label="Close menu"
              >
                <X className="w-8 h-8 sm:w-11 sm:h-11 text-[#1c140e] dark:text-[#faf6f0] transition-transform group-hover:rotate-90 duration-300" />
              </button>
            </div>

            {/* Center Links with Large Bold Typography & Arrows */}
            <div className="w-full my-auto py-8 sm:py-12">
              <nav className="flex flex-col space-y-3 sm:space-y-4 px-5 lg:px-10">
                {allPageLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-center gap-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight hover:text-[#8b4513] dark:hover:text-[#b45309] transition-all duration-200"
                  >
                    <span className="leading-tight">{link.name}</span>
                    <span className="text-2xl sm:text-4xl lg:text-5xl font-light text-neutral-400 dark:text-neutral-600 transition-transform duration-300 group-hover:translate-x-4 group-hover:text-[#8b4513] dark:group-hover:text-[#b45309]">
                      →
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Footer Info */}
            <div className="w-full pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#786454] dark:text-[#a89587]">
              <div className="flex items-center gap-6 sm:gap-10">
                <a
                  href="https://linkedin.com/in/nuhamin-gulilat-66635318b"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#8b4513] dark:hover:text-[#b45309] transition-colors"
                >
                  LINKEDIN
                </a>
                <a
                  href="https://github.com/Nuhamin-07"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#8b4513] dark:hover:text-[#b45309] transition-colors"
                >
                  GITHUB
                </a>
                <a
                  href="mailto:nuhamingulilat7@gmail.com"
                  className="hover:text-[#8b4513] dark:hover:text-[#b45309] transition-colors"
                >
                  EMAIL
                </a>
              </div>

              <div>
                <span>© {new Date().getFullYear()} NUHAMIN GULILAT</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resume Modal */}
      <ResumeModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </>
  );
}
