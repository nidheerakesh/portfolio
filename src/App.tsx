import type { ReactNode } from "react";
import BackgroundFX from "./components/BackgroundFX";
import MorphImage from "./components/MorphImage";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Nav from "./components/Nav";
import SectionDots from "./components/SectionDots";
import Slide from "./components/Slide";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import EasterEggs from "./components/EasterEggs";
import { SectionPagerProvider, SECTION_IDS } from "./lib/SectionPagerContext";

const SLIDES: Record<(typeof SECTION_IDS)[number], { label: string; render: () => ReactNode }> = {
  hero: { label: "Introduction", render: () => <Hero /> },
  about: { label: "About me", render: () => <About /> },
  skills: { label: "Skills", render: () => <Skills /> },
  projects: { label: "Projects", render: () => <Projects /> },
  experience: { label: "Experience", render: () => <Experience /> },
  achievements: { label: "Achievements", render: () => <Achievements /> },
  stack: { label: "Tech stack", render: () => <TechStack /> },
  contact: { label: "Contact", render: () => <Contact /> },
};

export default function App() {
  return (
    <SectionPagerProvider>
      <div className="relative h-[100dvh] w-full">
        <BackgroundFX />
        <MorphImage />
        <CustomCursor />
        <ScrollProgress />
        <Nav />
        <SectionDots />

        <main id="main-content" tabIndex={-1} className="relative h-full outline-none">
          {SECTION_IDS.map((id, i) => (
            <Slide key={id} id={id} index={i} label={SLIDES[id].label}>
              {SLIDES[id].render()}
            </Slide>
          ))}
        </main>

        <EasterEggs />
      </div>
    </SectionPagerProvider>
  );
}
