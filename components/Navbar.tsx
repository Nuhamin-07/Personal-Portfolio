"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import ResumeModal from "@/components/ResumeModal";

const navLinks = [
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Certifications", href: "#certifications" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Brand */}
            <Link
              href="#"
              className="group flex items-center gap-2 text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm text-primary group-hover:bg-primary group-hover:text-white transition-all">
                NG
              </span>
              <span>
                Nuhamin<span className="text-primary">.dev</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 backdrop-blur-sm shadow-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop CTAs & Theme Toggle */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              
              <button
                onClick={() => setIsCvOpen(true)}
                type="button"
                className="rounded-lg border border-primary/40 bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-white cursor-pointer"
              >
                📄 CV / Resume
              </button>

              <a
                href="#contact"
                className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow"
              >
                Get In Touch
              </a>
            </div>

            {/* Mobile Right Controls: Theme Toggle & Hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card p-2 text-foreground transition-colors hover:bg-muted cursor-pointer"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Slide-Out Drawer */}
          {isOpen && (
            <div className="mt-3 rounded-2xl border border-border bg-card p-5 shadow-2xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200 relative z-50">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-4 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-3 border-t border-border flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsCvOpen(true);
                    }}
                    type="button"
                    className="w-full text-center rounded-lg border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary cursor-pointer"
                  >
                    📄 View / Download CV
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow"
                  >
                    Get In Touch
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <ResumeModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </>
  );
}



