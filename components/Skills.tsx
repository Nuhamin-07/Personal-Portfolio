"use client";

import { useState, useMemo } from "react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import SkillIcon from "@/components/shared/SkillIcon";
import { skillCategories, DetailedSkill } from "@/data/skills";
import { Search, X, Sparkles, ChevronRight, Award } from "lucide-react";

// Project mapping for the detail modal
const skillProjectsMap: Record<string, string[]> = {
  "Next.js": ["Printing & Publishing Portal", "Developer Portfolio"],
  "React.js": ["Hospital Management System", "Multi-Vendor E-Commerce Platform", "ERP Portal"],
  "TypeScript": ["Hospital Management System", "Multi-Vendor E-Commerce Platform"],
  "Node.js": ["Hospital Management System", "Multi-Vendor E-Commerce Platform", "Merchant SaaS Portal"],
  "Express.js": ["Hospital Management System", "Merchant SaaS Portal"],
  "MongoDB": ["Multi-Vendor E-Commerce Platform", "Merchant SaaS Portal"],
  "MySQL": ["Hospital Management System", "ERP System"],
  "Microsoft Dataverse": ["Power Pages Enterprise Portal", "Student Information System"],
  "Power Pages": ["Power Pages Enterprise Portal", "Student Information System"],
  "Cypress": ["Hospital Management System", "Power Pages Enterprise Portal"],
  "Puppeteer": ["Printing & Publishing Portal", "Automated QA Suite"],
  "Tailwind CSS": ["Developer Portfolio", "Multi-Vendor E-Commerce Platform"],
  "Figma": ["Hospital Management System", "Multi-Vendor E-Commerce Platform"],
};

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalSkill, setActiveModalSkill] = useState<{
    skill: DetailedSkill;
    categoryTitle: string;
  } | null>(null);

  // Filtered categories and skills based on search and category tab
  const filteredCategories = useMemo(() => {
    return skillCategories
      .map((cat) => {
        const filteredDetailed = cat.detailedSkills.filter((s) => {
          const matchesSearch =
            searchQuery.trim() === "" ||
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()));

          return matchesSearch;
        });

        return {
          ...cat,
          detailedSkills: filteredDetailed,
        };
      })
      .filter((cat) => {
        const matchesCategoryTab =
          selectedCategory === "all" || cat.id === selectedCategory;

        return matchesCategoryTab && cat.detailedSkills.length > 0;
      });
  }, [selectedCategory, searchQuery]);

  return (
    <Section id="skills">
      {/* 1. Reusable Editorial Section Header */}
      <SectionHeader
        tag="[ 04 / TECH & CAPABILITIES ]"
        title="Skills &"
        titleSecondLine="tools."
        stickerText="4+ YEARS EXP"
        countBadge="30+ Tech"
        description="Core technical competencies and tools applied across frontend architecture, backend systems, and automated testing."
      />

      {/* 2. Controls: Search Bar & Quick Category Filters */}
      <div className="mt-8 max-w-4xl mx-auto px-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter technologies..."
              className="w-full rounded-full border border-border/80 bg-card/80 pl-10 pr-9 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70 shadow-xs focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "border border-border/80 bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              All
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "border border-border/80 bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat.shortTitle}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Skills Cards Grid - Matched closely to attached reference composition */}
      <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto px-2 sm:px-4">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="group rounded-3xl border-2 border-primary/25 bg-card/90 dark:bg-[#13101c]/80 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_25px_rgba(139,69,19,0.06)] dark:shadow-[0_0_30px_rgba(180,83,9,0.12)] transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_35px_rgba(180,83,9,0.22)] flex flex-col justify-between"
          >
            <div>
              {/* Category Title */}
              <h3 className="text-2xl font-bold text-center text-foreground tracking-tight mb-2">
                {category.title}
              </h3>

              <p className="text-xs text-center text-muted-foreground max-w-sm mx-auto mb-6">
                {category.description}
              </p>

              {/* Skill Pills Container - Matching reference image pill layout */}
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-3.5">
                {category.detailedSkills.map((skill) => (
                  <button
                    key={skill.name}
                    type="button"
                    onClick={() =>
                      setActiveModalSkill({ skill, categoryTitle: category.title })
                    }
                    className="group/pill inline-flex items-center gap-2.5 rounded-xl border border-border/80 dark:border-slate-700/80 bg-background/80 dark:bg-slate-900/80 px-4 py-2.5 text-xs sm:text-sm font-semibold text-foreground shadow-xs transition-all duration-200 hover:scale-105 hover:border-primary hover:bg-primary/10 hover:shadow-md cursor-pointer active:scale-95"
                    title={`Click to view details for ${skill.name}`}
                  >
                    <span className="flex h-5 w-5 items-center justify-center shrink-0 transition-transform group-hover/pill:scale-110">
                      <SkillIcon iconKey={skill.iconKey} name={skill.name} className="w-5 h-5" />
                    </span>
                    <span>{skill.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subtle bottom info indicator */}
            <div className="mt-8 pt-4 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="font-mono text-primary font-bold">
                {category.detailedSkills.length} Technologies
              </span>
              <span className="text-xs font-semibold text-muted-foreground/80">
                Tap skill for details
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Fallback if search returns no items */}
      {filteredCategories.length === 0 && (
        <div className="mt-12 py-12 text-center max-w-md mx-auto rounded-2xl border border-dashed border-border bg-card/60 p-6">
          <p className="text-sm font-semibold text-foreground">No matching technologies found</p>
          <p className="text-xs text-muted-foreground mt-1">
            No skills match &quot;{searchQuery}&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-4 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 4. Interactive Detail Modal */}
      {activeModalSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl relative animate-scaleUp">
            <button
              type="button"
              onClick={() => setActiveModalSkill(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Close detail modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 pb-4 border-b border-border/60">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
                <SkillIcon
                  iconKey={activeModalSkill.skill.iconKey}
                  name={activeModalSkill.skill.name}
                  className="w-6 h-6"
                />
              </span>

              <div>
                <span className="text-xs font-mono font-bold uppercase text-primary tracking-wider">
                  {activeModalSkill.categoryTitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {activeModalSkill.skill.name}
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Proficiency Rating
                </h4>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
                  <Award className="w-3.5 h-3.5" />
                  <span>{activeModalSkill.skill.level} Level</span>
                </div>
              </div>

              {activeModalSkill.skill.description && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Key Capabilities & Architecture
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed bg-muted/30 p-3.5 rounded-xl border border-border/60">
                    {activeModalSkill.skill.description}
                  </p>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Used in Projects
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(
                    skillProjectsMap[activeModalSkill.skill.name] || [
                      "Production Enterprise Systems",
                      "Full-Stack Web Applications",
                    ]
                  ).map((proj) => (
                    <span
                      key={proj}
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-foreground"
                    >
                      <ChevronRight className="w-3 h-3 text-primary" />
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border/60 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModalSkill(null)}
                className="rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}