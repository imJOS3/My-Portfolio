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
    <section className="hobby-page themed-text-primary">
      <div className="absolute inset-0" aria-hidden>
        <img src={backdrop} alt="" className="h-full w-full scale-110 object-cover opacity-35 blur-2xl" />
        <div className="absolute inset-0 bg-[var(--bg-base)]/68" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(ellipse at 20% 40%, ${hobby.glow}, transparent 42%), radial-gradient(ellipse at 90% 80%, rgba(217,70,239,0.22), transparent 48%)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5 sm:py-4 lg:px-8">
        <header className="mb-2 flex shrink-0 items-center justify-between gap-2 sm:gap-3">
          <Link to="/open" className="hobby-back-link group transition-opacity hover:opacity-80">
            <FaArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5 sm:size-4" />
            <span className="text-xs font-semibold sm:text-sm">Archive</span>
          </Link>
          <div className="min-w-0 text-center">
            <p className="text-[9px] uppercase tracking-[0.32em] themed-text-label sm:text-[10px]">
              {hobby.kicker}
            </p>
            <h1 className="truncate text-sm font-extrabold leading-none themed-text-primary sm:text-xl md:text-2xl">
              {hobby.title}
            </h1>
          </div>
          <p className="shrink-0 font-mono text-xs tabular-nums themed-text-secondary sm:text-sm">
            {paddedIndex}
            <span className="themed-text-muted"> / {String(total).padStart(2, "0")}</span>
          </p>
        </header>

        {showGroups && (
          <div className="mb-2 flex shrink-0 gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-xs ${
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

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-stretch md:gap-5">
          <div className="relative mx-auto flex h-[min(42vh,17.5rem)] w-full max-w-[13.5rem] items-center justify-center md:h-full md:max-w-none">
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-0 z-20 flex size-8 items-center justify-center rounded-full themed-surface hover:border-[var(--surface-border-hover)] sm:size-9"
              aria-label="Previous"
            >
              <FaChevronLeft className="size-3.5" />
            </button>
            <div key={item.id} className="relative mx-auto h-full max-w-full aspect-[2/3] animate-fade-in">
              <div
                className="absolute -inset-3 rounded-2xl opacity-70 blur-2xl"
                style={{ background: hobby.glow }}
                aria-hidden
              />
              <div
                className="relative h-full overflow-hidden rounded-2xl border border-cyan-400/35 shadow-2xl"
                style={item.fit === "contain" ? { background: item.posterBg ?? "#05010f" } : undefined}
              >
                <PosterImg item={item} className="h-full w-full" padded />
                <div className="hobby-scanlines pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" />
                <span className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-cyan-300/90" />
                <span className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-fuchsia-300/90" />
                <span className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-fuchsia-300/90" />
                <span className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-cyan-300/90" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-0 z-20 flex size-8 items-center justify-center rounded-full themed-surface hover:border-[var(--surface-border-hover)] sm:size-9"
              aria-label="Next"
            >
              <FaChevronRight className="size-3.5" />
            </button>
          </div>

          <div className="flex min-h-0 flex-col justify-center rounded-2xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-5">
            <p className="mb-1.5 text-[10px] uppercase tracking-[0.28em] themed-text-label sm:text-xs">
              {[item.platform, item.year].filter(Boolean).join(" · ") || "Featured"}
            </p>
            <h2 className="mb-2 text-xl font-extrabold leading-none text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] sm:text-3xl md:text-5xl">
              {item.title}
            </h2>
            <p className="mb-3 text-xs font-semibold text-cyan-200 sm:mb-4 sm:text-sm">{item.credit}</p>
            <p className="mb-3 line-clamp-3 max-w-xl text-xs leading-relaxed text-white/85 sm:mb-4 sm:line-clamp-6 sm:text-sm md:text-base">
              {item.description}
            </p>
            <ul className="flex flex-wrap gap-1.5 sm:gap-2">
              {item.tags.map((tag) => (
                <li key={tag} className="themed-pill rounded-full border px-2.5 py-0.5 text-[10px] font-medium sm:text-xs">
                  {tag}
                </li>
              ))}
            </ul>
            <p className="mt-5 hidden text-[10px] uppercase tracking-[0.22em] themed-text-label lg:block">
              Arrow keys to move · tabs to filter
            </p>
          </div>
        </div>

        <nav className="mt-2 flex shrink-0 gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {visible.map((entry) => {
            const active = entry.id === item.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => goTo(entry.id)}
                className={`relative shrink-0 overflow-hidden rounded-lg border transition-all duration-300 ${
                  active
                    ? "h-[5.4rem] w-[4.75rem] border-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.45)] sm:h-[6.5rem] sm:w-24"
                    : "h-[4.6rem] w-16 border-[var(--surface-border)] opacity-80 hover:opacity-100 sm:h-[5.5rem] sm:w-[4.75rem]"
                }`}
                aria-current={active ? "true" : undefined}
                title={entry.title}
              >
                <PosterImg item={entry} className="h-full w-full" />
                <span className="absolute inset-x-0 bottom-0 bg-black/80 px-0.5 py-0.5 text-center text-[8px] font-semibold leading-tight text-white line-clamp-2 sm:text-[9px]">
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
