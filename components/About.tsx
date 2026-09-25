import Section from "@/components/shared/Section";

export default function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Story */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <span>Background & Engineering Philosophy</span>
          </div>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About Nuhamin Gulilat
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              I am a <strong className="text-foreground font-semibold">Full-Stack Developer</strong> holding a <strong className="text-foreground font-semibold">B.Sc. in Electrical & Computer Engineering</strong> (Computer Engineering Stream) from Arba Minch University.
            </p>

            <p>
              Over nearly four years of professional software development experience, I have engineered mission-critical web software across higher education, hospital healthcare management, SaaS merchant platforms, and enterprise ERP systems.
            </p>

            <p>
              My expertise spans modern web frameworks (<strong className="text-foreground font-semibold">Next.js, React, TypeScript, Node.js, Express</strong>), server-side session authentication, REST API architecture, and enterprise solutions (<strong className="text-foreground font-semibold">Microsoft Power Pages, Dataverse, Power Automate</strong>). I also bring a strong commitment to quality assurance through automated <strong className="text-foreground font-semibold">Cypress and Puppeteer</strong> test automation suites.
            </p>

            <p>
              Operating remotely from Addis Ababa, Ethiopia (UTC+3), I am fully equipped for international remote collaboration with flexible working hours overlapping North American and European team schedules.
            </p>
          </div>
        </div>

        {/* Right Column: Values / Pillars */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                🎓
              </span>
              <div>
                <h3 className="font-bold text-foreground text-base">Computer Engineering Degree</h3>
                <p className="text-xs text-primary font-mono font-medium">Arba Minch University • Graduated 2021</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Solid theoretical foundation in computer architecture, data structures, algorithms, object-oriented programming, and system design.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                ⚡
              </span>
              <h3 className="font-bold text-foreground text-base">Full-Stack & Enterprise Dual-Skill</h3>
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Bridging custom web engineering (React/Next.js/Node.js) and enterprise solutions (Power Pages/Dataverse) for maximum versatility.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                🧪
              </span>
              <h3 className="font-bold text-foreground text-base">Automated QA & Test Rigor</h3>
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Authoring Cypress end-to-end and Puppeteer visual regression test suites following BDD/TDD practices to prevent production bugs.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}