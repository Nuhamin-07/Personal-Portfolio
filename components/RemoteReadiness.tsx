import Section from "@/components/shared/Section";

export default function RemoteReadiness() {
  return (
    <Section id="remote-readiness" className="bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Summary */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Global Remote Collaboration Ready</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Optimized for International Remote Teams
            </h2>

            <p className="text-base text-muted-foreground leading-relaxed sm:text-lg">
              Operating seamlessly across global timezones with a proven track record delivering software for international institutions (including US-affiliated universities and enterprise platforms).
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <span>📍 Base & Timezone</span>
                </div>
                <p className="mt-1 text-xs font-mono font-medium text-foreground">
                  Addis Ababa (UTC+3)
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  3–5h US East / Full EU Overlap
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <span>🗣️ Language & Comms</span>
                </div>
                <p className="mt-1 text-xs font-mono font-medium text-foreground">
                  Fluent Professional English
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  Clear written & verbal updates
                </p>
              </div>
            </div>
          </div>

          {/* Right Cards / Pillars */}
          <div className="lg:col-span-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary text-xl font-bold">
                ⏱️
              </div>
              <h3 className="mt-3 text-base font-bold text-foreground">Flexible Working Hours</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Able to align working schedules with North American (EST/PST) and European (CET/BST) core team hours.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary text-xl font-bold">
                💬
              </div>
              <h3 className="mt-3 text-base font-bold text-foreground">Async Communication</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Self-driven workflow with clear pull requests, detailed issue documentation, and proactive progress reports on Slack/Jira.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary text-xl font-bold">
                🛠️
              </div>
              <h3 className="mt-3 text-base font-bold text-foreground">Modern Remote Stack</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Proficient in Git, GitHub/GitLab PR reviews, Agile Scrum sprints, Figma specs handoff, and CI/CD pipelines.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary text-xl font-bold">
                ⚡
              </div>
              <h3 className="mt-3 text-base font-bold text-foreground">Reliable Setup</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Equipped with high-speed internet, dedicated workstation setup, and redundant power backups for continuous availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
