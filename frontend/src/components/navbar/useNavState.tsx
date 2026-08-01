import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaProjectDiagram,
  FaLaptopCode,
  FaCertificate,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";

export interface Section {
  id: string;
  label: string;
  icon: JSX.Element;
}

const sections: Section[] = [
  { id: "home", label: "Home", icon: <FaHome size={20} /> },
  { id: "projects", label: "Projects", icon: <FaProjectDiagram size={20} /> },
  { id: "about", label: "About", icon: <FaInfoCircle size={20} /> },
  { id: "skills", label: "Skills", icon: <FaLaptopCode size={20} /> },
  { id: "certificates", label: "Certificates", icon: <FaCertificate size={20} /> },
  { id: "contact", label: "Contact", icon: <FaEnvelope size={20} /> },
];

export const LAST_SECTION_STORAGE_KEY = "portfolio.lastSection";
export const SCROLL_Y_STORAGE_KEY = "portfolio.scrollY";

const getStoredSection = (): string => {
  if (typeof window === "undefined") return "home";

  const hashSection = window.location.hash.replace(/^#/, "");
  if (hashSection && sections.some((s) => s.id === hashSection)) {
    return hashSection;
  }

  return window.sessionStorage.getItem(LAST_SECTION_STORAGE_KEY) ?? "home";
};

type NavState = {
  sections: Section[];
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;

  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  carouselIndex: number;
  setCarouselIndex: React.Dispatch<React.SetStateAction<number>>;

  visibleCount: number;
  activePulse: boolean;
  scrollTo: (id: string) => void;
};

const NavContext = createContext<NavState | null>(null);

export const NavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<string>(() => getStoredSection());
  const [open, setOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [activePulse, setActivePulse] = useState(false);
  const visibleCount = 3;

  // Evita que el scrollspy pise el highlight justo después de un click
  const clickLockUntil = useRef(0);

  useEffect(() => {
    setActivePulse(true);
    const t = setTimeout(() => setActivePulse(false), 320);
    return () => clearTimeout(t);
  }, [activeSection]);

  useEffect(() => {
    window.sessionStorage.setItem(LAST_SECTION_STORAGE_KEY, activeSection);
  }, [activeSection]);

  // Guardar y restaurar posición de scroll al recargar
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const savedRaw = window.sessionStorage.getItem(SCROLL_Y_STORAGE_KEY);
    const savedY = savedRaw ? Number.parseInt(savedRaw, 10) : 0;
    let cancelled = false;
    let tries = 0;

    const saveScroll = () => {
      window.sessionStorage.setItem(SCROLL_Y_STORAGE_KEY, String(Math.round(window.scrollY)));
    };

    const restoreScroll = () => {
      if (cancelled || !savedY || Number.isNaN(savedY) || savedY <= 0) return;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      // Espera a que la página tenga altura suficiente (imágenes / lazy)
      if (maxScroll + window.innerHeight < savedY + 80 && tries < 120) {
        tries += 1;
        requestAnimationFrame(restoreScroll);
        return;
      }

      window.scrollTo({ top: savedY, left: 0, behavior: "auto" });
    };

    // Restaura en cuanto haya layout y refuerza mientras carga el contenido
    restoreScroll();
    const t1 = window.setTimeout(restoreScroll, 100);
    const t2 = window.setTimeout(restoreScroll, 400);
    const t3 = window.setTimeout(restoreScroll, 1000);

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        saveScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", saveScroll);
    window.addEventListener("beforeunload", saveScroll);

    return () => {
      cancelled = true;
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", saveScroll);
      window.removeEventListener("beforeunload", saveScroll);
    };
  }, []);

  // Scrollspy con IntersectionObserver (se arma cuando existen las secciones en el DOM)
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let rafId = 0;
    let cancelled = false;

    const setFromSpy = (id: string) => {
      if (Date.now() < clickLockUntil.current) return;
      setActiveSection((prev) => (prev === id ? prev : id));
    };

    const attach = () => {
      if (cancelled) return;

      const els = sections
        .map((s) => document.getElementById(s.id))
        .filter((el): el is HTMLElement => Boolean(el));

      // Home es lazy: reintentar hasta que existan las secciones
      if (els.length < sections.length) {
        rafId = requestAnimationFrame(attach);
        return;
      }

      const intersecting = new Set<string>();

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              intersecting.add(entry.target.id);
            } else {
              intersecting.delete(entry.target.id);
            }
          }

          // Primera sección (orden del documento) que cruza la banda de activación
          const active = sections.find((s) => intersecting.has(s.id));
          if (active) {
            setFromSpy(active.id);
          } else {
            // Al fondo de la página: forzar última sección
            const nearBottom =
              window.innerHeight + window.scrollY >=
              document.documentElement.scrollHeight - 24;
            if (nearBottom) {
              setFromSpy(sections[sections.length - 1].id);
            }
          }
        },
        {
          // Banda fina ~35%–50% del viewport: solo una sección suele intersectar
          root: null,
          rootMargin: "-35% 0px -50% 0px",
          threshold: 0,
        }
      );

      els.forEach((el) => observer!.observe(el));
    };

    attach();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, []);

  const scrollTo = (id: string): void => {
    const el = document.getElementById(id);
    if (!el) return;

    clickLockUntil.current = Date.now() + 1000;
    setActiveSection(id);
    window.sessionStorage.setItem(LAST_SECTION_STORAGE_KEY, id);

    // Centrar el contenido interno (no el top de la section min-h-screen)
    const target = (el.firstElementChild as HTMLElement | null) ?? el;
    const rect = target.getBoundingClientRect();
    const contentCenter = window.scrollY + rect.top + rect.height / 2;
    // Navbar fija en móvil: desplaza un poco el centro visual
    const navCompensation = window.matchMedia("(max-width: 767px)").matches ? 32 : 0;
    const top = Math.max(0, contentCenter - window.innerHeight / 2 - navCompensation);

    window.scrollTo({ top, behavior: "smooth" });
    setOpen(false);
  };

  const value: NavState = {
    sections,
    activeSection,
    setActiveSection,
    open,
    setOpen,
    carouselIndex,
    setCarouselIndex,
    visibleCount,
    activePulse,
    scrollTo,
  };

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export const useNavState = (): NavState => {
  const ctx = useContext(NavContext);
  if (!ctx) {
    throw new Error("useNavState must be used within a NavProvider");
  }
  return ctx;
};
