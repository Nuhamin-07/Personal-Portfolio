import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import RemoteReadiness from "@/components/RemoteReadiness";
import Certifications from "@/components/Certifications";
import About from "@/components/About";
import ContactCTA from "@/components/ContactCTS";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors">
      <Navbar />
      <main className="flex-1 w-full">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <RemoteReadiness />
        <Certifications />
        <About />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}




