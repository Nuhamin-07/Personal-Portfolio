export interface Project {
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
    isFeatured?: boolean;
}

export const projects: Project[] = [
    {
        title: "Task Management System",
        category: "Full-Stack Web App",
        description:
            "A full-stack workflow and task management dashboard featuring secure session-based authentication, user role management, protected routes, and instant task CRUD pipelines.",
        problem: "Users and teams need a lightweight, distraction-free productivity app with persistent authentication and zero third-party lock-in.",
        solution: "Engineered an end-to-end full-stack web application with Node.js/Express server logic, SQLite data persistence, Express sessions, and a responsive React frontend.",
        highlights: [
            "Session-based authentication with secure cookie management and protected route boundaries",
            "Complete CRUD task operations with real-time status transitions and priority tags",
            "Multi-parameter search, category filtering, and responsive mobile layout"
        ],
        technologies: ["React", "TypeScript", "Node.js", "Express", "SQLite", "Express Session"],
        githubUrl: "https://github.com/Nuhamin-07/Task-Manager",
        liveUrl: "https://nuhamin-task-management.netlify.app/",
        gradient: "from-blue-600/20 via-indigo-600/10 to-purple-600/20",
        icon: "⚡",
        isFeatured: true,
    },
    {
        title: "Student Information System (SIMS)",
        category: "Enterprise System",
        description:
            "Enterprise higher-education portal for Florida University Southeast managing student admissions, course registrations, grading, attendance, and academic administration.",
        problem: "Educational institutions require unified, highly secure portals to process multi-department student data with strict role authorization.",
        solution: "Delivered a custom Power Pages portal backed by Microsoft Dataverse data schemas, Liquid templates, FetchXML queries, and automated cloud workflows.",
        highlights: [
            "Role-based security & Dataverse row-level data access governance",
            "Automated multi-stage approval workflows for admissions and transcript processing",
            "Real-time Power BI administrative reporting dashboards for academic leads"
        ],
        technologies: ["Power Pages", "Dataverse", "Power Automate", "Power BI", "JavaScript", "Liquid", "FetchXML"],
        gradient: "from-sky-600/20 via-blue-600/10 to-indigo-600/20",
        icon: "🎓",
        isFeatured: true,
    },
    {
        title: "Merchant Portal & Platform",
        category: "Fintech & SaaS",
        description:
            "High-traffic SaaS merchant management portal and multi-tenant e-commerce platform featuring transaction analytics, product catalog management, and automated testing.",
        problem: "Merchants and administrators require fast data tables with sub-second filtering and automated regression testing across checkout flows.",
        solution: "Built a modular React application powered by React Query for server-state caching, Material UI design components, and comprehensive Cypress E2E automation.",
        highlights: [
            "Advanced data table pagination, multi-field searching, sorting, and tag filtering",
            "Behavior-Driven Development (BDD) Cypress E2E test suites verifying core checkout paths",
            "Optimized React Query caching reducing unnecessary API network calls by 30%"
        ],
        technologies: ["React", "JavaScript", "Material UI", "React Query", "Axios", "Cypress", "BDD"],
        githubUrl: "https://github.com/Nuhamin-07/Ecommerce-Platform",
        gradient: "from-emerald-600/20 via-teal-600/10 to-cyan-600/20",
        icon: "🛍️",
        isFeatured: true,
    },
    {
        title: "Hospital Management System",
        category: "Healthcare Software",
        description:
            "Enterprise clinical software suite powering medical laboratory requests, pathology diagnostic reports, digital prescriptions, patient referrals, and HR management.",
        problem: "Hospitals experience diagnostic delays when relying on manual paper-based record routing between departments.",
        solution: "Architected a multi-module Java application backed by MySQL database with custom audit logging, medical certificate generation, and secure record lookups.",
        highlights: [
            "7 core clinical modules: Lab Requests, Lab Reports, Pathology, Prescriptions, Referrals, Certificates, HR",
            "Optimized MySQL database query structures for instant patient history retrieval",
            "Built-in PDF report generation and medical staff credential tracking"
        ],
        technologies: ["Java", "Java Swing", "MySQL", "JDBC", "SQL", "Agile"],
        gradient: "from-purple-600/20 via-fuchsia-600/10 to-pink-600/20",
        icon: "🏥",
        isFeatured: false,
    },
    {
        title: "ERP HR & Payroll System",
        category: "Enterprise System",
        description:
            "Enterprise Resource Planning system interfaces specializing in automated payroll processing, employee directory management, and complex workflow forms.",
        problem: "Large organizations need predictable state management and error-free payroll calculation interfaces.",
        solution: "Developed modular React interfaces managed with Redux Toolkit and validated using Puppeteer and Cypress automated test runs.",
        highlights: [
            "Redux global state store architecture for multi-step payroll wizard steps",
            "Automated visual regression and E2E test coverage using Puppeteer and Cypress",
            "Responsive enterprise UI styling with Sass and custom CSS design systems"
        ],
        technologies: ["React", "Redux", "JavaScript", "Sass", "Cypress", "Puppeteer"],
        gradient: "from-amber-600/20 via-orange-600/10 to-red-600/20",
        icon: "🏢",
        isFeatured: false,
    },
    {
        title: "PrintForge 3D Marketplace",
        category: "Full-Stack Web App",
        description:
            "Modern 3D printable model marketplace featuring SSR product catalogs, dynamic filter algorithms, creator collections, and responsive checkout UX.",
        problem: "3D creators needed a fast, performant platform to showcase, license, and download complex 3D assets with rich metadata.",
        solution: "Built a high-speed Next.js marketplace with SSR catalog pages, dynamic search indexing, and optimized asset loading pipelines.",
        highlights: [
            "Dynamic catalog searching and multi-category filtering system",
            "SSR optimized product detail pages with instant navigation and SEO metadata",
            "Custom responsive 3D model card previews and dark mode visual theme"
        ],
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Node.js"],
        githubUrl: "https://github.com/Nuhamin-07/PrintForge",
        liveUrl: "https://printforge-3d-models.netlify.app",
        gradient: "from-rose-600/20 via-pink-600/10 to-red-600/20",
        icon: "🖨️",
        isFeatured: true,
    },
];

