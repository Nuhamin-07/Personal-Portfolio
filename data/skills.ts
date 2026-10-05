export interface DetailedSkill {
  name: string;
  level: "Expert" | "Advanced" | "Proficient";
  iconKey: string;
  description?: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  lucideIconName: string;
  description: string;
  accentColor: string;
  skills: string[];
  detailedSkills: DetailedSkill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    shortTitle: "Frontend",
    icon: "💻",
    lucideIconName: "Code2",
    description: "Building responsive, modern, accessible user interfaces with cutting-edge web technologies",
    accentColor: "from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
    skills: [
      "Next.js",
      "React.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Redux / Redux Toolkit",
      "React Query",
      "Tailwind CSS",
      "Material UI",
      "Sass / CSS3",
      "HTML5",
    ],
    detailedSkills: [
      { name: "Next.js", level: "Expert", iconKey: "nextjs", featured: true, description: "App router, SSR/SSG, Server Actions & performance optimization" },
      { name: "React.js", level: "Expert", iconKey: "react", featured: true, description: "Custom hooks, component patterns, state management & virtual DOM optimization" },
      { name: "TypeScript", level: "Advanced", iconKey: "typescript", featured: true, description: "Strict typing, generic interfaces, type guards & utility types" },
      { name: "JavaScript (ES6+)", level: "Expert", iconKey: "javascript", description: "Async/await, closure, ES modules, DOM manipulation & modern APIs" },
      { name: "Redux / Redux Toolkit", level: "Advanced", iconKey: "redux", description: "Global state slice architecture, RTK Query & middleware" },
      { name: "React Query", level: "Advanced", iconKey: "reactquery", description: "Server-state caching, optimistic updates & pagination" },
      { name: "Tailwind CSS", level: "Expert", iconKey: "tailwind", featured: true, description: "Utility-first design systems, dark mode & responsive layouts" },
      { name: "Material UI", level: "Proficient", iconKey: "mui", description: "Enterprise UI component libraries, custom theme overrides" },
      { name: "Sass / CSS3", level: "Advanced", iconKey: "sass", description: "Flexbox, CSS Grid, keyframe animations, BEM & preprocessors" },
      { name: "HTML5", level: "Expert", iconKey: "html5", description: "Semantic markup, web accessibility (a11y) & SEO optimization" },
    ],
  },
  {
    id: "backend",
    title: "Backend & API Architecture",
    shortTitle: "Backend",
    icon: "⚙️",
    lucideIconName: "Server",
    description: "Architecting RESTful services, server authentication, and backend workflows",
    accentColor: "from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Session Authentication",
      "JWT Auth",
      "API Integration",
      "Java",
    ],
    detailedSkills: [
      { name: "Node.js", level: "Advanced", iconKey: "nodejs", featured: true, description: "Event loop, asynchronous I/O, server modules & streaming APIs" },
      { name: "Express.js", level: "Advanced", iconKey: "express", description: "Middleware routing, controller patterns & error handling" },
      { name: "REST APIs", level: "Expert", iconKey: "restapi", featured: true, description: "Resource endpoints, HTTP methods, JSON payloads & status codes" },
      { name: "Session Authentication", level: "Advanced", iconKey: "session", description: "Secure cookie sessions, express-session & stateful auth" },
      { name: "JWT Auth", level: "Advanced", iconKey: "jwt", description: "Stateless token validation, refresh tokens & RBAC permissions" },
      { name: "API Integration", level: "Expert", iconKey: "api", description: "Third-party SDKs, webhook receivers & payload normalization" },
      { name: "Java", level: "Proficient", iconKey: "java", description: "OOP principles, core data structures & backend business logic" },
    ],
  },
  {
    id: "databases",
    title: "Databases & Storage",
    shortTitle: "Databases",
    icon: "🗄️",
    lucideIconName: "Database",
    description: "Managing relational, document, and enterprise data models",
    accentColor: "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    skills: [
      "MongoDB",
      "MySQL",
      "SQLite",
      "Microsoft Dataverse",
    ],
    detailedSkills: [
      { name: "MongoDB", level: "Advanced", iconKey: "mongodb", featured: true, description: "Document schemas, Mongoose ODM, indexes & aggregation pipelines" },
      { name: "MySQL", level: "Advanced", iconKey: "mysql", description: "Relational table schemas, foreign key constraints & SQL queries" },
      { name: "SQLite", level: "Proficient", iconKey: "sqlite", description: "Embedded lightweight relational storage for desktop & dev environments" },
      { name: "Microsoft Dataverse", level: "Advanced", iconKey: "dataverse", featured: true, description: "Enterprise cloud relational database, security roles & relationship modeling" },
    ],
  },
  {
    id: "testing",
    title: "Automated Testing & QA",
    shortTitle: "Testing & QA",
    icon: "🧪",
    lucideIconName: "TestTube2",
    description: "Ensuring code quality, visual regression prevention, and E2E reliability",
    accentColor: "from-purple-500/20 to-violet-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30",
    skills: [
      "Cypress",
      "Puppeteer",
      "Jest",
      "TDD (Test-Driven Dev)",
      "BDD (Behavior-Driven Dev)",
    ],
    detailedSkills: [
      { name: "Cypress", level: "Expert", iconKey: "cypress", featured: true, description: "End-to-end web test automation, network intercept & element assertion" },
      { name: "Puppeteer", level: "Advanced", iconKey: "puppeteer", featured: true, description: "Headless Chrome automation, visual regression testing & PDF rendering" },
      { name: "Jest", level: "Advanced", iconKey: "jest", description: "Unit testing, component snapshots, mocks & code coverage reports" },
      { name: "TDD (Test-Driven Dev)", level: "Advanced", iconKey: "tdd", description: "Red-Green-Refactor development cycle for robust software" },
      { name: "BDD (Behavior-Driven Dev)", level: "Advanced", iconKey: "bdd", description: "Feature spec driven testing using user story scenarios" },
    ],
  },
  {
    id: "power-platform",
    title: "Microsoft Power Platform",
    shortTitle: "Power Platform",
    icon: "⚡",
    lucideIconName: "Zap",
    description: "Building enterprise portals, low-code apps, workflows, and analytics",
    accentColor: "from-rose-500/20 to-pink-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30",
    skills: [
      "Power Pages",
      "Power Apps (Canvas & Model-Driven)",
      "Power Automate",
      "Dataverse",
      "Power BI",
      "Liquid",
      "FetchXML",
    ],
    detailedSkills: [
      { name: "Power Pages", level: "Expert", iconKey: "powerpages", featured: true, description: "Custom external enterprise portals, Liquid templates & Web API integration" },
      { name: "Power Apps (Canvas & Model-Driven)", level: "Advanced", iconKey: "powerapps", featured: true, description: "Business application interfaces, complex formulas & data-bound forms" },
      { name: "Power Automate", level: "Advanced", iconKey: "powerautomate", description: "Automated business workflows, cloud flows & cross-service connectors" },
      { name: "Dataverse", level: "Advanced", iconKey: "dataverse", description: "Role-based access control, custom tables, columns & business rules" },
      { name: "Power BI", level: "Proficient", iconKey: "powerbi", description: "Interactive data dashboards, reports & visual metrics" },
      { name: "Liquid", level: "Advanced", iconKey: "liquid", description: "Server-side template rendering for Power Pages portal customization" },
      { name: "FetchXML", level: "Advanced", iconKey: "fetchxml", description: "Dataverse XML querying, joins, aggregations & filtering" },
    ],
  },
  {
    id: "tools",
    title: "Developer Tools & Workflow",
    shortTitle: "Tools & Workflow",
    icon: "🛠️",
    lucideIconName: "Wrench",
    description: "Version control, collaboration, design handoff, and agile methodologies",
    accentColor: "from-indigo-500/20 to-sky-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    skills: [
      "Git",
      "GitHub",
      "GitLab",
      "Figma",
      "Agile Scrum",
      "SAFe",
      "Postman",
      "Vercel / Netlify",
    ],
    detailedSkills: [
      { name: "Git", level: "Expert", iconKey: "git", featured: true, description: "Branching strategies, rebase, merge conflict resolution & history management" },
      { name: "GitHub", level: "Expert", iconKey: "github", description: "Pull requests, code review workflows, GitHub Actions & issues" },
      { name: "GitLab", level: "Advanced", iconKey: "gitlab", description: "GitLab CI/CD pipelines, repository management & issue boards" },
      { name: "Figma", level: "Advanced", iconKey: "figma", featured: true, description: "UI design handoff, component inspection, auto-layout & prototyping" },
      { name: "Agile Scrum", level: "Expert", iconKey: "scrum", description: "Sprint planning, daily standups, backlog grooming & retrospectives" },
      { name: "SAFe", level: "Proficient", iconKey: "safe", description: "Scaled Agile Framework principles for enterprise software delivery" },
      { name: "Postman", level: "Advanced", iconKey: "postman", description: "API request testing, collection runner, environment variables & mocks" },
      { name: "Vercel / Netlify", level: "Advanced", iconKey: "vercel", description: "Jamstack deployments, custom domains, environment configuration & edge functions" },
    ],
  },
];


