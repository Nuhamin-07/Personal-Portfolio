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
}

export const projects: Project[] = [
    {
        title: "PrintForge 3D Marketplace",
        category: "Full-Stack Web App",
        description:
            "A modern 3D model marketplace featuring dynamic model previews, search & filter algorithms, user collections, and responsive checkout UX.",
        problem: "3D creators needed a fast, performant platform to showcase, license, and download complex 3D assets with rich metadata.",
        solution: "Built a high-speed Next.js marketplace with SSR catalog pages, dynamic search indexing, and optimized asset loading pipelines.",
        highlights: [
            "Dynamic catalog searching and filtering system",
            "SSR optimized product detail pages with instant navigation",
            "Custom responsive 3D model card previews"
        ],
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Node.js"],
        githubUrl: "https://github.com/Nuhamin-07/PrintForge",
        liveUrl: "https://printforge-3d-models.netlify.app",
        gradient: "from-blue-600/20 via-indigo-600/10 to-purple-600/20",
        icon: "🖨️",
    },
    {
        title: "Full-Stack E-Commerce Platform",
        category: "E-Commerce",
        description:
            "Full-stack e-commerce web application with real-time product inventory, persistent shopping cart, checkout workflow, and administrative management.",
        problem: "Small retailers require reliable, customizable e-commerce web solutions that process carts seamlessly without heavy overhead.",
        solution: "Engineered an end-to-end e-commerce store with Node.js REST APIs, stateful cart management, and dark/light responsive UI.",
        highlights: [
            "Stateful cart persistence across user sessions",
            "RESTful API backend for product catalog & inventory management",
            "Mobile-optimized responsive checkout experience"
        ],
        technologies: ["Next.js", "Node.js", "Express", "TypeScript", "Tailwind CSS"],
        githubUrl: "https://github.com/Nuhamin-07/Ecommerce-Platform",
        liveUrl: "https://nuhamin-ecommerce-shop.netlify.app",
        gradient: "from-emerald-600/20 via-teal-600/10 to-cyan-600/20",
        icon: "🛍️",
    },
    {
        title: "Task Management Application",
        category: "Productivity",
        description:
            "A real-time task and workflow management system with JWT authentication, protected routes, category tags, and CRUD operations.",
        problem: "Teams and individuals need intuitive, distraction-free productivity tools to organize projects and track task statuses efficiently.",
        solution: "Created a full-stack dashboard featuring protected authentication boundaries, SQLite data persistence, and drag-and-drop task workflows.",
        highlights: [
            "Secure user authentication & session handling",
            "Complete CRUD task pipelines with real-time status updates",
            "Lightweight database structure using Express & SQLite"
        ],
        technologies: ["React", "Express", "SQLite", "Node.js", "CSS Modules"],
        githubUrl: "https://github.com/Nuhamin-07/Task-Manager",
        liveUrl: "https://nuhamin-task-management.netlify.app/",
        gradient: "from-amber-600/20 via-orange-600/10 to-red-600/20",
        icon: "⚡",
    },
    {
        title: "Student Information Management (SIMS)",
        category: "Enterprise System",
        description:
            "Enterprise platform for managing student academic records, enrollment workflows, transcripts, and faculty operations.",
        problem: "Educational institutions require secure, scalable portals for handling multi-department student data and administrative approval pipelines.",
        solution: "Delivered a Power Pages & Dataverse enterprise solution with customized JavaScript business logic and role-based data views.",
        highlights: [
            "Role-based security & dataverse record access controls",
            "Custom frontend validation workflows and automated record routing",
            "Streamlined enrollment and academic status dashboards"
        ],
        technologies: ["Power Pages", "Dataverse", "JavaScript", "REST APIs", "CSS3"],
        gradient: "from-sky-600/20 via-blue-600/10 to-indigo-600/20",
        icon: "🎓",
    },
    {
        title: "AI Movie Recommendation Engine",
        category: "AI & Data",
        description:
            "AI-driven movie discovery tool using vector embeddings and semantic search to deliver personalized media recommendations.",
        problem: "Standard keyword movie searches fail to capture thematic nuances or user mood preferences.",
        solution: "Integrated Supabase vector embeddings with a modern React frontend to match user queries with contextual similarity scores.",
        highlights: [
            "Vector database integration for semantic similarity queries",
            "Interactive media filter controls and movie detail popups",
            "Fast response caching and responsive UI cards"
        ],
        technologies: ["React", "Supabase", "AI Embeddings", "Tailwind CSS", "JavaScript"],
        githubUrl: "https://github.com/Nuhamin-07/Movie-Recommender",
        gradient: "from-purple-600/20 via-fuchsia-600/10 to-pink-600/20",
        icon: "🎬",
    },
    {
        title: "Studio Design & Booking Site",
        category: "Web Application",
        description:
            "A modern, responsive creative studio website featuring artist portfolios, service showcases, photo galleries, and an online appointment booking flow.",
        problem: "Creative studios need high-impact visual branding combined with seamless client booking workflows.",
        solution: "Designed a dark-mode first Next.js experience featuring image gallery lightboxes, service breakdowns, and interactive booking forms.",
        highlights: [
            "High-resolution gallery layout with smooth hover transitions",
            "Interactive appointment scheduling interface",
            "Optimized Core Web Vitals performance and accessibility"
        ],
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "React"],
        githubUrl: "https://github.com/Nuhamin-07/Studio-Website",
        gradient: "from-rose-600/20 via-pink-600/10 to-red-600/20",
        icon: "🎨",
    },
];
