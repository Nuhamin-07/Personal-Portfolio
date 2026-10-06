"use client";

import Image from "next/image";
import { ExternalLink, Sparkles } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl">
      {/* 1. Visual Section (Project Image) */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted/60">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          priority={false}
        />

        {/* Subtle Dark Gradient Overlay for Badges & Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Category Overlay Tag (Top Left) */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center rounded-full bg-background/85 px-3 py-1 text-[11px] font-semibold text-foreground backdrop-blur-md border border-border/60 shadow-xs">
            {project.category}
          </span>
        </div>

        {/* Featured Overlay Badge (Top Right) */}
        {project.isFeatured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 dark:bg-amber-600/90 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-white" />
              <span>Featured</span>
            </span>
          </div>
        )}
      </div>

      {/* 2. Content Section */}
      <div className="flex flex-1 flex-col p-4 sm:p-6 justify-between">
        <div>
          {/* Project Title */}
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>

          {/* Short Project Description */}
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {project.description}
          </p>

          {/* Technology Tags (Styled as Soft Pills matching reference design) */}
          <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full bg-primary/10 border border-primary/15 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-medium text-primary dark:bg-primary/15 dark:text-primary-foreground transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 3. Action Buttons (Live Demo & Github) */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="mt-5 sm:mt-6 flex flex-col xs:flex-row items-center gap-2.5 sm:gap-3 border-t border-border/60 pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full xs:flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm py-2.5 px-4 shadow-xs transition-all duration-200 active:scale-[0.98] cursor-pointer min-h-[42px]"
                aria-label={`View Live Demo of ${project.title}`}
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full xs:flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card hover:bg-muted text-foreground font-semibold text-xs sm:text-sm py-2.5 px-4 transition-all duration-200 hover:border-primary/40 active:scale-[0.98] cursor-pointer min-h-[42px]"
                aria-label={`View GitHub repository for ${project.title}`}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Github</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

