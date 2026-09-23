import Section from "@/components/shared/Section";

const experiences = [
  {
    role: "Full-Stack / Frontend Developer",
    company: "Placid Solutions and Consulting",
    type: "Remote / Full-Time",
    period: "2022 – Present",
    description:
      "Engineered responsive web applications and enterprise portals with a primary focus on modular React/Next.js frontend architecture, RESTful API backend integrations, and user experience optimization.",
    responsibilities: [
      "Architected and deployed modular, reusable UI component libraries using React, TypeScript, and modern CSS/Tailwind.",
      "Developed secure backend services and REST APIs with Node.js and Express to handle CRUD operations and authentication.",
      "Collaborated on enterprise systems utilizing Microsoft Power Pages and Dataverse, writing client-side JavaScript business logic.",
      "Optimized web application performance, accessibility (WCAG), and responsive layouts across cross-browser environments.",
      "Partnered with cross-functional teams to translate complex business requirements into maintainable, production-ready code.",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "REST APIs",
      "Dataverse",
      "Git",
    ],
  },
  {
    role: "Frontend Developer & Web Specialist",
    company: "Independent / Project Solutions",
    type: "Contract / Project-Based",
    period: "2021 – 2022",
    description:
      "Delivered custom web applications, e-commerce stores, and digital tools for clients focused on high performance and clean UI aesthetics.",
    responsibilities: [
      "Designed and developed responsive single-page applications (SPAs) using React and modern frontend state management.",
      "Integrated third-party APIs, payment gateway workflows, and cloud databases (Supabase, MongoDB).",
      "Performed website audits, speed optimization, SEO enhancements, and cross-browser testing for web products.",
    ],
    technologies: [
      "React",
      "JavaScript",
      "HTML5 / CSS3",
      "Tailwind CSS",
      "REST APIs",
      "Supabase",
      "Figma",
    ],
  },
];

export default function Experience() {
  return (
    <Section id="experience">
      {/* Section Header */}
      <div className="mb-14 text-center md:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <span>Career Track</span>
        </div>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Professional Experience
        </h2>

        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Nearly 4 years of hands-on software development experience building web products, enterprise systems, and client solutions.
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l-2 border-border ml-3 md:ml-6 pl-6 md:pl-10 space-y-12">
        {experiences.map((exp, index) => (
          <div key={exp.company + exp.period} className="relative group">
            {/* Timeline Node Dot */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background shadow-md transition-transform group-hover:scale-125">
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>

            {/* Experience Card */}
            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md md:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                    {exp.role}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-base font-semibold text-primary">
                      {exp.company}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-xs font-medium text-muted-foreground rounded-full bg-muted px-2.5 py-0.5">
                      {exp.type}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 font-mono text-xs font-semibold text-foreground">
                  {exp.period}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {exp.description}
              </p>

              {/* Responsibilities List */}
              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Key Contributions & Achievements
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {exp.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mt-6 pt-5 border-t border-border/60">
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-muted/40 px-2.5 py-1 font-mono text-xs text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </Section>
  );
}