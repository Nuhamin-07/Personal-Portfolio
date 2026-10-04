import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import CodeBgAnimation from "@/components/CodeBgAnimation";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nuhamin Gulilat | Full-Stack Developer",
  description:
    "Professional portfolio of Nuhamin Gulilat, a Full-Stack Developer with 4 years of experience building React, Next.js, TypeScript, Node.js applications, and enterprise solutions.",
  keywords: [
    "Nuhamin Gulilat",
    "Full-Stack Developer",
    "Frontend Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Engineer",
    "Node.js Developer",
  ],
  authors: [{ name: "Nuhamin Gulilat" }],
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
      className={`${plusJakarta.variable} font-sans scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary font-sans transition-colors duration-200">
        {/* Global code-typing background animation — z-0, pointer-events-none */}
        <CodeBgAnimation />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
