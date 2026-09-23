import Section from "@/components/shared/Section";

const skillCategories = [
  {
    title: "Frontend Engineering",
    icon: "💻",
    description: "Building responsive, modern, accessible user interfaces",
    skills: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 / CSS3", "shadcn/ui", "CSS Modules"],
  },
  {
    title: "Backend & APIs",
    icon: "⚙️",
    description: "Architecting REST services and server-side application logic",
    skills: ["Node.js", "Express", "RESTful APIs", "JWT Auth", "Serverless Functions", "Power Pages"],
  },
  {
    title: "Databases & Data",
    icon: "🗄️",
    description: "Managing data storage, vector search, and schema models",
    skills: ["SQLite", "MongoDB", "MySQL", "Supabase", "Dataverse", "JSON / Data Pipelines"],
  },
  {
    title: "Tools & Workflow",
    icon: "🛠️",
    description: "Version control, deployment, design tools, and modern environments",
    skills: ["Git", "GitHub", "Vercel", "Figma", "Postman", "npm / pnpm", "VS Code"],
  },
];

export default function Skills() {
  return (
    <Section id="skills">
      {/* Section Header */}
      <div className="mb-12 text-center md:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <span>Technical Stack</span>
        </div>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Skills & Technologies
        </h2>

        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Core technologies, frameworks, and developer tools I use to build scalable web software.
        </p>
      </div>

      {/* Skills Categories Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-xl transition-transform group-hover:scale-110">
                {category.icon}
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {category.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 font-mono text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}