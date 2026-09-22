import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full py-28">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <span className="rounded-full border px-4 py-2 text-sm">
            Available for Opportunities
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight">
            Nuhamin Gulilat
          </h1>

          <h2 className="mt-4 text-2xl font-medium text-muted-foreground">
            Full-Stack Developer
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Building modern web applications with
            React, Next.js, TypeScript,
            Node.js, and Express.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="rounded-lg bg-black px-6 py-3 text-white"
            >
              View Projects
            </Link>

            <Link
              href="/resume"
              className="rounded-lg border px-6 py-3"
            >
              Resume
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            <div className="rounded-xl border p-4">
              <h3 className="text-2xl font-bold">4</h3>
              <p className="text-sm text-muted-foreground">
                Years Experience
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <h3 className="text-2xl font-bold">5+</h3>
              <p className="text-sm text-muted-foreground">
                Major Projects
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <h3 className="text-2xl font-bold">
                Enterprise
              </h3>
              <p className="text-sm text-muted-foreground">
                Experience
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="h-96 w-96 rounded-3xl border bg-muted" />
        </div>
      </div>
    </section>
  );
}