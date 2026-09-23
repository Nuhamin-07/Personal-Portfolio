import Section from "@/components/shared/Section";

export default function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Story */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <span>Background & Philosophy</span>
          </div>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About Nuhamin Gulilat
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              I am a <strong className="text-foreground font-semibold">Full-Stack Developer</strong> with nearly four years of professional engineering experience building modern web applications, scalable REST services, and end-to-end software solutions.
            </p>

            <p>
              Throughout my career, I&apos;ve built production software ranging from 3D model marketplaces and e-commerce platforms to task management applications, enterprise student portals, and AI-powered recommendation systems.
            </p>

            <p>
              My core philosophy centers on writing <strong className="text-foreground font-semibold">clean, maintainable code</strong> and crafting fast, accessible user experiences. I thrive in collaborative remote environments, transforming complex technical constraints into intuitive, polished web products.
            </p>
          </div>
        </div>

        {/* Right Column: Values / Pillars */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                01
              </span>
              <h3 className="font-bold text-foreground text-base">Product-Driven Development</h3>
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Focusing on real-world business impact, core user workflows, and measurable project goals.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                02
              </span>
              <h3 className="font-bold text-foreground text-base">Modern Stack Expertise</h3>
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Deep proficiency in React, Next.js, TypeScript, Tailwind CSS, and Node.js backend services.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                03
              </span>
              <h3 className="font-bold text-foreground text-base">Performance & Accessibility</h3>
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Committing to fast load times, responsive mobile rendering, and WCAG AA accessibility standards.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}