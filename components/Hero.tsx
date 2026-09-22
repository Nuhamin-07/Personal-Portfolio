export default function Hero() {
  return (
    <div>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-8 px-16 bg-white dark:bg-black sm:items-start">
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
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="text-lg font-normal text-gray-800 dark:text-white width-1/3 height-1/3 background-color-blue-700 dark:background-color-gray-800 p-4 max-w-sm rounded overflow-hidden shadow-lg">
            4 Years of Experience
          </div>
          <div className="text-lg font-normal text-gray-800 dark:text-white width-1/3 height-1/3 background-color-blue-700 dark:background-color-gray-800 p-4 max-w-sm rounded overflow-hidden shadow-lg">
            5+ Projects Completed
          </div>
          <div className="text-lg font-normal text-gray-800 dark:text-white width-1/3 height-1/3 background-color-blue-700 dark:background-color-gray-800 p-4 max-w-sm rounded overflow-hidden shadow-lg">
            Enterprise Experience
          </div>
        </div>
        <div className="mt-8">
          <a
            href="mailto:nuhamin.gulilat.7@gmail.com"
            className="text-blue-600 hover:underline"
          >
            Contact Me
          </a>
        </div>
      </main>
    </div>
  );
}
