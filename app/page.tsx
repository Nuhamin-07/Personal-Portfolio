import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "@/components/Projects";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-0 px-16">
      <Hero />
      <About />
      <Projects />
    </div>
  );
}
