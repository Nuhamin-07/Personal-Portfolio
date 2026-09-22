import Section from "@/components/shared/Section";

const skills = {
    Frontend: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
    ],
    Backend: [
        "Node.js",
        "Express",
        "REST APIs",
    ],
    Database: [
        "SQLite",
        "MongoDB",
        "MySQL",
        "Supabase",
    ],
    Tools: [
        "Git",
        "GitHub",
        "Vercel",
        "Figma",
    ],
};

export default function Skills() {
    return (
        <Section id="skills">
            <h2 className="text-3xl font-bold">
                Skills
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
                {Object.entries(skills).map(
                    ([category, items]) => (
                        <div
                            key={category}
                            className="rounded-xl border p-6"
                        >
                            <h3 className="font-semibold">
                                {category}
                            </h3>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full border px-3 py-1 text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>
        </Section>
    );
}