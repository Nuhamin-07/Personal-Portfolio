export default function Hero() {
  return (
    <div>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold text-center text-gray-1600 dark:text-white">
          Nuhamin Gulilat
        </h1>
        <h3 className="text-xl font-semibold text-center text-gray-700 dark:text-gray-300 py-12">
          Full-Stack Developer
        </h3>
        <p className="text-lg text-left text-gray-600 dark:text-gray-300">
          Building modern web applications with React, Next.js, TypeScript,
          Node.js, and Express.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start">
          <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View My Work
          </button>
          <button className="mt-8 ml-4 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
            Download Resume
          </button>
        </div>
      </main>
    </div>
  );
}
