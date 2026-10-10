export interface Certification {
    id: string;
    title: string;
    issuer: string;
    icon: string;
    description: string;
    topics: string[];
    keyConcepts: string[];
    image: string;
    completionDate?: string;
    credentialUrl?: string;
}

export const certifications: Certification[] = [
    {
        id: "fullstack-scrimba",
        title: "Full Stack Developer Career Path",
        issuer: "Scrimba",
        icon: "🚀",
        description:
            "Comprehensive full-stack engineering path covering React, Next.js, Node.js, Express, REST APIs, database design, authentication, and production web app deployment.",
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
        icon: "⚡",
        description:
            "Advanced frontend development curriculum focusing on modern JavaScript (ES6+), React state management, responsive UI design, performance optimization, and accessibility.",
        topics: ["React", "JavaScript ES6+", "UI/UX", "CSS3", "Tailwind CSS"],
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
        id: "powerapp-credly",
        title: "Microsoft Power Up Program",
        issuer: "Microsoft",
        icon: "🛡️",
        description:
            "Specialized enterprise training on Microsoft Power Platform, building custom business portals in Power Pages, Canvas & Model-Driven Apps, Dataverse data modeling, and Power Automate workflows.",
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
        id: "react-scrimba",
        title: "Learn React",
        issuer: "Scrimba",
        icon: "⚛️",
        description:
            "In-depth interactive certification covering React components, custom hooks, context API, state management patterns, side effects, and modern single-page web app architecture.",
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
        id: "web-freecodecamp",
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        icon: "📱",
        description:
            "Rigorous developer certification in modern HTML5, CSS3, Flexbox, CSS Grid layouts, media queries, accessibility standards (WCAG AA), and fluid cross-device UI design.",
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
    },
    {
        id: "js-freecodecamp",
        title: "JavaScript Algorithms & Data Structures",
        issuer: "freeCodeCamp",
        icon: "🧠",
        description:
            "Fundamental software engineering training in JavaScript core mechanics, algorithmic problem solving, object-oriented programming (OOP), functional programming, and data structures.",
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
    }
];


