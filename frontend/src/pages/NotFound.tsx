import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft, FaGhost, FaHome } from "react-icons/fa";

const SHORTCUTS = [
  { to: "/", label: "Home" },
  { to: "/faq", label: "FAQs" },
  { to: "/theme", label: "Colors" },
  { to: "/open", label: "Hobbies" },
];

const GHOSTS = [
  { id: "a", className: "nf-ghost nf-ghost-a", size: "text-5xl sm:text-6xl" },
  { id: "b", className: "nf-ghost nf-ghost-b", size: "text-4xl sm:text-5xl" },
  { id: "c", className: "nf-ghost nf-ghost-c", size: "text-3xl sm:text-4xl" },
  { id: "d", className: "nf-ghost nf-ghost-d", size: "text-4xl" },
] as const;

const NotFoundPage = () => {
  const { pathname } = useLocation();
  const command = `locate ${pathname}`;
  const [typed, setTyped] = useState("");
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    setTyped("");
    setShowResult(false);
    let i = 0;
    const typing = window.setInterval(() => {
      i += 1;
      setTyped(command.slice(0, i));
      if (i >= command.length) {
        window.clearInterval(typing);
        window.setTimeout(() => setShowResult(true), 280);
      }
    }, 42);
    return () => window.clearInterval(typing);
  }, [command]);

  return (
    <section className="nf-page relative flex min-h-dvh items-center overflow-hidden themed-text-primary px-4 sm:px-6 lg:px-8 py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 18% 12%, rgba(34,211,238,0.32), transparent 48%), radial-gradient(ellipse at 88% 8%, rgba(168,85,247,0.38), transparent 42%), radial-gradient(ellipse at 50% 100%, rgba(217,70,239,0.28), transparent 52%)",
        }}
        aria-hidden
      />
      <div className="section-orb -left-16 top-16 h-52 w-52 bg-[var(--accent-cyan)]" />
      <div className="section-orb -right-10 bottom-10 h-56 w-56 bg-[var(--accent-fuchsia)]" />
      <div className="nf-scanlines pointer-events-none absolute inset-0" aria-hidden />

      {GHOSTS.map((ghost) => (
        <FaGhost
          key={ghost.id}
          className={`${ghost.className} ${ghost.size}`}
          aria-hidden
        />
      ))}

      <div className="relative z-10 mx-auto w-full max-w-xl">
        <Link
          to="/"
          className="hobby-back-link mb-8 inline-flex text-xs sm:text-sm font-semibold hover:opacity-80 transition-opacity"
        >
          <FaArrowLeft className="size-3.5" />
          Back
        </Link>

        <div className="text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full themed-surface px-3 py-1">
            <span className="status-live h-2 w-2 rounded-full bg-[var(--accent-fuchsia)]" />
            <span className="section-kicker !tracking-[0.16em]">404 · Signal lost</span>
          </div>

          <div className="nf-hero relative mx-auto mb-6 flex items-center justify-center gap-2 sm:gap-4 select-none">
            <span className="nf-digit" data-text="4">
              4
            </span>
            <span className="nf-zero" aria-hidden>
              <FaGhost className="nf-hero-ghost" />
            </span>
            <span className="nf-digit" data-text="4">
              4
            </span>
            <span className="nf-hero-scan" aria-hidden />
          </div>

          <h1 className="themed-headline text-2xl sm:text-3xl md:text-4xl font-extrabold">
            This route isn't on the map
          </h1>
          <p className="mt-3 text-sm sm:text-base themed-text-secondary leading-relaxed">
            The URL you opened never made it into the router. Head home, or jump
            to a page that actually exists.
          </p>
        </div>

        <aside className="home-terminal mt-8 text-left">
          <div className="home-terminal-bar">
            <span className="home-terminal-dot bg-rose-400" />
            <span className="home-terminal-dot bg-amber-300" />
            <span className="home-terminal-dot bg-emerald-400" />
            <span className="ml-2 text-[11px] themed-text-muted">jose@portfolio:~</span>
          </div>
          <div className="space-y-1.5 p-5 font-mono text-[12px] sm:text-[13px] leading-relaxed themed-text-secondary">
            <div>
              <span className="themed-text-label">$ </span>
              {typed}
              {!showResult && <span className="typing-caret" />}
            </div>
            {showResult && (
              <div className="nf-term-in space-y-1.5">
                <div className="themed-glow-text">locate: no such file or directory</div>
                <div>
                  <span className="themed-text-label">$ </span>echo $?
                </div>
                <div className="themed-text-primary">404</div>
              </div>
            )}
          </div>
        </aside>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="themed-btn-gradient group inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-lg transition hover:opacity-90"
          >
            <FaHome className="transition-transform group-hover:scale-110" />
            Go home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="themed-surface group inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold themed-text-primary transition hover:border-[var(--surface-border-hover)]"
          >
            <FaArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
            Go back
          </button>
        </div>

        <nav
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
          aria-label="Pages that exist"
        >
          {SHORTCUTS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="themed-pill rounded-lg border px-2.5 py-1 text-[11px] sm:text-xs transition hover:border-[var(--surface-border-hover)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default NotFoundPage;
