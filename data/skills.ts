export interface SkillCategory {
    title: string;
    icon: string;
    description: string;
    skills: string[];
}

export const skillCategories: SkillCategory[] = [
    {
        title: "Frontend Engineering",
        icon: "💻",
        description: "Building responsive, modern, accessible user interfaces",
        skills: ["Next.js", "React.js", "TypeScript", "JavaScript (ES6+)", "Redux / Redux Toolkit", "React Query", "Tailwind CSS", "Material UI", "Sass / CSS3", "HTML5"],
    },
    {
        title: "Backend & API Architecture",
        icon: "⚙️",
        description: "Architecting RESTful services, server authentication, and backend workflows",
        skills: ["Node.js", "Express.js", "REST APIs", "Session Authentication", "JWT Auth", "API Integration", "Java"],
    },
    {
        title: "Databases & Storage",
        icon: "🗄️",
        description: "Managing relational, document, and enterprise data models",
        skills: ["MongoDB", "MySQL", "SQLite", "Microsoft Dataverse", "SQL"],
    },
    {
        title: "Automated Testing & QA",
        icon: "🧪",
        description: "Ensuring code quality, visual regression prevention, and E2E reliability",
        skills: ["Cypress", "Puppeteer", "Jest", "TDD (Test-Driven Dev)", "BDD (Behavior-Driven Dev)"],
    },
    {
        title: "Microsoft Power Platform",
        icon: "⚡",
        description: "Building enterprise portals, low-code apps, workflows, and analytics",
        skills: ["Power Pages", "Power Apps (Canvas & Model-Driven)", "Power Automate", "Dataverse", "Power BI", "Liquid", "FetchXML"],
    },
    {
        title: "Developer Tools & Workflow",
        icon: "🛠️",
        description: "Version control, collaboration, design handoff, and agile methodologies",
        skills: ["Git", "GitHub", "GitLab", "Figma", "Agile Scrum", "SAFe", "Postman", "Vercel / Netlify"],
    },
];

