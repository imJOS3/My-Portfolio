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
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      className="snap-section px-3 py-8 sm:px-5 sm:py-10 md:px-8 md:pt-8 lg:py-0 max-md:pb-32"
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

      <div className="md:hidden">
        <MobileNavBar />
      </div>

      <div className="md:pt-[4.25rem] lg:ml-60 lg:pt-0">
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
