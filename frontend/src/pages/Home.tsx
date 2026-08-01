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
  className?: string;
  innerClassName?: string;
  children: ReactNode;
};

function AnimatedSection({
  id,
  animation,
  className = "",
  innerClassName = "",
  children,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} className={`scroll-mt-16 ${className}`}>
      <div
        ref={ref}
        className={`section-animate ${animation}${visible ? " visible" : ""} ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

export default function HomePage() {
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

      <div className="flex-grow min-h-screen lg:ml-60 md:max-lg:pt-16">
        <AnimatedSection
          id="home"
          animation="fade-scale"
          className="flex items-center justify-center px-4 md:px-8 min-h-[calc(100vh-4rem)] md:min-h-screen pt-24 md:pt-0"
          innerClassName="w-full max-w-7xl mx-auto"
        >
          <Home />
        </AnimatedSection>

        <AnimatedSection
          id="projects"
          animation="slide-right"
          className="py-12 md:py-16 min-h-screen flex items-center justify-center"
          innerClassName="w-full flex items-center justify-center"
        >
          <Projects />
        </AnimatedSection>

        <AnimatedSection
          id="about"
          animation="slide-up"
          className="py-12 md:py-16 min-h-screen flex items-center justify-center"
          innerClassName="w-full flex items-center justify-center"
        >
          <AboutMe />
        </AnimatedSection>

        <AnimatedSection
          id="skills"
          animation="slide-left"
          className="py-12 md:py-16 min-h-screen flex items-center justify-center"
          innerClassName="w-full flex items-center justify-center"
        >
          <Skills />
        </AnimatedSection>

        <AnimatedSection
          id="certificates"
          animation="fade-rotate"
          className="py-12 md:py-16 min-h-screen flex items-center justify-center"
          innerClassName="w-full flex items-center justify-center"
        >
          <Certificates />
        </AnimatedSection>

        <AnimatedSection
          id="contact"
          animation="slide-down"
          className="py-12 md:py-16 min-h-screen flex items-center justify-center"
          innerClassName="w-full flex items-center justify-center"
        >
          <Contact />
        </AnimatedSection>
      </div>
    </div>
  );
}
