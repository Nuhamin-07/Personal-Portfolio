"use client";

import { useState } from "react";
import Section from "@/components/shared/Section";
import { projects, type Project } from "@/data/projects";


export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Section id="projects">
      {/* Section Header */}
      <div className="mb-12 text-center md:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <span>Featured Work</span>
        </div>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Featured Projects & Case Studies
        </h2>

        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          A selection of full-stack web applications, enterprise systems, and interactive digital products built with React, Next.js, TypeScript, and Node.js.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl"
          >
            {/* Project Banner Header */}
            <div className={`relative flex h-36 items-center justify-between bg-gradient-to-br ${project.gradient} p-6 border-b border-border/60`}>
              <span className="text-4xl drop-shadow-sm">{project.icon}</span>
              <span className="rounded-full border border-border/80 bg-background/80 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
                {project.category}
              </span>
            </div>

            {/* Project Content */}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                {project.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

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

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  View Case Study
                  <svg className="ml-1 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      title="GitHub Repository"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground transition-colors hover:text-primary"
                      title="Live Demo"
                      aria-label={`${project.title} live demo`}
                    >
                      <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal Popup for Detailed Case Study */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close Case Study Modal"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedProject.icon}</span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-bold text-foreground">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {selectedProject.description}
            </p>

            {/* Problem & Solution Breakdown */}
            <div className="mt-6 space-y-4 rounded-xl bg-muted/40 p-4 border border-border/60">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  The Problem
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedProject.problem}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  The Solution
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedProject.solution}
                </p>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Key Features & Achievements
              </h4>
              <ul className="mt-3 space-y-2">
                {selectedProject.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 text-primary">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Technologies Used
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-border bg-muted px-3 py-1 font-mono text-xs font-medium text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 flex items-center gap-4 border-t border-border pt-5">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-primary px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  View Code Repository
                </a>
              )}

              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-border bg-card px-5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Open Live Demo ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}