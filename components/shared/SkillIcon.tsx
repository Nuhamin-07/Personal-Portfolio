"use client";

import React from "react";
import {
  Code2,
  Server,
  Database,
  TestTube2,
  Zap,
  Wrench,
  Lock,
  FileCode,
  GitBranch,
} from "lucide-react";

interface SkillIconProps {
  iconKey?: string;
  name: string;
  className?: string;
}

export default function SkillIcon({ iconKey, name, className = "w-5 h-5" }: SkillIconProps) {
  const normalizedKey = (iconKey || name).toLowerCase().replace(/[^a-z0-9]/g, "");

  // React - Cyan Logo
  if (normalizedKey.includes("react") && !normalizedKey.includes("query")) {
    return (
      <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // Next.js - Clean Monochrome
  if (normalizedKey.includes("next")) {
    return (
      <svg className={className} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="currentColor" fillOpacity="0.1" />
        <path d="M149.508 157.52L69.1419 54H54V126H67.8286V73.4914L137.95 163.666C142.148 161.869 145.999 159.8 149.508 157.52Z" fill="currentColor" />
        <path d="M115.5 54H129.5V126H115.5V54Z" fill="currentColor" />
      </svg>
    );
  }

  // TypeScript - Blue Shield
  if (normalizedKey.includes("typescript") || normalizedKey === "ts") {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="18" fill="#3178C6" />
        <path d="M30 35H62V46H52V80H39V46H30V35Z" fill="white" />
        <path d="M63 70C63 65 67 60 75 60C82 60 86 64 87 69H77C76.8 67.5 75.8 66.5 74.5 66.5C73 66.5 72.2 67.2 72.2 68.5C72.2 70 73.5 70.8 77 72C83 74 88 77 88 83C88 89.5 82 92 74 92C66 92 61 87.5 60 81H70C70.5 83.5 72 84.8 74.2 84.8C75.8 84.8 77 84 77 82.5C77 81 75.8 80.2 72 79C66 77 63 74 63 70Z" fill="white" />
      </svg>
    );
  }

  // JavaScript - Yellow Shield
  if (normalizedKey.includes("javascript") || normalizedKey === "js") {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="18" fill="#F7DF1E" />
        <path d="M35 70C35 65 39 60 47 60C54 60 58 64 59 69H49C48.8 67.5 47.8 66.5 46.5 66.5C45 66.5 44.2 67.2 44.2 68.5C44.2 70 45.5 70.8 49 72C55 74 60 77 60 83C60 89.5 54 92 46 92C38 92 33 87.5 32 81H42C42.5 83.5 44 84.8 46.2 84.8C47.8 84.8 49 84 49 82.5C49 81 47.8 80.2 44 79C38 77 35 74 35 70Z" fill="#000000" />
        <path d="M63 70C63 65 67 60 75 60C82 60 86 64 87 69H77C76.8 67.5 75.8 66.5 74.5 66.5C73 66.5 72.2 67.2 72.2 68.5C72.2 70 73.5 70.8 77 72C83 74 88 77 88 83C88 89.5 82 92 74 92C66 92 61 87.5 60 81H70C70.5 83.5 72 84.8 74.2 84.8C75.8 84.8 77 84 77 82.5C77 81 75.8 80.2 72 79C66 77 63 74 63 70Z" fill="#000000" />
      </svg>
    );
  }

  // Redux - Purple Logo
  if (normalizedKey.includes("redux")) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M65.6 20C55.6 20 47.1 26.5 44 35.6C40.9 26.5 32.4 20 22.4 20C9.8 20 0 30.2 0 42.8C0 63.8 38.6 86 44 89C49.4 86 88 63.8 88 42.8C88 30.2 78.2 20 65.6 20Z" fill="#764ABC" />
      </svg>
    );
  }

  // Material UI - Blue Logo
  if (normalizedKey.includes("material") || normalizedKey.includes("mui")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 2.475V15.75l4.5 2.625V5.1L12 9.45l7.5-4.35v13.275L24 15.75V2.475L12 9.45z" fill="#007FFF" />
        <path d="M12 9.45l-4.5-2.625V21.5L12 24.125l4.5-2.625V6.825z" fill="#00B0FF" />
      </svg>
    );
  }

  // HTML5 - Orange Shield
  if (normalizedKey.includes("html")) {
    return (
      <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M71 460L30 0h452l-41 460-185 52z" fill="#E34F26" />
        <path d="M256 472V40l191 1-35 387z" fill="#EF652A" />
        <path d="M109 176h147v59H114l5 61h137v59l-81 22-5-57h-59l9 116 135 37 136-37 19-214H103z" fill="#ECECEC" />
      </svg>
    );
  }

  // CSS3 / Sass - Blue / Pink Shield
  if (normalizedKey.includes("css") || normalizedKey.includes("sass")) {
    return (
      <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M71 460L30 0h452l-41 460-185 52z" fill="#1572B6" />
        <path d="M256 472V40l191 1-35 387z" fill="#33A9DC" />
        <path d="M109 176h294l-5 60H171l6 61h221l-14 156-128 36-128-36-8-93h58l4 44 74 20 74-20 8-83H103z" fill="#ECECEC" />
      </svg>
    );
  }

  // Tailwind CSS - Cyan Mark
  if (normalizedKey.includes("tailwind")) {
    return (
      <svg className={className} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 10C15 10 9 17.5 7 25C12 20 18 18.75 22.5 21.25C25.1 22.7 27 25.4 29.1 28.5C32.5 33.5 36.5 39.5 47.5 39.5C57.5 39.5 63.5 32 65.5 24.5C60.5 29.5 54.5 30.75 50 28.25C47.4 26.8 45.5 24.1 43.4 21C40 16 36 10 25 10ZM57.5 10C47.5 10 41.5 17.5 39.5 25C44.5 20 50.5 18.75 55 21.25C57.6 22.7 59.5 25.4 61.6 28.5C65 33.5 69 39.5 80 39.5C90 39.5 96 32 98 24.5C93 29.5 87 30.75 82.5 28.25C79.9 26.8 78 24.1 75.9 21C72.5 16 68.5 10 57.5 10Z" fill="#06B6D4" />
      </svg>
    );
  }

  // Node.js - Green Hexagon
  if (normalizedKey.includes("node")) {
    return (
      <svg className={className} viewBox="0 0 256 289" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 0L0 73.9V215.1L128 289L256 215.1V73.9L128 0Z" fill="#339933" />
        <path d="M128 259.8L26.7 201.3V87.7L128 146.2V259.8ZM128 115.3L27.4 57.2L128 0.9L228.6 57.2L128 115.3Z" fill="#ffffff" fillOpacity="0.3" />
      </svg>
    );
  }

  // Express.js - White/Dark Badge
  if (normalizedKey.includes("express")) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="20" fill="currentColor" fillOpacity="0.15" />
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fontSize="38" fontWeight="bold" fill="currentColor" fontFamily="sans-serif">ex</text>
      </svg>
    );
  }

  // MongoDB - Green Leaf
  if (normalizedKey.includes("mongo")) {
    return (
      <svg className={className} viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0C44 20 10 70 10 115C10 160 30 190 48 198V140H52V198C70 190 90 160 90 115C90 70 56 20 50 0Z" fill="#47A248" />
      </svg>
    );
  }

  // MySQL - Blue Dolphin / Database
  if (normalizedKey.includes("mysql")) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="20" fill="#00618A" fillOpacity="0.2" />
        <path d="M20 30C20 25 35 20 50 20C65 20 80 25 80 30V70C80 75 65 80 50 80C35 80 20 75 20 70V30Z" stroke="#4479A1" strokeWidth="6" fill="none" />
        <ellipse cx="50" cy="30" rx="30" ry="10" stroke="#4479A1" strokeWidth="6" fill="none" />
        <path d="M20 50C20 55 35 60 50 60C65 60 80 55 80 50" stroke="#4479A1" strokeWidth="6" fill="none" />
      </svg>
    );
  }

  // Cypress - Green Circle
  if (normalizedKey.includes("cypress")) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" stroke="#22c55e" strokeWidth="10" fill="none" />
        <path d="M70 35L42 63L30 51" stroke="#22c55e" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Figma - Colorful Logo
  if (normalizedKey.includes("figma")) {
    return (
      <svg className={className} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE" />
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
      </svg>
    );
  }

  // Git - Official Orange Logo
  if (normalizedKey === "git") {
    return (
      <svg className={className} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M246.6 114.7L141.3 9.4c-6.2-6.2-16.4-6.2-22.6 0L106 21.9l30 30c6.6-2.2 14.3-.7 19.5 4.5 5.3 5.3 6.7 13.1 4.3 19.7l29 29c6.6-2.4 14.4-.9 19.7 4.3 7.3 7.3 7.3 19.2 0 26.5-7.3 7.3-19.2 7.3-26.5 0-5.6-5.6-7-13.9-4.1-20.7L149.6 92v73.2c1.9.9 3.6 2.3 4.9 4.1 5.8 7.3 4.7 18-2.6 23.9-7.3 5.8-18 4.7-23.9-2.6-5.8-7.3-4.7-18 2.6-23.9 2.5-2 5.5-3.2 8.6-3.6V88.8c-3.1-.4-6.1-1.6-8.6-3.6-5.3-5.3-6.7-13.1-4.3-19.7L97.5 36.6 9.4 124.7c-6.2 6.2-6.2 16.4 0 22.6l105.3 105.3c6.2 6.2 16.4 6.2 22.6 0l109.3-109.3c6.2-6.2 6.2-16.4 0-22.6z" fill="#F05032" />
        <circle cx="178.6" cy="138.6" r="15" fill="#F05032" />
        <circle cx="148.6" cy="208.6" r="15" fill="#F05032" />
        <circle cx="148.6" cy="68.6" r="15" fill="#F05032" />
      </svg>
    );
  }

  // GitHub - Iconic Octocat SVG Logo
  if (normalizedKey.includes("github")) {
    return (
      <svg className={className} viewBox="0 0 98 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.224-5.623-5.429-7.17-5.429-7.17-4.446-3.016.324-3.016.324-3.016 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.222-22.24-5.459-22.24-24.113 0-5.30 1.86-9.617 4.93-13.04-.48-1.221-2.18-6.191.48-12.87 0 0 4.04-1.303 13.3 4.97 3.88-1.059 7.99-1.588 12.1-1.588 4.1 0 8.22.529 12.1 1.588 9.26-6.273 13.3-4.97 13.3-4.97 2.66 6.679.96 11.649.48 12.87 3.07 3.423 4.93 7.74 4.93 13.04 0 18.705-11.41 22.875-22.33 24.051 1.74 1.503 3.24 4.403 3.24 8.887 0 6.438-.08 11.649-.08 13.2 0 1.303.88 2.853 3.31 2.363C84.03 89.37 98 70.96 98 49.217 98 22 76.15 0 48.85 0z" fill="currentColor" />
      </svg>
    );
  }

  // GitLab - Official Multi-Color Fox Logo
  if (normalizedKey.includes("gitlab")) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M127.961 70.478l-12.012-36.966a3.864 3.864 0 00-7.34 0l-12.01 36.966H31.401L19.39 33.512a3.864 3.864 0 00-7.34 0L.039 70.478a7.728 7.728 0 002.808 8.64L64 123.633l61.153-44.515a7.728 7.728 0 002.808-8.64z" fill="#E24329" />
        <path d="M64 123.633l-32.599-53.155H.039a7.728 7.728 0 002.808 8.64L64 123.633z" fill="#FC6D26" />
        <path d="M.039 70.478a7.734 7.734 0 012.808-8.64l61.153-44.515L31.401 70.478H.039z" fill="#FCA326" />
        <path d="M64 123.633l32.599-53.155h31.362a7.728 7.728 0 01-2.808 8.64L64 123.633z" fill="#FC6D26" />
        <path d="M127.961 70.478a7.734 7.734 0 00-2.808-8.64L64 17.323l32.599 53.155h31.362z" fill="#FCA326" />
      </svg>
    );
  }

  // Power Platform / Dataverse - Purple Zap
  if (normalizedKey.includes("power") || normalizedKey.includes("dataverse")) {
    return <Zap className={`${className} text-purple-500`} />;
  }

  // Fallbacks by domain
  if (normalizedKey.includes("sql") || normalizedKey.includes("db") || normalizedKey.includes("data")) {
    return <Database className={`${className} text-emerald-500`} />;
  }
  if (normalizedKey.includes("api") || normalizedKey.includes("rest") || normalizedKey.includes("auth") || normalizedKey.includes("jwt") || normalizedKey.includes("session")) {
    return <Lock className={`${className} text-amber-500`} />;
  }
  if (normalizedKey.includes("test") || normalizedKey.includes("jest") || normalizedKey.includes("puppeteer") || normalizedKey.includes("qa")) {
    return <TestTube2 className={`${className} text-purple-500`} />;
  }

  return <Code2 className={`${className} text-primary`} />;
}
