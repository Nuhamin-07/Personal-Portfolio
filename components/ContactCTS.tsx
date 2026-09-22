import Link from "next/link";

export default function ContactCTA() {
    return (
        <section id="contact" className="w-full py-20 md:py-28">
            <div className="mx-auto max-w-6xl">
                <div className="rounded-3xl bg-gray-900 px-6 py-16 text-center text-white md:px-12 md:py-20 dark:bg-gray-100 dark:text-gray-900">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600">
                        Get In Touch
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        Let&apos;s build something great together.
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-300 dark:text-gray-600">
                        I&apos;m always interested in working on meaningful products,
                        solving technical problems, and collaborating on new ideas.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/contact"
                            className="rounded-lg bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-200 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                        >
                            Contact Me
                        </Link>

                        <a
                            href="mailto:nuhamin.gulilat.7@gmail.com"
                            className="rounded-lg border border-gray-600 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800 dark:border-gray-400 dark:text-gray-900 dark:hover:bg-gray-200"
                        >
                            Send an Email
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}