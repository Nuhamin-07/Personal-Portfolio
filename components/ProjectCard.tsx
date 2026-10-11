"use client";

import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const primaryUrl = project.liveUrl || project.githubUrl;
  const projectNumber = (index + 1).toString().padStart(2, "0");

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#8b4513]/25 dark:border-[#b45309]/30 bg-white/95 dark:bg-[#1a120c]/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8b4513] dark:hover:border-[#b45309] hover:shadow-[0_0_25px_rgba(139,69,19,0.15)] dark:hover:shadow-[0_0_25px_rgba(180,83,9,0.22)] backdrop-blur-md max-w-full">
      {/* ── Top Header Strip ── */}
      <div className="px-3.5 py-2 border-b border-[#8b4513]/20 dark:border-[#b45309]/25 bg-[#8b4513]/8 dark:bg-[#b45309]/15 flex items-center justify-between">
        <span className="font-mono text-[10px] sm:text-xs font-bold tracking-wider text-[#8b4513] dark:text-[#e09045] uppercase">
          PROJECT {projectNumber}
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b4513] dark:bg-[#e09045] animate-pulse" />
          {project.category}
        </span>
      </div>

      {/* ── Visual Preview Frame ── */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900/10 dark:bg-slate-950/80">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      {/* ── Content Body ── */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 justify-between">
        <div>
          {/* Project Title with External Link */}
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-[#8b4513] dark:group-hover:text-[#e09045]">
            {primaryUrl ? (
              <a
                href={primaryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 focus:outline-hidden focus-visible:underline"
              >
                <span className="line-clamp-1">{project.title}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#8b4513] dark:group-hover:text-[#e09045] transition-colors shrink-0" />
              </a>
            ) : (
              <span className="line-clamp-1">{project.title}</span>
            )}
          </h3>

          {/* Description */}
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
            {project.description}
          </p>

          {/* Technology Badges (Portfolio Brand Accent) */}
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full border border-[#8b4513]/25 dark:border-[#b45309]/35 bg-[#8b4513]/8 dark:bg-[#b45309]/20 px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] font-semibold text-[#8b4513] dark:text-[#e09045] uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Action Footer ── */}
        <div className="mt-4 pt-3 border-t border-[#8b4513]/15 dark:border-[#b45309]/25 flex items-center justify-between">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#8b4513] dark:text-[#e09045] hover:text-[#70360f] dark:hover:text-[#f3b579] transition-colors focus:outline-hidden focus-visible:underline uppercase tracking-wider"
              aria-label={`View live demo of ${project.title}`}
            >
              <span>View Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#8b4513] dark:text-[#e09045] hover:text-[#70360f] dark:hover:text-[#f3b579] transition-colors focus:outline-hidden focus-visible:underline uppercase tracking-wider"
              aria-label={`View GitHub repository for ${project.title}`}
            >
              <span>View Code</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">Internal</span>
          )}

          {primaryUrl && (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#8b4513]/40 dark:border-[#b45309]/50 text-[#8b4513] dark:text-[#e09045] bg-[#8b4513]/8 dark:bg-[#b45309]/20 hover:bg-[#8b4513] hover:text-white dark:hover:bg-[#b45309] dark:hover:text-white transition-all active:scale-95 shadow-xs"
              aria-label={`Open ${project.title}`}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
