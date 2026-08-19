import { useRef, useEffect, useState, type ReactNode } from "react";
import MobileNavBar from "../components/navbar/MobileNavBar";
import DesktopNavBar from "../components/navbar/DesktopNavBar";
import TabletNavBar from "../components/navbar/TabletNavBar";

import Home from "../components/sections/Home";
import Projects from "../components/sections/projects/Projects";
import Skills from "../components/sections/Skills";
import Certificates from "../components/sections/Certificates";
import AboutMe from "../components/sections/AboutMe";
import Contact from "../components/sections/Contact";

type AnimatedSectionProps = {
  id: string;
  animation: string;
  children: ReactNode;
};

function AnimatedSection({ id, animation, children }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.28 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      className="snap-section px-3 sm:px-5 md:px-8 max-lg:pb-[5.75rem]"
    >
      <div
        ref={ref}
        className={`section-animate ${animation}${visible ? " visible" : ""} h-full w-full max-w-7xl mx-auto`}
      >
        {children}
      </div>
    </section>
  );
}

export default function HomePage() {
  useEffect(() => {
    document.documentElement.classList.add("home-snap");
    return () => document.documentElement.classList.remove("home-snap");
  }, []);

  return (
    <div className="min-h-screen">
      <div className="hidden lg:block">
        <DesktopNavBar />
      </div>

      <div className="hidden md:flex lg:hidden">
        <TabletNavBar />
      </div>

      <div className="flex md:hidden fixed top-0 left-0 right-0 z-50">
        <MobileNavBar />
      </div>

      <div className="lg:ml-60">
        <AnimatedSection id="home" animation="fade-scale">
          <Home />
        </AnimatedSection>

        <AnimatedSection id="projects" animation="slide-right">
          <Projects />
        </AnimatedSection>

        <AnimatedSection id="about" animation="slide-up">
          <AboutMe />
        </AnimatedSection>

        <AnimatedSection id="skills" animation="slide-left">
          <Skills />
        </AnimatedSection>

        <AnimatedSection id="certificates" animation="fade-rotate">
          <Certificates />
        </AnimatedSection>

        <AnimatedSection id="contact" animation="slide-down">
          <Contact />
        </AnimatedSection>
      </div>
    </div>
  );
}
