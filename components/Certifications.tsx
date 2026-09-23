import Section from "@/components/shared/Section";
import { certifications } from "@/data/certifications";


export default function Certifications() {
    return (
        <Section id="certifications">
            {/* Section Header */}
            <div className="mb-12 text-center md:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    <span>Continuous Learning</span>
                </div>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Certifications & Specialized Training
                </h2>

                <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
                    Professional training credentials verifying full-stack engineering expertise and commitment to modern web standards.
                </p>
            </div>

            {/* Certification Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {certifications.map((cert) => (
                    <article
                        key={cert.title}
                        className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                    >
                        <div>
                            <div className="mb-4 flex items-center justify-between">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-xl group-hover:bg-primary group-hover:text-white transition-colors">
                                    {cert.icon}
                                </span>
                                <span className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary">
                                    {cert.issuer}
                                </span>
                            </div>

                            <h3 className="text-base font-bold text-foreground leading-snug">
                                {cert.title}
                            </h3>

                            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                                {cert.description}
                            </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap gap-1">
                            {cert.topics.map((topic) => (
                                <span
                                    key={topic}
                                    className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </Section>
    );
}