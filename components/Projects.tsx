"use client";

import { useState } from "react";
import Section from "@/components/shared/Section";

interface Project {
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  highlights: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  gradient: string;
  icon: string;
}

const projects: Project[] = [
  {
    title: "PrintForge 3D Marketplace",
    category: "Full-Stack Web App",
    description:
      "A modern 3D model marketplace featuring dynamic model previews, search & filter algorithms, user collections, and responsive checkout UX.",
    problem: "3D creators needed a fast, performant platform to showcase, license, and download complex 3D assets with rich metadata.",
    solution: "Built a high-speed Next.js marketplace with SSR catalog pages, dynamic search indexing, and optimized asset loading pipelines.",
    highlights: [
      "Dynamic catalog searching and filtering system",
      "SSR optimized product detail pages with instant navigation",
      "Custom responsive 3D model card previews"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Node.js"],
    githubUrl: "https://github.com/Nuhamin-07/PrintForge",
    liveUrl: "https://printforge-3d-models.netlify.app",
    gradient: "from-blue-600/20 via-indigo-600/10 to-purple-600/20",
    icon: "🖨️",
  },
  {
    title: "Full-Stack E-Commerce Platform",
    category: "E-Commerce",
    description:
      "Full-stack e-commerce web application with real-time product inventory, persistent shopping cart, checkout workflow, and administrative management.",
    problem: "Small retailers require reliable, customizable e-commerce web solutions that process carts seamlessly without heavy overhead.",
    solution: "Engineered an end-to-end e-commerce store with Node.js REST APIs, stateful cart management, and dark/light responsive UI.",
    highlights: [
      "Stateful cart persistence across user sessions",
      "RESTful API backend for product catalog & inventory management",
      "Mobile-optimized responsive checkout experience"
    ],
    technologies: ["Next.js", "Node.js", "Express", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Nuhamin-07/Ecommerce-Platform",
    liveUrl: "https://nuhamin-ecommerce-shop.netlify.app",
    gradient: "from-emerald-600/20 via-teal-600/10 to-cyan-600/20",
    icon: "🛍️",
  },
  {
    title: "Task Management Application",
    category: "Productivity",
    description:
      "A real-time task and workflow management system with JWT authentication, protected routes, category tags, and CRUD operations.",
    problem: "Teams and individuals need intuitive, distraction-free productivity tools to organize projects and track task statuses efficiently.",
    solution: "Created a full-stack dashboard featuring protected authentication boundaries, SQLite data persistence, and drag-and-drop task workflows.",
    highlights: [
      "Secure user authentication & session handling",
      "Complete CRUD task pipelines with real-time status updates",
      "Lightweight database structure using Express & SQLite"
    ],
    technologies: ["React", "Express", "SQLite", "Node.js", "CSS Modules"],
    githubUrl: "https://github.com/Nuhamin-07/Task-Manager",
    liveUrl: "https://nuhamin-task-management.netlify.app/",
    gradient: "from-amber-600/20 via-orange-600/10 to-red-600/20",
    icon: "⚡",
  },
  {
    title: "Student Information Management (SIMS)",
    category: "Enterprise System",
    description:
      "Enterprise platform for managing student academic records, enrollment workflows, transcripts, and faculty operations.",
    problem: "Educational institutions require secure, scalable portals for handling multi-department student data and administrative approval pipelines.",
    solution: "Delivered a Power Pages & Dataverse enterprise solution with customized JavaScript business logic and role-based data views.",
    highlights: [
      "Role-based security & dataverse record access controls",
      "Custom frontend validation workflows and automated record routing",
      "Streamlined enrollment and academic status dashboards"
    ],
    technologies: ["Power Pages", "Dataverse", "JavaScript", "REST APIs", "CSS3"],
    gradient: "from-sky-600/20 via-blue-600/10 to-indigo-600/20",
    icon: "🎓",
  },
  {
    title: "AI Movie Recommendation Engine",
    category: "AI & Data",
    description:
      "AI-driven movie discovery tool using vector embeddings and semantic search to deliver personalized media recommendations.",
    problem: "Standard keyword movie searches fail to capture thematic nuances or user mood preferences.",
    solution: "Integrated Supabase vector embeddings with a modern React frontend to match user queries with contextual similarity scores.",
    highlights: [
      "Vector database integration for semantic similarity queries",
      "Interactive media filter controls and movie detail popups",
      "Fast response caching and responsive UI cards"
    ],
    technologies: ["React", "Supabase", "AI Embeddings", "Tailwind CSS", "JavaScript"],
    githubUrl: "https://github.com/Nuhamin-07/Movie-Recommender",
    gradient: "from-purple-600/20 via-fuchsia-600/10 to-pink-600/20",
    icon: "🎬",
  },
  {
    title: "Studio Design & Booking Site",
    category: "Web Application",
    description:
      "A modern, responsive creative studio website featuring artist portfolios, service showcases, photo galleries, and an online appointment booking flow.",
    problem: "Creative studios need high-impact visual branding combined with seamless client booking workflows.",
    solution: "Designed a dark-mode first Next.js experience featuring image gallery lightboxes, service breakdowns, and interactive booking forms.",
    highlights: [
      "High-resolution gallery layout with smooth hover transitions",
      "Interactive appointment scheduling interface",
      "Optimized Core Web Vitals performance and accessibility"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "React"],
    githubUrl: "https://github.com/Nuhamin-07/Studio-Website",
    gradient: "from-rose-600/20 via-pink-600/10 to-red-600/20",
    icon: "🎨",
  },
];

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