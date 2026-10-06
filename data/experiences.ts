export interface ExperienceMetric {
    value: string;
    label: string;
}

export interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    companyShort?: string;
    companyUrl?: string;
    companyDomain?: string;
    location: string;
    type: string;
    period: string;
    duration: string;
    isCurrent?: boolean;
    category: string;
    project?: string;
    description: string;
    metrics: ExperienceMetric[];
    responsibilities: string[];
    technologies: string[];
}

export const experiences: ExperienceItem[] = [
    {
        id: "fuse-sims",
        role: "Software Developer",
        company: "Florida University Southeast (FUSE)",
        companyShort: "FUSE",
        companyUrl: "https://fuse.education",
        companyDomain: "Higher-Ed Enterprise SIMS",
        location: "Remote",
        type: "Remote / Full-Time",
        period: "July 2024 – Present",
        duration: "1+ Year",
        isCurrent: true,
        category: "Enterprise & Cloud",
        project: "Student Information Management System (SIMS)",
        description:
            "Architecting and maintaining enterprise Student Information Management System (SIMS) solutions powering admissions, student enrollment, grading, attendance, and academic administration for an international university environment.",
        metrics: [
            { value: "40%", label: "Admin Turnaround Boost" },
            { value: "5+", label: "Power Platform Apps & Portals" },
            { value: "100%", label: "Dataverse RBAC Security" },
        ],
        responsibilities: [
            "Developed and customized high-traffic Power Pages student portals using client-side JavaScript, Liquid templates, and FetchXML queries.",
            "Engineered automated Power Automate cloud workflows for student admissions, grade approvals, and transcript processing, reducing administrative turnaround time by 40%.",
            "Modeled complex relational business data schemas in Microsoft Dataverse with granular role-based security and row-level access controls.",
            "Created Canvas Apps and Model-Driven Apps enabling faculty and staff to process enrollment and academic records seamlessly.",
            "Built interactive Power BI dashboards providing real-time data visualisations for university decision-makers on student retention and grading statistics.",
        ],
        technologies: [
            "Power Pages",
            "Power Apps",
            "Power Automate",
            "Dataverse",
            "Power BI",
            "JavaScript",
            "Liquid",
            "FetchXML",
            "REST APIs",
        ],
    },
    {
        id: "gotemeri-hms",
        role: "Software Developer",
        company: "Gotemeri Network Integrator Pvt. Ltd. Co.",
        companyShort: "Gotemeri",
        companyUrl: "https://gotemeri.com",
        companyDomain: "Clinical Hospital Systems",
        location: "Addis Ababa, Ethiopia",
        type: "On-Site / Full-Time",
        period: "January 2023 – December 2023",
        duration: "1 Year",
        category: "Healthcare & Systems",
        project: "Enterprise Hospital Management System",
        description:
            "Designed and engineered 7 core clinical and operational modules for an enterprise hospital management platform servicing clinical laboratories, pathology departments, and hospital administration.",
        metrics: [
            { value: "7", label: "Core Clinical Modules" },
            { value: "100%", label: "Patient Audit Accuracy" },
            { value: "MySQL", label: "Optimized Relational DB" },
        ],
        responsibilities: [
            "Developed 7 core medical modules: System Kickoff, Laboratory Requests, Laboratory Reports, Pathology Requests, Prescriptions, Referral Notes, and Medical Certificates.",
            "Engineered the Human Resource (HR) management sub-system for medical staff scheduling and credentials tracking.",
            "Implemented complex SQL database queries and reporting pipelines in MySQL to render instant patient history audits and diagnostic logs.",
            "Collaborated on end-to-end SDLC activities including requirement analysis, UI wireframing, integration testing, and deployment.",
        ],
        technologies: [
            "Java",
            "Java Swing",
            "MySQL",
            "JDBC",
            "SQL",
            "OOP",
            "Agile Development",
        ],
    },
    {
        id: "2fcapital-ecommerce",
        role: "Frontend Developer",
        company: "2F Capital PLC",
        companyShort: "2F Capital",
        companyUrl: "https://2fcapital.com",
        companyDomain: "FinTech & Merchant SaaS",
        location: "Addis Ababa, Ethiopia",
        type: "Full-Time",
        period: "March 2022 – November 2022",
        duration: "9 Months",
        category: "Frontend & E-Commerce",
        project: "Merchant Portal & Multi-Tenant E-Commerce Platform",
        description:
            "Engineered responsive React web applications for merchant platforms, delivering scalable CRUD interfaces, dynamic data dashboards, and automated test suites.",
        metrics: [
            { value: "25%", label: "Page Load Speedup" },
            { value: "100%", label: "BDD Test Suite Coverage" },
            { value: "Multi-Tenant", label: "Merchant Architecture" },
        ],
        responsibilities: [
            "Built responsive React single-page applications for merchant management and e-commerce administration with Material UI.",
            "Integrated RESTful APIs using React Query and Axios, building advanced data features including filtering, multi-field searching, sorting, and pagination.",
            "Authored comprehensive Cypress end-to-end automated test suites adhering to Behavior-Driven Development (BDD) standards to verify core checkout workflows.",
            "Optimized frontend bundle size, state re-renders, and network requests, boosting page load speeds by 25%.",
        ],
        technologies: [
            "React",
            "JavaScript",
            "Material UI",
            "React Query",
            "Axios",
            "Cypress",
            "BDD",
            "Git",
            "GitLab",
        ],
    },
    {
        id: "iwork-erp",
        role: "Frontend Developer",
        company: "iWork Technology PLC",
        companyShort: "iWork Tech",
        companyUrl: "https://iworktech.com",
        companyDomain: "Enterprise ERP & Payroll",
        location: "Addis Ababa, Ethiopia",
        type: "Full-Time",
        period: "July 2021 – January 2022",
        duration: "7 Months",
        category: "Frontend & ERP",
        project: "Enterprise Resource Planning (ERP) System",
        description:
            "Developed modular frontend user interfaces and automated QA testing pipelines for an enterprise ERP software solution.",
        metrics: [
            { value: "0", label: "UI Regressions via Cypress" },
            { value: "Redux", label: "Global State Architecture" },
            { value: "Payroll & HR", label: "Automated Workflows" },
        ],
        responsibilities: [
            "Engineered complex ERP interface components specializing in Human Resources (HR) and automated payroll processing workflows.",
            "Architected scalable global state management utilizing Redux and modern CSS/Sass styling modules.",
            "Implemented automated E2E and visual testing suites using Cypress and Puppeteer to eliminate UI regression bugs.",
            "Participated actively in daily Agile Scrum ceremonies, sprint planning, pull request code reviews, and cross-functional team pairing.",
        ],
        technologies: [
            "React",
            "Redux",
            "JavaScript",
            "CSS3",
            "Sass",
            "Cypress",
            "Puppeteer",
            "Agile Scrum",
        ],
    },
];

