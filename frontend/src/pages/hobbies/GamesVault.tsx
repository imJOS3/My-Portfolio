import { Link } from "react-router-dom";
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { HobbyArchive } from "../../hooks/useHobbyArchive";
import { PosterImg } from "./PosterImg";

export function GamesVault({ archive }: { archive: HobbyArchive }) {
  const {
    hobby,
    item,
    visible,
    total,
    catalogTotal,
    groupKey,
    setGroupKey,
    showGroups,
    goTo,
    step,
    paddedIndex,
    backdrop,
  } = archive;

  return (
    <section className="relative h-dvh overflow-hidden themed-text-primary flex flex-col">
      <div className="absolute inset-0" aria-hidden>
        <img src={backdrop} alt="" className="h-full w-full object-cover scale-110 blur-2xl opacity-35" />
        <div className="absolute inset-0 bg-[var(--bg-base)]/68" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(ellipse at 20% 40%, ${hobby.glow}, transparent 42%), radial-gradient(ellipse at 90% 80%, rgba(217,70,239,0.22), transparent 48%)`,
          }}
        />
      </div>

      <div className="relative z-10 flex h-full min-h-0 flex-col px-3 sm:px-5 lg:px-8 py-3 sm:py-4">
        <header className="flex shrink-0 items-center justify-between gap-3 mb-2">
          <Link
            to="/open"
            className="hobby-back-link hover:opacity-80 transition-opacity group"
          >
            <FaArrowLeft className="size-3.5 sm:size-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-semibold text-xs sm:text-sm">Archive</span>
          </Link>
          <div className="text-center min-w-0">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.32em] themed-text-label">
              {hobby.kicker}
            </p>
            <h1 className="text-base sm:text-xl md:text-2xl font-extrabold leading-none themed-text-primary">
              {hobby.title}
            </h1>
          </div>
          <p className="font-mono text-xs sm:text-sm themed-text-secondary tabular-nums">
            {paddedIndex}
            <span className="themed-text-muted"> / {String(total).padStart(2, "0")}</span>
          </p>
        </header>

        {showGroups && (
          <div className="shrink-0 mb-2 flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { slug: "all", label: `All · ${catalogTotal}` },
              ...hobby.groups.map((group) => ({ slug: group.slug, label: group.label })),
            ].map((tab) => {
              const active = groupKey === tab.slug;
              return (
                <button
                  key={tab.slug}
                  type="button"
                  onClick={() => setGroupKey(tab.slug)}
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] ${
                    active
                      ? "themed-btn-gradient border-transparent text-[var(--surface-solid)]"
                      : "themed-surface themed-text-secondary hover:border-[var(--surface-border-hover)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="grid min-h-0 flex-1 grid-cols-[42%_1fr] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-2 sm:gap-5">
          <div className="relative min-h-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-0 z-20 hidden sm:flex size-9 items-center justify-center rounded-full themed-surface hover:border-[var(--surface-border-hover)]"
              aria-label="Previous"
            >
              <FaChevronLeft className="size-3.5" />
            </button>
            <div key={item.id} className="relative h-full aspect-[2/3] max-w-full mx-auto animate-fade-in">
              <div
                className="absolute -inset-3 rounded-2xl blur-2xl opacity-70"
                style={{ background: hobby.glow }}
                aria-hidden
              />
              <div
                className="relative h-full overflow-hidden rounded-2xl border border-cyan-400/35 shadow-2xl"
                style={item.fit === "contain" ? { background: item.posterBg ?? "#05010f" } : undefined}
              >
                <PosterImg item={item} className="h-full w-full" padded />
                <div className="hobby-scanlines pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" />
                <span className="pointer-events-none absolute top-2 left-2 h-4 w-4 border-l-2 border-t-2 border-cyan-300/90" />
                <span className="pointer-events-none absolute top-2 right-2 h-4 w-4 border-r-2 border-t-2 border-fuchsia-300/90" />
                <span className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-l-2 border-b-2 border-fuchsia-300/90" />
                <span className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-r-2 border-b-2 border-cyan-300/90" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-0 z-20 hidden sm:flex size-9 items-center justify-center rounded-full themed-surface hover:border-[var(--surface-border-hover)]"
              aria-label="Next"
            >
              <FaChevronRight className="size-3.5" />
            </button>
          </div>

          <div className="min-h-0 flex flex-col justify-center rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md px-4 py-4 sm:px-6 sm:py-5">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] themed-text-label mb-1.5">
              {[item.platform, item.year].filter(Boolean).join(" · ") || "Featured"}
            </p>
            <h2 className="text-xl sm:text-3xl md:text-5xl font-extrabold leading-none mb-2 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
              {item.title}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-cyan-200 mb-3 sm:mb-4">{item.credit}</p>
            <p className="text-white/85 text-xs sm:text-sm md:text-base leading-relaxed mb-4 line-clamp-4 sm:line-clamp-6 max-w-xl">
              {item.description}
            </p>
            <ul className="flex flex-wrap gap-1.5 sm:gap-2">
              {item.tags.map((tag) => (
                <li key={tag} className="themed-pill border rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-medium">
                  {tag}
                </li>
              ))}
            </ul>
            <p className="hidden md:block mt-5 text-[10px] uppercase tracking-[0.22em] themed-text-label">
              Arrow keys to move · tabs to filter
            </p>
          </div>
        </div>

        <nav className="shrink-0 mt-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {visible.map((entry) => {
            const active = entry.id === item.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => goTo(entry.id)}
                className={`relative shrink-0 overflow-hidden rounded-lg border transition-all duration-300 ${
                  active
                    ? "w-[4.75rem] h-[5.4rem] sm:w-24 sm:h-[6.5rem] border-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.45)]"
                    : "w-16 h-[4.6rem] sm:w-[4.75rem] sm:h-[5.5rem] border-[var(--surface-border)] opacity-80 hover:opacity-100"
                }`}
                aria-current={active ? "true" : undefined}
                title={entry.title}
              >
                <PosterImg item={entry} className="h-full w-full" />
                <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] sm:text-[9px] leading-tight py-0.5 px-0.5 text-center text-white font-semibold line-clamp-2">
                  {entry.shortTitle ?? entry.title}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
