import Section from "@/components/shared/Section";

export default function About() {
  return (
    <Section id="about">
      <h2 className="text-3xl font-bold">
        About Me
      </h2>

      <div className="mt-6 max-w-3xl space-y-4 text-lg text-muted-foreground">
        <p>
          I'm a Full-Stack Developer with
          nearly four years of professional
          experience building modern web
          applications and end-to-end software
          solutions.
        </p>

        <p>
          I've built projects ranging from
          e-commerce platforms and 3D model
          marketplaces to task management
          systems and AI-powered applications.
          I enjoy turning ideas into
          production-ready products that are
          scalable, maintainable, and focused
          on delivering great user experiences.
        </p>
      </div>
    </Section>
  );
}