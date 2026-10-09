export interface Certification {
    title: string;
    issuer: string;
    icon: string;
    description: string;
    topics: string[];
    image: string;
}

export const certifications: Certification[] = [
    {
        title: "Full Stack Developer Career Path",
        issuer: "Scrimba",
        icon: "🚀",
        description:
            "Comprehensive full-stack engineering path covering React, Next.js, Node.js, Express, REST APIs, database design, authentication, and production web app deployment.",
        topics: ["React", "Node.js", "Express", "REST APIs"],
        image: "/certificates/fullstack-scrimba.jpg"
    },
    {
        title: "Frontend Developer Career Path",
        issuer: "Scrimba",
        icon: "⚡",
        description:
            "Advanced frontend development curriculum focusing on modern JavaScript (ES6+), React state management, responsive UI design, performance optimization, and accessibility.",
        topics: ["React", "JavaScript ES6+", "UI/UX", "CSS3"],
        image: "/certificates/frontend-scrimba.jpg"
    },
    {
        title: "Microsoft Power Up Program",
        issuer: "Microsoft",
        icon: "🛡️",
        description:
            "Specialized enterprise training on Microsoft Power Platform, building custom business portals in Power Pages, Canvas & Model-Driven Apps, Dataverse data modeling, and Power Automate workflows.",
        topics: ["Power Pages", "Dataverse", "Power Automate", "Power Apps"],
        image: "/certificates/powerapp-credly.jpg"
    },
    {
        title: "Learn React",
        issuer: "Scrimba",
        icon: "⚛️",
        description:
            "In-depth interactive certification covering React components, custom hooks, context API, state management patterns, side effects, and modern single-page web app architecture.",
        topics: ["React Hooks", "State Management", "JSX", "SPAs"],
        image: "/certificates/react-scrimba.jpg"
    },
    {
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        icon: "📱",
        description:
            "Rigorous developer certification in modern HTML5, CSS3, Flexbox, CSS Grid layouts, media queries, accessibility standards (WCAG AA), and fluid cross-device UI design.",
        topics: ["HTML5", "CSS3", "Flexbox", "WCAG a11y"],
        image: "/certificates/web-freecodecamp.jpg"
    },
    {
        title: "JavaScript Algorithms & Data Structures",
        issuer: "freeCodeCamp",
        icon: "🧠",
        description:
            "Fundamental software engineering training in JavaScript core mechanics, algorithmic problem solving, object-oriented programming (OOP), functional programming, and data structures.",
        topics: ["Algorithms", "Data Structures", "ES6+", "OOP"],
        image: "/certificates/js-freecodecamp.jpg"
    },
];

