export interface ConceptModule {
    module: string;
    topic: string;
}

export interface Certification {
    id: string;
    title: string;
    issuer: string;
    category: "CLOUD ARCHITECTURE" | "FRONTEND DEV" | "BACKEND DEV";
    issuedDate: string;
    quarter: string;
    status: string;
    icon: string;
    description: string;
    cardSkills: string[];
    validatedSkills: string[];
    keyConceptModules: ConceptModule[];
    topics: string[];
    keyConcepts: string[];
    image: string;
    completionDate?: string;
    credentialUrl?: string;
}

export const certifications: Certification[] = [
    {
        id: "powerapp-credly",
        title: "Microsoft Power Up Program",
        issuer: "Microsoft",
        category: "CLOUD ARCHITECTURE",
        issuedDate: "JUL 2024",
        quarter: "Q3 2024",
        status: "CURRENT",
        icon: "🛡️",
        description:
            "Validated proficiency in enterprise cloud architecture, building secure business solutions with Power Pages, Canvas & Model-Driven Apps, relational Dataverse modeling, and automated cloud workflows.",
        cardSkills: ["CLOUD COMPUTING", "SYSTEMS DESIGN"],
        validatedSkills: [
            "Cloud Computing",
            "Systems Design",
            "Dataverse",
            "Power Pages",
            "Power Automate"
        ],
        keyConceptModules: [
            { module: "Module 1: Enterprise Dataverse", topic: "Cloud Architecture" },
            { module: "Module 2: Power Pages Portals", topic: "Systems Security" },
            { module: "Module 3: Automated Cloud Workflows", topic: "Systems Integration" }
        ],
        topics: ["Power Pages", "Dataverse", "Power Automate", "Power Apps"],
        keyConcepts: [
            "Enterprise Dataverse Relational Data Modeling",
            "Power Pages Portal Customization & Liquid Templates",
            "Automated Business Workflows with Power Automate",
            "Role-Based Access Control & Security Governance"
        ],
        image: "/certificates/powerapp-credly.jpg",
        completionDate: "2024",
        credentialUrl: "https://www.credly.com/org/microsoft"
    },
    {
        id: "fullstack-scrimba",
        title: "Full Stack Developer Career Path",
        issuer: "Scrimba",
        category: "BACKEND DEV",
        issuedDate: "MAY 2024",
        quarter: "Q2 2024",
        status: "CURRENT",
        icon: "🚀",
        description:
            "Validated proficiency in modern full-stack web engineering, server-side rendering, RESTful APIs, relational databases, state elevation, and cloud production deployment.",
        cardSkills: ["CLOUD COMPUTING", "SYSTEMS DESIGN"],
        validatedSkills: [
            "React",
            "Redux",
            "Next.js",
            "Vercel",
            "Auto Scaling"
        ],
        keyConceptModules: [
            { module: "Module 1: Full-Stack React & Next.js", topic: "SSR & Web Apps" },
            { module: "Module 2: RESTful Express & Node APIs", topic: "Backend Architecture" },
            { module: "Module 3: PostgreSQL Schema Modeling", topic: "Database Design" }
        ],
        topics: ["React", "Next.js", "Node.js", "Express", "REST APIs", "PostgreSQL"],
        keyConcepts: [
            "Full-Stack Web Architecture & Server-Side Rendering",
            "RESTful & GraphQL API Design with Node & Express",
            "Relational Database Modeling & Schema Management",
            "JWT Authentication, Security & Production Deployment"
        ],
        image: "/certificates/fullstack-scrimba.jpg",
        completionDate: "2024",
        credentialUrl: "https://scrimba.com/certificate/u9g7gZcB/gfullstack"
    },
    {
        id: "frontend-scrimba",
        title: "Frontend Developer Career Path",
        issuer: "Scrimba",
        category: "FRONTEND DEV",
        issuedDate: "JAN 2024",
        quarter: "Q1 2024",
        status: "CURRENT",
        icon: "⚡",
        description:
            "Validated proficiency in advanced frontend architecture, responsive layout engineering, component design patterns, modern asynchronous JavaScript, and accessibility standards.",
        cardSkills: ["FRONTEND DEV", "SYSTEMS DESIGN"],
        validatedSkills: [
            "React",
            "JavaScript",
            "UI/UX",
            "CSS3",
            "Tailwind CSS"
        ],
        keyConceptModules: [
            { module: "Module 1: Component UI Architecture", topic: "React Components" },
            { module: "Module 2: Asynchronous JS & Web APIs", topic: "Asynchronous JS" },
            { module: "Module 3: Fluid Responsive Systems", topic: "Tailwind & CSS" }
        ],
        topics: ["React", "JavaScript", "UI/UX", "CSS3", "Tailwind CSS"],
        keyConcepts: [
            "Component-Driven UI Architecture with React",
            "Asynchronous JavaScript, Fetch API & Async/Await",
            "Responsive Design & Fluid Typography Systems",
            "Web Performance Optimization & WCAG Accessibility"
        ],
        image: "/certificates/frontend-scrimba.jpg",
        completionDate: "2024",
        credentialUrl: "https://scrimba.com/certificate/u9g7gZcB/gfrontend"
    },
    {
        id: "react-scrimba",
        title: "Learn React",
        issuer: "Scrimba",
        category: "FRONTEND DEV",
        issuedDate: "AUG 2023",
        quarter: "Q3 2023",
        status: "CURRENT",
        icon: "⚛️",
        description:
            "Validated proficiency in declarative React architecture, custom hook abstraction, state elevation, single-page application lifecycle, and context-driven data flow.",
        cardSkills: ["REACT HOOKS", "STATE MANAGEMENT"],
        validatedSkills: [
            "React",
            "React Hooks",
            "State Management",
            "JSX",
            "Context API"
        ],
        keyConceptModules: [
            { module: "Module 1: Declarative Component DOM", topic: "React Fundamentals" },
            { module: "Module 2: Custom Hooks & Side Effects", topic: "State & Hooks" },
            { module: "Module 3: Context API Global State", topic: "Context Architecture" }
        ],
        topics: ["React Hooks", "State Management", "JSX", "SPAs", "Context API"],
        keyConcepts: [
            "Declarative Component Lifecycle & Virtual DOM",
            "Custom Hook Encapsulation & Reusability",
            "Global State Elevation with React Context",
            "Side Effect Synchronization & Memory Management"
        ],
        image: "/certificates/react-scrimba.jpg",
        completionDate: "2023",
        credentialUrl: "https://scrimba.com/learn/learnreact"
    },
    {
        id: "js-freecodecamp",
        title: "JavaScript Algorithms & Data Structures",
        issuer: "freeCodeCamp",
        category: "FRONTEND DEV",
        issuedDate: "MAY 2023",
        quarter: "Q2 2023",
        status: "CURRENT",
        icon: "🧠",
        description:
            "Validated proficiency in fundamental computer science algorithms, complex data structures, algorithmic problem solving, functional programming, and object-oriented architecture.",
        cardSkills: ["ALGORITHMS", "DATA STRUCTURES"],
        validatedSkills: [
            "Algorithms",
            "Data Structures",
            "ES6+",
            "OOP",
            "Functional JS"
        ],
        keyConceptModules: [
            { module: "Module 1: Computational Complexity & Big-O", topic: "Algorithm Design" },
            { module: "Module 2: Hash Tables, Maps & Trees", topic: "Data Structures" },
            { module: "Module 3: Functional Methods & Immutability", topic: "Functional JS" }
        ],
        topics: ["Algorithms", "Data Structures", "ES6+", "OOP", "Functional JS"],
        keyConcepts: [
            "Algorithm Design, Time & Space Complexity",
            "Arrays, Objects, Maps, Sets & Recursive Algorithms",
            "Functional Programming & Immutability Patterns",
            "ES6+ Features, Closures & Prototype Inheritance"
        ],
        image: "/certificates/js-freecodecamp.jpg",
        completionDate: "2023",
        credentialUrl: "https://www.freecodecamp.org/certification/fcc/javascript-algorithms-and-data-structures"
    },
    {
        id: "web-freecodecamp",
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        category: "FRONTEND DEV",
        issuedDate: "JAN 2023",
        quarter: "Q1 2023",
        status: "CURRENT",
        icon: "📱",
        description:
            "Validated proficiency in modern responsive web standards, mobile-first design systems, CSS Grid and Flexbox layouts, semantic markup, and WCAG accessibility conformance.",
        cardSkills: ["RESPONSIVE DESIGN", "WEB STANDARDS"],
        validatedSkills: [
            "HTML5",
            "CSS3",
            "Flexbox",
            "CSS Grid",
            "WCAG a11y"
        ],
        keyConceptModules: [
            { module: "Module 1: Mobile-First Responsive Layouts", topic: "Responsive CSS" },
            { module: "Module 2: 2D Grid & Flexible Box Models", topic: "CSS Grid & Flex" },
            { module: "Module 3: Semantic Standards & ARIA", topic: "Accessibility" }
        ],
        topics: ["HTML5", "CSS3", "Flexbox", "CSS Grid", "WCAG a11y"],
        keyConcepts: [
            "Mobile-First Responsive Layout Strategy",
            "Advanced 2D Layout Systems with Flexbox & Grid",
            "Semantic HTML5 Markup & ARIA Landmarks",
            "Cross-Browser Rendering & Media Query Breakpoints"
        ],
        image: "/certificates/web-freecodecamp.jpg",
        completionDate: "2023",
        credentialUrl: "https://www.freecodecamp.org/certification/fcc/responsive-web-design"
    }
];
