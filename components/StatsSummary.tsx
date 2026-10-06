import Image from "next/image";

export default function StatsSummary() {
  return (
    <div className="mt-6 mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
        Quick Highlights
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 mt-5 items-stretch">
        {/* Left Column: Bio & Stat Cards */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <p className="text-sm leading-relaxed sm:text-base lg:text-lg text-muted-foreground">
            Full-Stack Developer with 4 years of experience building enterprise applications, business systems, and modern web platforms. Specialized in Next.js, React, TypeScript, Node.js, Express.js, and Microsoft Power Platform solutions across education, healthcare, ERP, and e-commerce domains.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
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

            <div className="flex items-center justify-center rounded-2xl border border-border bg-card/90 dark:bg-card p-4 backdrop-blur-sm transition-all hover:border-primary/40 shadow-xs">
              <span className="text-xs sm:text-sm font-bold text-foreground text-center px-1">
                Certified Frontend &amp; Fullstack Developer
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Key Focus Areas */}
        <div className="w-full lg:w-1/2 rounded-2xl border border-border bg-card/60 p-4 sm:p-6 backdrop-blur-sm shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-start sm:items-center gap-4 border-b border-border/60 pb-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden rounded-xl bg-muted">
              <Image
                src="/frontend.jpg"
                alt="Frontend Development"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">Frontend Development</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">
                Building responsive and user-friendly interfaces with React, Next.js, and TypeScript.
              </p>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-4 border-b border-border/60 pb-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden rounded-xl bg-muted">
              <Image
                src="/fullstack.jpg"
                alt="Fullstack Development"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">Fullstack Development</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">
                Building full-stack web applications with React, Next.js, TypeScript, Node.js, and Express.js.
              </p>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-4 pt-1">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden rounded-xl bg-muted">
              <Image
                src="/end-to-end.jpg"
                alt="End-to-End Automation Testing"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">End-to-End Automation Testing</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">
                Building end-to-end automation test solutions with Cypress.js and Puppeteer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}