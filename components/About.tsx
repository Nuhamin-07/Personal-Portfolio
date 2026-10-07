import Section from "@/components/shared/Section";

export default function About() {
  return (
    <Section id="about" className="relative py-12 sm:py-20 lg:py-28">
      {/* ── TOP SECTION: 2-Column Editorial Layout matching reference image ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Bold Headline */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            <span>[ 01 / BACKGROUND &amp; PERSPECTIVE ]</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground uppercase leading-none">
            ABOUT ME
          </h2>
          <div className="h-1.5 w-20 bg-primary rounded-full mt-4" />
        </div>

        {/* Right Column: Monospace / Tech Story Narrative */}
        <div className="lg:col-span-7 space-y-4 font-mono text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground/90">
          <p>
            I&apos;m a <strong className="text-foreground font-sans font-bold">Full-Stack Developer</strong> holding a <strong className="text-foreground font-sans font-bold">B.Sc. in Electrical &amp; Computer Engineering</strong> (Computer Engineering Stream) from Arba Minch University.
          </p>
          <p>
            With nearly four years of professional software development experience, I engineer seamless, high-performance web applications and enterprise platforms. My core stack includes <span className="text-primary font-bold">React, Next.js, TypeScript, Node.js, Express</span>, REST APIs, databases (<span className="text-foreground font-bold font-sans">MongoDB, MySQL, Dataverse</span>), and automated testing (<span className="text-primary font-bold">Cypress &amp; Puppeteer</span>).
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground/80 font-sans">
            Operating remotely from Addis Ababa, Ethiopia (UTC+3) with flexible working hours overlapping North American and European team schedules.
          </p>
        </div>
      </div>

      {/* ── BOTTOM SECTION: Stat Card Overlaying Colored Accent Back Card ── */}
      <div className="mt-12 sm:mt-16 relative pb-10 sm:pb-14">
        {/* 1. Vibrant Accent Background Card (BEHIND and EXTENDING BELOW the stat card) */}
        <div className="absolute inset-x-0 bottom-0 top-16 sm:top-24 rounded-3xl bg-gradient-to-r from-[#8b4513] via-[#b45309] to-[#d97706] dark:from-[#92400e] dark:via-[#b45309] dark:to-[#d97706] shadow-xl overflow-hidden" />

        {/* 2. Pristine Floating Stats Card (Front Layer) */}
        <div className="relative z-10 mx-3 sm:mx-6 lg:mx-10 rounded-2xl border-2 border-border/80 bg-card text-card-foreground shadow-[0_20px_50px_rgba(0,0,0,0.14)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.6)] p-5 sm:p-8 lg:p-10 transition-all">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border/60">
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
                4+
              </span>
              <span className="mt-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Years Experience
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center p-2 pt-5 md:pt-2">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
                8+
              </span>
              <span className="mt-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Featured Projects
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center p-2 pt-5 md:pt-2">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-primary">
                100%
              </span>
              <span className="mt-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Remote Proven
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center p-2 pt-5 md:pt-2">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
                B.Sc.
              </span>
              <span className="mt-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Computer Engineer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3 COMPACT PILLAR CARDS BELOW STATS ── */}
      <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-xs p-4 sm:p-5 shadow-xs transition-all hover:border-primary/40">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-base">
              🎓
            </span>
            <div>
              <h3 className="font-bold text-foreground text-sm sm:text-base">Engineering Degree</h3>
              <p className="text-[11px] text-primary font-mono font-medium">Arba Minch University • 2021</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            Solid foundation in computer architecture, data structures, algorithms, object-oriented programming, and system design.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-xs p-4 sm:p-5 shadow-xs transition-all hover:border-primary/40">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-base">
              ⚡
            </span>
            <div>
              <h3 className="font-bold text-foreground text-sm sm:text-base">Full-Stack &amp; Enterprise</h3>
              <p className="text-[11px] text-primary font-mono font-medium">React / Next / Node / Power Platform</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            Bridging custom web engineering (React, Next.js, TypeScript, Node.js) and enterprise solutions (Power Pages, Dataverse).
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-xs p-4 sm:p-5 shadow-xs transition-all hover:border-primary/40">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-base">
              🧪
            </span>
            <div>
              <h3 className="font-bold text-foreground text-sm sm:text-base">Automated QA Test</h3>
              <p className="text-[11px] text-primary font-mono font-medium">Cypress &amp; Puppeteer E2E</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            Authoring Cypress end-to-end and Puppeteer automated test suites following BDD/TDD practices to prevent UI regressions.
          </p>
        </div>
      </div>
    </Section>
  );
}