import { useEffect, useState } from "react";
import { useNavState } from "../navbar/useNavState";

const STACK = ["Node.js", "Java", "Spring Boot", "React", "PostgreSQL", "Docker"];

const Home = () => {
  const { scrollTo } = useNavState();
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);
  const [showCursor3, setShowCursor3] = useState(false);
  const [showBelow, setShowBelow] = useState(false);

  useEffect(() => {
    const fullText1 = "Hello world!";
    const fullText2 = "I'm Jose Benjumea";
    const fullText3 = "Software Engineering student";

    let index1 = 0;
    const typing1 = setInterval(() => {
      setText1(fullText1.slice(0, index1 + 1));
      index1++;
      if (index1 === fullText1.length) {
        clearInterval(typing1);
        setShowCursor1(false);

        setTimeout(() => {
          setShowCursor2(true);
          let index2 = 0;
          const typing2 = setInterval(() => {
            setText2(fullText2.slice(0, index2 + 1));
            index2++;
            if (index2 === fullText2.length) {
              clearInterval(typing2);
              setShowCursor2(false);

              setTimeout(() => {
                setShowCursor3(true);
                let index3 = 0;
                const typing3 = setInterval(() => {
                  setText3(fullText3.slice(0, index3 + 1));
                  index3++;
                  if (index3 === fullText3.length) {
                    clearInterval(typing3);
                    setShowCursor3(false);
                    setTimeout(() => setShowBelow(true), 280);
                  }
                }, 90);
              }, 320);
            }
          }, 90);
        }, 320);
      }
    }, 90);

    return () => clearInterval(typing1);
  }, []);

  return (
    <div className="relative flex h-full w-full min-h-0 items-center overflow-visible">
      <div className="section-orb -left-16 top-10 h-48 w-48 bg-[var(--accent-cyan)]" />
      <div className="section-orb right-4 bottom-8 h-56 w-56 bg-[var(--accent-fuchsia)] hidden md:block" />

      <div className="relative grid w-full items-center gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full themed-surface px-3 py-1">
            <span className="status-live h-2 w-2 rounded-full bg-[var(--accent-cyan)]" />
            <span className="section-kicker !tracking-[0.16em]">Open to internships</span>
          </div>

          <p className="section-kicker mb-2">01 — Home</p>

          <h1 className="font-extrabold text-[clamp(1.85rem,5vw,3.4rem)]">
            <span className="themed-accent-text block leading-[1.35] pb-1">
              {text1}
              {showCursor1 && <span className="typing-caret" />}
            </span>
            <span className="themed-accent-text block leading-[1.35] pb-1">
              {text2}
              {showCursor2 && <span className="typing-caret" />}
            </span>
          </h1>

          <p className="mt-1 overflow-visible py-1 text-[clamp(0.95rem,2.2vw,1.25rem)] font-medium leading-normal themed-text-secondary">
            {text3}
            {showCursor3 && <span className="typing-caret" />}
          </p>

          <div
            className={`mt-5 transition-all duration-700 ${
              showBelow ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
            }`}
          >
            <p className="max-w-xl text-sm themed-text-muted sm:text-base">
              Fullstack developer focused on backend and real-world systems.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {STACK.map((tech) => (
                <span
                  key={tech}
                  className="themed-pill rounded-lg border px-2.5 py-1 text-[11px] sm:text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollTo("projects")}
                className="themed-btn-gradient rounded-xl px-5 py-2.5 text-sm font-semibold shadow-lg transition hover:opacity-90"
              >
                View projects
              </button>
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="themed-surface rounded-xl px-5 py-2.5 text-sm font-semibold themed-text-primary transition hover:border-[var(--surface-border-hover)]"
              >
                Contact me
              </button>
            </div>
          </div>
        </div>

        <aside className="home-terminal hidden lg:block">
          <div className="home-terminal-bar">
            <span className="home-terminal-dot bg-rose-400" />
            <span className="home-terminal-dot bg-amber-300" />
            <span className="home-terminal-dot bg-emerald-400" />
            <span className="ml-2 text-[11px] themed-text-muted">jose@portfolio:~</span>
          </div>
          <div className="space-y-2 p-5 font-mono text-[13px] leading-relaxed themed-text-secondary">
            <div>
              <span className="themed-text-label">$ </span>whoami
            </div>
            <div className="themed-text-primary">jose-benjumea</div>
            <div>
              <span className="themed-text-label">$ </span>cat focus.txt
            </div>
            <div className="themed-text-primary">backend · apis · fullstack products</div>
            <div>
              <span className="themed-text-label">$ </span>status --now
            </div>
            <div className="themed-glow-text">open_to_internships ✓</div>
            <div>
              <span className="themed-text-label">$ </span>
              <span className="typing-caret" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
