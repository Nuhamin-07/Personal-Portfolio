export default function About() {
  return (
    <section className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-8 px-16 bg-white dark:bg-black sm:items-start">
      <h2 className="text-3xl font-bold text-center text-gray-1600 dark:text-white py-8">
        About Me
      </h2>
      <p className="text-lg text-left text-gray-600 dark:text-gray-300">
        I'm a Full-Stack Developer with nearly four years of experience building
        modern web applications and end-to-end software solutions. I specialize
        in React, Next.js, TypeScript, Node.js, and Express, developing
        everything from responsive user interfaces to scalable backend services
        and APIs.
      </p>
      <br />
      <p className="text-lg text-left text-gray-600 dark:text-gray-300">
        I've built projects including e-commerce platforms, 3D model
        marketplaces, task management systems, and AI-powered applications. I
        enjoy turning ideas into production-ready products that are scalable,
        maintainable, and focused on delivering great user experiences.
      </p>
    </section>
  );
}
