export type CategoryId = "all" | "fullstack" | "frontend";

export interface Certification {
    id: string;
    title: string;
    issuer: string;
    category: "fullstack" | "frontend";
    categories: ("fullstack" | "frontend")[];
    categoryLabel: string;
    issuedDate: string;
    icon: string;
    description: string;
    cardSkills: string[];
    validatedSkills: string[];
    keyConcepts: string[];
    image: string;
    completionDate?: string
}

export const certifications: Certification[] = [
    {
        id: "powerapp-credly",
        title: "Microsoft Power Up Program",
        issuer: "Microsoft",
        category: "fullstack",
        categories: ["fullstack"],
        categoryLabel: "Full-Stack",
        issuedDate: "Oct 2024",
        icon: "🛡️",
        description:
            "Completed the Microsoft Power Up program, gaining practical knowledge of Canvas and Model-Driven Power Apps, Microsoft Dataverse, Power Automate, and Power BI. Applied these concepts in a hands-on project integrating application development, data management, workflow automation, and business intelligence.",
        cardSkills: ["Power Apps", "Data Management", "Workflow Automation", "Business Intelligence"],
        validatedSkills: [
            "Canvas Apps",
            "Model-Driven Apps",
            "Microsoft Dataverse",
            "Power Automate",
            "Power BI"
        ],
        keyConcepts: [
            "Low-Code Application Development",
            "Canvas and Model-Driven App Design",
            "Dataverse Data Modeling",
            "Workflow and Business Process Automation",
            "Business Intelligence and Data Visualization",
            "Integrated Business Solution Development"
        ],
        image: "/certificates/powerapp-credly.jpg",
        completionDate: "2024"
    },
    {
        id: "fullstack-scrimba",
        title: "Full Stack Developer Career Path",
        issuer: "Scrimba",
        category: "fullstack",
        categories: ["fullstack"],
        categoryLabel: "Full-Stack",
        issuedDate: "July 2026",
        icon: "🚀",
        description:
            "Completed Scrimba’s Full-Stack Developer Path, building skills in frontend and backend development, databases, APIs, and AI engineering. Strengthened my practical experience by building solo projects and completing numerous coding challenges, applying modern technologies to develop full-stack web applications.",
        cardSkills: ["Frontend Development", "Backend Development", "Database", "AI Development"],
        validatedSkills: [
            "HTML5",
            "CSS3",
            "JavaScript ES6",
            "React.js",
            "TypeScript",
            "Next.js",
            "Responsive Web Design",
            "Node.js",
            "Express.js",
            "REST APIs",
            "Database Design",
            "Database Integration",
            "Data Management",
            "AI Engineering"
        ],

        keyConcepts: [
            "Semantic HTML and Modern CSS",
            "Responsive Web Design and UI Principles",
            "JavaScript Programming and Asynchronous Operations",
            "API Integration and Data Fetching",
            "Component-Based Development with React",
            "Type-Safe Development with TypeScript",
            "Full-Stack Web Development with Next.js",
            "Server-Side Development with Node.js and Express.js",
            "Database Fundamentals and Data Persistence",
            "AI Engineering Fundamentals"
        ],
        image: "/certificates/fullstack-scrimba.jpg",
        completionDate: "2026"
    },
    {
        id: "frontend-scrimba",
        title: "Frontend Developer Career Path",
        issuer: "Scrimba",
        category: "frontend",
        categories: ["frontend"],
        categoryLabel: "Frontend",
        issuedDate: "July 2025",
        icon: "⚡",
        description:
            "Completed Scrimba’s Frontend Developer Career Path, developing practical skills in HTML, CSS, JavaScript, React, responsive design, and API integration. Built interactive web projects and completed numerous coding challenges, strengthening my ability to create responsive, user-friendly, and dynamic frontend applications.",
        cardSkills: ["Core Web Development", "Frontend Frameworks and Libraries", "APIs and Asynchronous JavaScript", "UI Development"],
        validatedSkills: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Web Design",
            "React.js",
            "Component-Based Development",
            "State Management",
            "REST API Integration",
            "Fetch API",
            "UI Design Principles",
            "DOM Manipulation",
            "Web Accessibility"
        ],

        keyConcepts: [
            "Semantic HTML and Modern CSS",
            "Responsive and Mobile-First Web Design",
            "JavaScript Fundamentals and DOM Manipulation",
            "Interactive User Interface Development",
            "React Components, Props, and State",
            "React Hooks and State Management",
            "REST API Integration and Data Fetching",
            "Asynchronous JavaScript and Promises",
            "User-Centered UI Design and Accessibility"
        ],
        image: "/certificates/frontend-scrimba.jpg",
        completionDate: "2025"
    },
    {
        id: "react-scrimba",
        title: "Learn React",
        issuer: "Scrimba",
        category: "frontend",
        categories: ["frontend"],
        categoryLabel: "Frontend",
        issuedDate: "AUG 2024",
        icon: "⚛️",
        description:
            "Completed Scrimba’s Learn React course, gaining hands-on experience with reusable components, data-driven rendering, state management, and side effects. Practiced building interactive user interfaces and applying core React concepts through coding exercises and practical challenges.",
        cardSkills: ["React Hooks", "State Management", "Reusable Components", "Event Handling"],
        validatedSkills: [
            "React.js",
            "JSX",
            "React Hooks",
            "State Management",
            "Context API",
            "Event Handling",
            "Dynamic UI Development",
            "React Router"
        ],

        keyConcepts: [
            "Static Pages with React Components",
            "JSX and Component Composition",
            "Props and Reusable UI Components",
            "Data-Driven React Rendering",
            "Lists and Dynamic Content",
            "State Management with useState",
            "Event Handling and Interactive UI",
            "Side Effects in React",
            "useEffect Hook Fundamentals"
        ],
        image: "/certificates/react-scrimba.jpg",
        completionDate: "2024"
    },
    {
        id: "js-freecodecamp",
        title: "JavaScript Algorithms & Data Structures",
        issuer: "freeCodeCamp",
        category: "frontend",
        categories: ["frontend"],
        categoryLabel: "Frontend",
        issuedDate: "Oct 2023",
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

        keyConcepts: [
            "Algorithm Design, Time & Space Complexity",
            "Arrays, Objects, Maps, Sets & Recursive Algorithms",
            "Functional Programming & Immutability Patterns",
            "ES6+ Features, Closures & Prototype Inheritance"
        ],
        image: "/certificates/js-freecodecamp.jpg",
        completionDate: "2023"
    },
    {
        id: "web-freecodecamp",
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        category: "frontend",
        categories: ["frontend"],
        categoryLabel: "Frontend",
        issuedDate: "Apr 2022",
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
        keyConcepts: [
            "Mobile-First Responsive Layout Strategy",
            "Advanced 2D Layout Systems with Flexbox & Grid",
            "Semantic HTML5 Markup & ARIA Landmarks",
            "Cross-Browser Rendering & Media Query Breakpoints"
        ],
        image: "/certificates/web-freecodecamp.jpg",
        completionDate: "2022",
    }
];
