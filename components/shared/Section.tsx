import { ReactNode } from "react";

interface SectionProps {
    id?: string;
    children: ReactNode;
}

export default function Section({
    id,
    children,
}: SectionProps) {
    return (
        <section
            id={id}
            className="w-full py-20"
        >
            <div className="mx-auto max-w-6xl">
                {children}
            </div>
        </section>
    );
}