"use client";

import { useState, useMemo } from "react";
import Section from "@/components/shared/Section";
import { projects } from "@/data/projects";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...unique];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter(
      (p) => p.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim()
    );
  }, [selectedCategory]);

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return projects.length;
    return projects.filter(
      (p) => p.category.toLowerCase().trim() === cat.toLowerCase().trim()
    ).length;
  };

  return (
    <Section id="projects">
      {/* Section Header */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <span>Production Portfolio</span>
        </div>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Featured Projects & Enterprise Systems
        </h2>

        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Full-stack web applications, enterprise portals, and clinical systems engineered with React, Next.js, TypeScript, Node.js, and Power Platform.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const count = getCategoryCount(cat);
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
                  : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                  isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <article
            key={project.title}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl"
          >
            {/* Project Banner Header */}
            <div className={`relative flex h-36 items-center justify-between bg-gradient-to-br ${project.gradient} p-6 border-b border-border/60`}>
              <span className="text-4xl drop-shadow-sm">{project.icon}</span>
              <div className="flex items-center gap-2">
                {project.isFeatured && (
                  <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    ★ Featured
                  </span>
                )}
                <span className="rounded-full border border-border/80 bg-background/80 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Project Content */}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                {project.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              {/* Highlights List */}
              <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-primary font-bold text-xs mt-0.5">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-xs text-foreground/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Explicit Functional Actions Bar (GitHub & Live Demo) */}
              <div className="mt-6 flex flex-wrap items-center justify-end gap-2.5 border-t border-border/60 pt-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                    title="GitHub Code Repository"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-emerald-700 shadow-sm"
                    title="Live Deployed Demo"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}