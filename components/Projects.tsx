"use client";

import { useState, useMemo, useRef } from "react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  // Extract unique categories from projects.ts
  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...unique];
  }, []);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter(
      (p) => p.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim()
    );
  }, [selectedCategory]);

  // Total pages calculation
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  // Paginated projects subset
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  // Handle category tab change
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (gridRef.current) {
        gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <Section id="projects">
      {/* 1. Reusable Editorial Section Header */}
      <SectionHeader
        tag="[ 02 / SELECTED WORKS ]"
        title="Selected"
        titleSecondLine="works."
        stickerText="FROM 2021 — NOW"
        countBadge={`${projects.length} Works`}
        description="A curated selection of enterprise systems, student portals, healthcare applications, and multi-tenant platforms."
      />

      {/* 2. Category Filter Tabs */}
      <div className="mb-10 flex flex-wrap items-center gap-2 sm:gap-2.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "border border-border/80 bg-card text-muted-foreground hover:bg-muted hover:text-foreground hover:border-primary/40"
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

      {/* 3. Projects Card Grid (Desktop 3-column, Tablet 2-column, Mobile 1-column) */}
      <div ref={gridRef} className="scroll-mt-28">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* Empty State fallback if filter returns no projects */}
        {filteredProjects.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-base font-medium text-muted-foreground">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>

      {/* 4. Pagination Controls matching the reference image layout (< 1 2 3 >) */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-card text-foreground transition-all hover:bg-muted hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page)}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentPage === page
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "border border-border/80 bg-card text-muted-foreground hover:bg-muted hover:text-foreground hover:border-primary/40"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-card text-foreground transition-all hover:bg-muted hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </Section>
  );
}