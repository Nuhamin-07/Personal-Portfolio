import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = { variable: "font-sans" };
const geistMono = { variable: "font-mono" };

export const metadata: Metadata = {
  title: "Nuhamin Gulilat | Full-Stack Developer & Frontend Engineer",
  description:
    "Professional portfolio of Nuhamin Gulilat, a Full-Stack Developer with nearly 4 years of experience building React, Next.js, TypeScript, Node.js applications, and enterprise solutions.",
  keywords: [
    "Nuhamin Gulilat",
    "Nuhamin Gulilat Masresha",
    "Full-Stack Developer",
    "Frontend Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Engineer",
    "Node.js Developer",
    "Remote Developer Ethiopia",
    "Power Pages Developer",
    "Cypress QA Developer",
  ],
  authors: [{ name: "Nuhamin Gulilat" }],
  openGraph: {
    title: "Nuhamin Gulilat | Full-Stack Developer & Frontend Engineer",
    description:
      "Full-Stack Developer with nearly 4 years of experience engineering high-performance React, Next.js, Node.js applications, and enterprise systems.",
    url: "https://nuhamin-dev.netlify.app/",
    siteName: "Nuhamin Gulilat Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuhamin Gulilat | Full-Stack Developer",
    description:
      "Nearly 4 years of software development experience specializing in Next.js, React, TypeScript, Node.js, and Power Platform.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nuhamin Gulilat Masresha",
  jobTitle: "Full-Stack Developer",
  url: "https://nuhamin-dev.netlify.app/",
  sameAs: [
    "https://github.com/Nuhamin-07",
    "https://linkedin.com/in/nuhamin-gulilat-66635318b",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Addis Ababa",
    addressCountry: "Ethiopia",
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    name: "Arba Minch University",
  },
  "knowsAbout": [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "REST APIs",
    "Microsoft Power Platform",
    "Cypress",
    "Full-Stack Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}



