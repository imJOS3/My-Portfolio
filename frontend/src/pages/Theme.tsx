import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

type ColorBeat = {
  id: string;
  name: string;
  hex: string;
  tagline: string;
  headline: string;
  body: string[];
  role: string;
};

const BEATS: ColorBeat[] = [
  {
    id: "void",
    name: "Deep Void",
    hex: "#05010f",
    tagline: "The canvas.",
    headline: "Every neon needs a night sky.",
    body: [
      "This near-black violet is the stage. It is not empty space — it is intentional silence. Against it, cyan, purple, and fuchsia stop being decoration and start becoming signals.",
      "Inspired by late-night terminals and city skylines after midnight, the base keeps focus where it belongs: on the work, the words, and the motion.",
    ],
    role: "Background · atmosphere · contrast",
  },
  {
    id: "cyan",
    name: "Electric Cyan",
    hex: "#22d3ee",
    tagline: "Clarity first.",
    headline: "The color of precision.",
    body: [
      "Cyan is the handshake with technology. It marks borders, guides the eye, and says: this interface is alive, responsive, and engineered.",
      "You will see it on active states, outlines, and accents that ask for attention without shouting. Fast. Clean. Direct — the same promise a modern product makes in a single glance.",
    ],
    role: "Focus · UI signals · trust",
  },
  {
    id: "purple",
    name: "Neon Purple",
    hex: "#a855f7",
    tagline: "Depth with intention.",
    headline: "Creativity with structure.",
    body: [
      "Purple bridges logic and imagination. It softens the cyber edge while keeping the portfolio unmistakably futuristic — not playful for play’s sake, but expressive on purpose.",
      "Titles, glows, and secondary emphasis lean on purple so the brand feels human: a software engineer who builds, but also designs how the story is told.",
    ],
    role: "Identity · hierarchy · glow",
  },
  {
    id: "fuchsia",
    name: "Signal Fuchsia",
    hex: "#d946ef",
    tagline: "Energy you can feel.",
    headline: "Personality, not noise.",
    body: [
      "Fuchsia is the spark at the end of every gradient. It carries warmth into a cool palette — ambition, movement, and a hint of rebellion against flat corporate design.",
      "Used sparingly, it becomes memorable. Overused, it would drown the message. Here it is a signature: the last color you notice, and the one you remember.",
    ],
    role: "Accent · CTA · emotion",
  },
  {
    id: "gradient",
    name: "Cyan → Fuchsia",
    hex: "linear-gradient(90deg, #22d3ee, #d946ef)",
    tagline: "One system. One voice.",
    headline: "The brand lives in the blend.",
    body: [
      "Alone, each color has a job. Together, they become the product language of this site: technical cyan meeting expressive fuchsia through purple’s bridge.",
      "Headlines, buttons, and highlights ride that gradient so every key moment feels like the same brand — consistent, commercial, and impossible to confuse with a generic template.",
    ],
    role: "Headlines · CTAs · brand mark",
  },
];

const ThemePage = () => {
  const [activeId, setActiveId] = useState(BEATS[0].id);
  const [progress, setProgress] = useState(0);
  const beatRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = BEATS.map((b) => beatRefs.current[b.id]).filter(
      Boolean
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0.15, 0.4, 0.6] }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const active = BEATS.find((b) => b.id === activeId) ?? BEATS[0];

  return (
    <div className="relative min-h-screen themed-text-primary">
      {/* Progress rail */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-1 origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background: "linear-gradient(90deg, #22d3ee, #a855f7, #d946ef)",
        }}
        aria-hidden
      />

      {/* Sticky color compass */}
      <aside className="pointer-events-none fixed right-3 sm:right-6 top-1/2 z-40 hidden -translate-y-1/2 md:flex flex-col gap-3">
        {BEATS.map((beat) => {
          const isActive = beat.id === activeId;
          return (
            <div key={beat.id} className="flex items-center justify-end gap-3">
              <span
                className={`text-[10px] uppercase tracking-[0.2em] transition-opacity duration-300 ${
                  isActive ? "opacity-100 themed-text-secondary" : "opacity-0"
                }`}
              >
                {beat.name}
              </span>
              <span
                className={`block h-3 w-3 rounded-full border transition-all duration-300 ${
                  isActive ? "scale-150 border-white/80" : "border-white/20 scale-100"
                }`}
                style={{
                  background:
                    beat.id === "gradient"
                      ? "linear-gradient(135deg, #22d3ee, #d946ef)"
                      : beat.hex,
                  boxShadow: isActive ? `0 0 18px ${beat.id === "gradient" ? "#d946ef" : beat.hex}` : "none",
                }}
              />
            </div>
          );
        })}
      </aside>

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-24 overflow-hidden">
        <Link
          to="/"
          className="absolute top-5 sm:top-8 left-4 sm:left-8 z-20 flex items-center gap-2 text-cyan-300/90 hover:text-fuchsia-300 transition-colors group"
        >
          <FaArrowLeft className="size-4 sm:size-5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="font-semibold text-sm sm:text-base">Back to the portfolio</span>
        </Link>

        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 20% 30%, rgba(34,211,238,0.35), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.4), transparent 45%), radial-gradient(ellipse at 50% 90%, rgba(217,70,239,0.3), transparent 50%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] themed-text-muted mb-6">
            Visual system · Portfolio brand
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-6">
            <span className="themed-accent-text drop-shadow-neon">
              The free look that makes this site unmistakable.
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl themed-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
            A cyberpunk palette built for speed of recognition: cyan for clarity,
            purple for depth, fuchsia for spark — all grounded in a deep void.
          </p>
          <p className="themed-text-muted text-sm sm:text-base max-w-xl mx-auto mb-14">
            Scroll to meet each color. One section. One job. The same commercial
            language products use when they want you to feel the difference in
            seconds — not after a style guide PDF.
          </p>
          <a
            href="#void"
            className="inline-flex flex-col items-center gap-2 themed-text-secondary hover:text-cyan-300 transition-colors"
          >
            <span className="text-xs uppercase tracking-[0.25em]">Explore the palette</span>
            <FaArrowDown className="animate-bounce size-4" />
          </a>
        </div>
      </section>

      {/* Pitch strip — 1.1.1.1 style triad */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 sm:py-28 border-y border-cyan-500/15 bg-black/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-3 text-center md:text-left">
          {[
            {
              title: "Bold. Clear. Yours.",
              text: "No generic purple templates. Every hue here was chosen so Jose Benjumea’s work reads as engineered, night-ready, and personal.",
            },
            {
              title: "Built for recognition.",
              text: "In a feed full of sameness, contrast is a feature. This system helps visitors know where they are before they finish the first sentence.",
            },
            {
              title: "Designed to scroll.",
              text: "Color is not a swatch row — it is a story. Keep moving and each tone explains why it earned its place on the page.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h2 className="text-xl sm:text-2xl font-extrabold themed-accent-text mb-3">
                {item.title}
              </h2>
              <p className="themed-text-secondary text-sm sm:text-base leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Color beats */}
      {BEATS.map((beat, index) => (
        <section
          key={beat.id}
          id={beat.id}
          ref={(el) => {
            beatRefs.current[beat.id] = el;
          }}
          className="relative min-h-[100dvh] flex items-center px-5 sm:px-8 lg:px-16 py-24 sm:py-32"
        >
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: activeId === beat.id ? 1 : 0.35,
              background:
                beat.id === "gradient"
                  ? "radial-gradient(ellipse at 50% 40%, rgba(34,211,238,0.22), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(217,70,239,0.25), transparent 50%)"
                  : `radial-gradient(ellipse at 30% 40%, ${beat.hex}55, transparent 55%)`,
            }}
            aria-hidden
          />

          <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] themed-text-muted mb-3">
                {String(index + 1).padStart(2, "0")} · {beat.role}
              </p>
              <p
                className="text-sm sm:text-base font-semibold mb-3"
                style={{
                  color: beat.id === "void" ? "#a5b4fc" : beat.id === "gradient" ? "#d946ef" : beat.hex,
                }}
              >
                {beat.tagline}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6 themed-text-primary">
                {beat.headline}
              </h2>
              <div className="space-y-4 max-w-xl">
                {beat.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="themed-text-secondary text-base sm:text-lg leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-6">
              <div
                className="w-full max-w-sm aspect-square rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden"
                style={{
                  background:
                    beat.id === "gradient"
                      ? "linear-gradient(135deg, #22d3ee, #a855f7, #d946ef)"
                      : beat.hex,
                  boxShadow: `0 0 80px ${beat.id === "gradient" ? "rgba(217,70,239,0.35)" : `${beat.hex}66`}`,
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white font-extrabold text-2xl sm:text-3xl">{beat.name}</p>
                  <p className="text-white/70 font-mono text-sm mt-1">
                    {beat.id === "gradient" ? "cyan → fuchsia" : beat.hex}
                  </p>
                </div>
              </div>
              <p className="text-xs themed-text-muted uppercase tracking-[0.2em] text-center lg:text-right">
                Active: {active.name}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* How it works together */}
      <section className="px-5 sm:px-8 lg:px-16 py-24 sm:py-32 bg-black/40 border-y border-fuchsia-500/15">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold themed-accent-text mb-6">
            Night by default. Day when you need light.
          </h2>
          <p className="themed-text-secondary text-base sm:text-lg leading-relaxed mb-6">
            The portfolio ships with a night theme that leans into neon on deep
            violet-black — the signature look. A day theme keeps the same accent
            family on a soft lilac canvas, so the brand stays coherent whether
            the room is dark or bright.
          </p>
          <p className="themed-text-muted text-sm sm:text-base leading-relaxed">
            Surfaces stay glassy. Borders stay cyan-tinted. Gradients stay cyan
            to fuchsia. Change the light; keep the voice.
          </p>
        </div>
      </section>

      {/* Thank you */}
      <section className="relative min-h-[90dvh] flex flex-col items-center justify-center px-5 sm:px-8 text-center py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.35), transparent 55%), radial-gradient(circle at 20% 80%, rgba(34,211,238,0.25), transparent 40%), radial-gradient(circle at 80% 20%, rgba(217,70,239,0.28), transparent 40%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.35em] themed-text-muted mb-6">
            End of the tour
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-8">
            <span className="themed-accent-text">Thank you for visiting.</span>
          </h2>
          <p className="themed-text-secondary text-lg sm:text-xl leading-relaxed mb-6">
            Thank you for scrolling through this chapter of the brand — for
            meeting the void, the cyan, the purple, and the fuchsia that shape
            every section of the site.
          </p>
          <p className="themed-text-muted text-base sm:text-lg leading-relaxed mb-12">
            And thank you for taking the time to explore the portfolio itself.
            Your attention is the best kind of feedback. Whenever you are ready,
            the work is waiting one click away.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="themed-btn-gradient px-8 py-3 rounded-xl font-bold text-base shadow-lg hover:scale-105 transition-transform"
            >
              Return to the homepage
            </Link>
            <Link
              to="/contactme"
              className="px-8 py-3 rounded-xl font-bold text-base border border-cyan-400/40 themed-text-secondary hover:border-fuchsia-400/60 hover:text-fuchsia-200 transition-colors"
            >
              Say hello
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThemePage;
