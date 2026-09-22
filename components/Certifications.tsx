const certifications = [
    {
        title: "Full-Stack Developer Career Path",
        issuer: "Scrimba",
        description:
            "Comprehensive full-stack development training covering frontend development, React, backend development, APIs, databases, authentication, and real-world projects.",
    },
    {
        title: "Frontend Developer Career Path",
        issuer: "Scrimba",
        description:
            "Comprehensive frontend development training covering modern JavaScript, React, responsive design, APIs, and real-world projects.",
    },
    {
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        description:
            "Training focused on responsive layouts, modern HTML, CSS, accessibility, and building responsive web interfaces.",
    },
    {
        title: "JavaScript Algorithms and Data Structures",
        issuer: "freeCodeCamp",
        description:
            "Training covering JavaScript fundamentals, algorithms, data structures, and problem-solving techniques.",
    },
];

export default function Certifications() {
    return (
        <section id="certifications" className="w-full py-20 md:py-28">
            <div className="mx-auto max-w-6xl">
                {/* Section Header */}
                <div className="mb-12">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Certifications
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        Continuous Learning
                    </h2>

                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                        Professional training and certifications that support my
                        development experience and commitment to continuous learning.
                    </p>
                </div>

                {/* Certification Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    {certifications.map((certification) => (
                        <article
                            key={certification.title}
                            className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950"
                        >
                            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-xl dark:bg-gray-900">
                                🎓
                            </div>

                            <h3 className="text-lg font-semibold">
                                {certification.title}
                            </h3>

                            <p className="mt-2 text-sm font-medium text-blue-600">
                                {certification.issuer}
                            </p>

                            <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                {certification.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}