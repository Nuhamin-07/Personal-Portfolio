import Link from "next/link";

const experiences = [
    {
        role: "Full-Stack / Frontend Developer",
        company: "Placid Solutions and Consulting",
        type: "Remote",
        period: "2022 – Present",
        description:
            "Developing and maintaining modern web applications and enterprise systems, with a strong focus on frontend development, user experience, and full-stack functionality.",
        responsibilities: [
            "Build responsive and reusable user interfaces using React and modern JavaScript.",
            "Develop backend services and REST APIs using Node.js and Express.",
            "Implement CRUD workflows, authentication, protected routes, and data-driven features.",
            "Work with enterprise applications and business workflows across different projects.",
            "Collaborate with developers and stakeholders to deliver maintainable software solutions.",
        ],
        technologies: [
            "React",
            "Next.js",
            "JavaScript",
            "TypeScript",
            "Node.js",
            "Express",
            "REST APIs",
            "Dataverse",
        ],
    },
];

export default function Experience() {
    return (
        <section id="experience" className="w-full py-20 md:py-28">
            <div className="mx-auto max-w-6xl">
                {/* Section Header */}
                <div className="mb-12">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Experience
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        Professional Experience
                    </h2>

                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                        Experience building modern web applications, enterprise systems,
                        and full-stack solutions across different projects.
                    </p>
                </div>

                {/* Experience Card */}
                <article className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 md:p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:justify-between">
                        <div>
                            <h3 className="text-2xl font-semibold">
                                {experiences[0].role}
                            </h3>

                            <p className="mt-2 text-lg font-medium text-blue-600">
                                {experiences[0].company}
                            </p>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {experiences[0].type}
                            </p>
                        </div>

                        <div className="md:text-right">
                            <p className="font-medium text-gray-800 dark:text-gray-200">
                                {experiences[0].period}
                            </p>
                        </div>
                    </div>

                    <p className="mt-6 max-w-4xl leading-relaxed text-gray-600 dark:text-gray-400">
                        {experiences[0].description}
                    </p>

                    {/* Responsibilities */}
                    <div className="mt-8">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
                            Key Contributions
                        </h4>

                        <ul className="mt-4 space-y-3">
                            {experiences[0].responsibilities.map((item) => (
                                <li
                                    key={item}
                                    className="flex gap-3 text-gray-600 dark:text-gray-400"
                                >
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mt-8">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
                            Technologies
                        </h4>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {experiences[0].technologies.map((technology) => (
                                <span
                                    key={technology}
                                    className="rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300"
                                >
                                    {technology}
                                </span>
                            ))}
                        </div>
                    </div>
                </article>

                {/* Resume CTA */}
                <div className="mt-8 text-center">
                    <Link
                        href="/resume"
                        className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
                    >
                        View Full Resume →
                    </Link>
                </div>
            </div>
        </section>
    );
}