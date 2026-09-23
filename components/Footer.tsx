import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-card/50 py-12 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs text-primary">
                NG
              </span>
              <span>Nuhamin Gulilat</span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Full-Stack Developer specializing in building responsive, scalable,
              and performant web applications using React, Next.js, TypeScript, and Node.js.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com/Nuhamin-07"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="GitHub Profile"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/nuhamin-gulilat-66635318b/"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="LinkedIn Profile"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="mailto:nuhamin.gulilat.7@gmail.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="Email Me"
              >
                <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#projects" className="text-muted-foreground transition-colors hover:text-primary">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="text-muted-foreground transition-colors hover:text-primary">
                  Work Experience
                </a>
              </li>
              <li>
                <a href="#skills" className="text-muted-foreground transition-colors hover:text-primary">
                  Technical Skills
                </a>
              </li>
              <li>
                <a href="#certifications" className="text-muted-foreground transition-colors hover:text-primary">
                  Certifications
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground transition-colors hover:text-primary">
                  About Me
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Open for full-time frontend & full-stack roles or high-impact projects.
            </p>
            <a
              href="mailto:nuhamin.gulilat.7@gmail.com"
              className="mt-3 inline-block font-mono text-sm text-primary hover:underline"
            >
              nuhamin.gulilat.7@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row text-xs text-muted-foreground">
          <p>© {currentYear} Nuhamin Gulilat. Built with Next.js & Tailwind CSS.</p>

          <a
            href="#"
            className="flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
