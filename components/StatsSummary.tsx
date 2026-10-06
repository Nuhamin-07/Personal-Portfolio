import Image from "next/image";

export default function StatsSummary() {
    return (
        <div className="mt-6 gap-3 sm:gap-4 mx-auto max-w-6xl">
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Quick Highlights</h2>
            <div className="flex mt-5">
                <div className="w-[50%]">
                    <p className="text-base leading-relaxed sm:text-lg">
                        Full-Stack Developer with 4 years of experience building enterprise applications, business systems, and modern web platforms. Specialized in Next.js, React, TypeScript, Node.js, Express.js, and Microsoft Power Platform solutions across education, healthcare, ERP, and e-commerce domains.
                    </p>
                    <div className="grid grid-cols-2 mb-10 mt-5 gap-3">
                        <div className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-primary/40">
                            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">4</p>
                            <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
                                Years Experience
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-primary/40">
                            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">8+</p>
                            <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
                                Featured Projects
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-primary/40">
                            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">100%</p>
                            <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
                                Remote Proven
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded-2xl border border-border bg-black p-4 backdrop-blur-sm transition-all hover:border-primary/40">
                            <span className="text-lg font-medium text-white text-center px-4">
                                Certified Frontend and Fullstack Developer
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-[50%] ml-10 bg-gray-100 p-5 h-fit">
                    <div className="flex border-b border-gray-300 py-6">
                        <Image src="/frontend.jpg" alt="frontend" width={80} height={80} className="w-20 h-20 object-cover rounded-xl shrink-0" style={{ width: "auto", height: "auto" }} />
                        <div className="ml-5">
                            <h3 className="text-lg font-semibold text-foreground">Frontend Development</h3>
                            <p className="text-sm text-muted-foreground">Building responsive and user-friendly interfaces with React, Next.js, and TypeScript.</p>
                        </div>
                    </div>
                    <div className="flex border-b border-gray-300 py-6">
                        <Image src="/fullstack.jpg" alt="fullstack" width={80} height={80} className="w-20 h-20 object-cover rounded-xl shrink-0" style={{ width: "auto", height: "auto" }} />
                        <div className="ml-5">
                            <h3 className="text-lg font-semibold text-foreground">Fullstack Development</h3>
                            <p className="text-sm text-muted-foreground">Building full-stack web applications with React, Next.js, TypeScript, Node.js, and Express.js.</p>
                        </div>
                    </div>
                    <div className="flex py-6">
                        <Image src="/end-to-end.jpg" alt="end-to-end" width={80} height={80} className="w-20 h-20 object-cover rounded-xl shrink-0" style={{ width: "auto", height: "auto" }} />
                        <div className="ml-5">
                            <h3 className="text-lg font-semibold text-foreground">End-to-End Automation Testing</h3>
                            <p className="text-sm text-muted-foreground">Building end-to-end automation test solutions with Cypress.js.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}