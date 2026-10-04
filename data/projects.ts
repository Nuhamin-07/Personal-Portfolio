export interface Project {
    title: string;
    category: string;
    description: string;
    problem?: string;
    solution?: string;
    highlights: string[];
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    image: string;
    isFeatured?: boolean;
}

export const projects: Project[] = [
    {
        title: "Task Management System",
        category: "Full-Stack Web App",
        description:
            "Full-stack task management application with session-based authentication, user role management, protected routes, and persistent RESTful API endpoints.",
        highlights: [
            "Developed a full-stack task management application with session-based authentication and protected routes.",
            "Implemented user and task CRUD operations, search functionality, and responsive user interfaces.",
            "Built RESTful APIs and integrated SQLite for persistent data storage."
        ],
        technologies: ["React", "TypeScript", "Node.js", "Express.js", "SQLite", "Session Auth"],
        githubUrl: "https://github.com/Nuhamin-07/Task-Manager",
        liveUrl: "https://nuhamin-task-management.netlify.app/",
        image: "/projects/task-management.jpg",
        isFeatured: true,
    },
    {
        title: "PrintForge 3D Models Platform",
        category: "Full-Stack Web App",
        description:
            "Modern 3D model showcase and digital asset marketplace platform featuring reusable UI components and optimized frontend architecture.",
        highlights: [
            "Developed a modern 3D model showcase platform using Next.js and TypeScript.",
            "Built reusable UI components and responsive layouts.",
            "Implemented scalable frontend architecture and optimized performance."
        ],
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Node.js"],
        githubUrl: "https://github.com/Nuhamin-07/PrintForge",
        liveUrl: "https://printforge-3d-models.netlify.app/",
        image: "/projects/print-forge.jpg",
        isFeatured: true,
    },
    {
        title: "E-Commerce Platform",
        category: "Full-Stack Web App",
        description:
            "Modern e-commerce application engineered with reusable components, responsive product browsing experiences, and scalable frontend architecture.",
        highlights: [
            "Developed a modern e-commerce application with reusable components and responsive design.",
            "Built product browsing experiences and scalable frontend architecture."
        ],
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        githubUrl: "https://github.com/Nuhamin-07/ecommerce-shop",
        liveUrl: "https://nuhamin-ecommerce-shop.netlify.app/",
        image: "/projects/ecommerce.jpg",
        isFeatured: true,
    },
    {
        title: "Tattoo Studio Website",
        category: "Frontend & Web App",
        description:
            "Responsive tattoo studio web application featuring artist profile showcases, dynamic gallery pages, service listings, and appointment booking workflows.",
        highlights: [
            "Designed and developed a responsive tattoo studio website featuring artist profiles, gallery pages, services, and appointment booking workflows.",
            "Implemented dynamic routing, reusable components, and mobile-first design principles."
        ],
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
        githubUrl: "https://github.com/Nuhamin-07/tattoo-studio",
        liveUrl: "https://tattoo-studio-site.netlify.app/",
        image: "/projects/tatoo.jpg",
        isFeatured: true,
    },
    {
        title: "Student Information Management System (SIMS)",
        category: "Enterprise System",
        description:
            "Enterprise higher-education portal for Florida University Southeast supporting admissions, enrollment, grading, attendance, reporting, and academic administration.",
        highlights: [
            "Developed admissions, enrollment, attendance, grading, workflow automation, and reporting solutions.",
            "Built internal and external portals and automated academic processes with Power Pages and Dataverse."
        ],
        technologies: ["Power Apps", "Power Pages", "Power Automate", "Dataverse", "Power BI", "JavaScript", "Liquid", "FetchXML"],
        image: "/projects/sims.jpg",
        isFeatured: true,
    },
    {
        title: "Hospital Management System",
        category: "Healthcare Software",
        description:
            "Desktop clinical software application powering laboratory request tracking, pathology diagnostic reports, digital prescriptions, patient referrals, and HR management.",
        highlights: [
            "Developed laboratory, pathology, prescription, referral, HR management, and reporting modules.",
            "Participated in testing, deployment, and database maintenance activities."
        ],
        technologies: ["Java", "Java Swing", "MySQL", "SQL"],
        image: "/projects/hms-two.jpg",
        isFeatured: false,
    },
    {
        title: "Merchant Portal",
        category: "SaaS",
        description:
            "High-traffic merchant management portal and multi-tenant e-commerce platform delivering CRUD operations, advanced data tables, and Cypress E2E automation.",
        highlights: [
            "Developed merchant portal and e-commerce applications using React and Material UI.",
            "Implemented CRUD functionality, filtering, sorting, searching, pagination, and API integrations.",
            "Built Cypress end-to-end automation tests and BDD unit tests."
        ],
        technologies: ["React", "Material UI", "React Query", "Axios", "Cypress", "JavaScript", "GitLab"],
        image: "/projects/merchant-portal.jpg",
        isFeatured: true,
    },
    {
        title: "ERP System",
        category: "Enterprise System",
        description:
            "Enterprise Resource Planning platform user interfaces supporting finance, warehouse operations, HR directories, and automated payroll workflows.",
        highlights: [
            "Developed ERP interfaces and HR/payroll modules using React and Redux.",
            "Built automated testing pipelines using Cypress and Puppeteer."
        ],
        technologies: ["React", "Redux", "JavaScript", "Sass", "CSS", "Cypress", "Puppeteer"],
        image: "/projects/erp.jpg",
        isFeatured: false,
    },
];

