import Section from "@/components/shared/Section";

export default function ContactCTA() {
  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 px-6 py-16 text-center text-white shadow-2xl md:px-12 md:py-20 border border-slate-800">
        {/* Subtle Background Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
            <span>Get In Touch</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Let&apos;s build something great together.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg leading-relaxed">
            I am currently open to full-time Frontend & Full-Stack Developer roles, high-impact projects, and technical collaborations. Feel free to reach out directly!
          </p>

          {/* Email Highlight Badge */}
          <div className="mt-6 inline-block rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 font-mono text-sm font-medium text-emerald-400 backdrop-blur-sm">
            ✉️ nuhamin.gulilat.7@gmail.com
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:nuhamin.gulilat.7@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:scale-105"
            >
              <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send an Email
            </a>

            <a
              href="https://linkedin.com/in/nuhamin-gulilat"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:border-slate-500"
            >
              Connect on LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}