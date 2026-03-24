import Hero from "@/components/Hero";
import SkillsHeatmap from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import AskRaghav from "@/components/AskRaghav";

export default function Home() {
  return (
    <>
      <Hero />
      <SkillsHeatmap />
      <Projects />
      <Experience />
      <Contact />
      <AskRaghav />
    </>
  );
}
