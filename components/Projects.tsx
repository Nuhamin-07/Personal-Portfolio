import Link from "next/link";

const projects = [
  {
    title: "PrintForge",
    description:
      "A modern 3D model marketplace built with Next.js, featuring dynamic routing, search functionality, and a responsive user experience.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "/projects/printforge",
  },
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce application with product browsing, shopping cart functionality, and modern UI design.",
    technologies: ["Next.js", "Node.js", "Express"],
    href: "/projects/ecommerce",
  },
  {
    title: "Task Management App",
    description:
      "A productivity application with authentication, protected routes, and complete CRUD functionality.",
    technologies: ["React", "Express", "SQLite"],
    href: "/projects/task-manager",
  },
  {
    title: "Student Information Management System",
    description:
      "Enterprise platform for managing student records, enrollment workflows, and academic processes.",
    technologies: ["Power Pages", "Dataverse", "JavaScript"],
    href: "/projects/sims",
  },
  {
    title: "Movie Recommendation App",
    description:
      "AI-powered recommendation system using embeddings and vector search to suggest similar movies.",
    technologies: ["React", "Supabase", "AI"],
    href: "/projects/movie-recommendation",
  },
  {
    title: "Tattoo Studio Website",
    description:
      "A modern, responsive tattoo studio website built with Next.js, featuring artist profiles, a project gallery, service information, and an appointment booking interface.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    href: "/projects/movie-recommendation",
  }
];

export default function Projects() {
  return (
    <section id="projects" className="w-full py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            A selection of projects showcasing my experience building
            full-stack applications, enterprise systems, and modern web
            experiences.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950"
            >
              <h3 className="text-xl font-semibold">{project.title}</h3>

              <p className="mt-3 flex-grow text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border px-3 py-1 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                href={project.href}
                className="mt-6 inline-flex items-center font-medium text-blue-600 hover:text-blue-700"
              >
                View Case Study →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}