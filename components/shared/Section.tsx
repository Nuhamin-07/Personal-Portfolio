import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export default function Section({ id, className = "", children }: SectionProps) {
  return (
    <section id={id} className={`w-full py-14 sm:py-24 lg:py-32 scroll-mt-24 ${className}`}>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">{children}</div>
    </section>
  );
}