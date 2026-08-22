import { Link } from "react-router-dom";
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { HobbyArchive } from "../../hooks/useHobbyArchive";
import { PosterImg } from "./PosterImg";

export function AnimeShelf({ archive }: { archive: HobbyArchive }) {
  const {
    hobby,
    item,
    visible,
    index,
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
        <img src={backdrop} alt="" className="h-full w-full object-cover scale-125 blur-3xl opacity-45" />
        <div className="absolute inset-0 bg-[var(--bg-base)]/65" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, ${hobby.glow}, transparent 55%)`,
          }}
        />
      </div>

      <div className="relative z-10 flex h-full min-h-0 flex-col px-3 sm:px-5 lg:px-8 py-3">
        <header className="flex shrink-0 items-center justify-between gap-3 mb-1 sm:mb-2">
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
            <h1 className="text-base sm:text-xl font-extrabold themed-text-primary">{hobby.title}</h1>
          </div>
          <p className="font-mono text-xs themed-text-secondary tabular-nums">
            {paddedIndex}
            <span className="themed-text-muted"> / {String(total).padStart(2, "0")}</span>
          </p>
        </header>

        {showGroups && (
          <div className="shrink-0 mb-2 flex justify-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { slug: "all", label: `All · ${catalogTotal}` },
              ...hobby.groups.map((group) => ({ slug: group.slug, label: group.label })),
            ].map((tab) => (
              <button
                key={tab.slug}
                type="button"
                onClick={() => setGroupKey(tab.slug)}
                className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] ${
                  groupKey === tab.slug
                    ? "themed-btn-gradient border-transparent text-[var(--surface-solid)]"
                    : "themed-surface themed-text-secondary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <div className="relative min-h-0 flex-1 flex items-center">
          <button
            type="button"
            onClick={() => step(-1)}
            className="absolute left-0 z-30 hidden sm:flex size-10 items-center justify-center rounded-full themed-surface"
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>

          <div className="hobby-perspective w-full h-full flex items-center justify-center">
            {visible.map((entry, i) => {
              const offset = i - index;
              const abs = Math.abs(offset);
              if (abs > 4) return null;
              const active = offset === 0;
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => goTo(entry.id)}
                  className="hobby-coverflow-card absolute left-1/2 top-1/2"
                  style={{
                    zIndex: 30 - abs,
                    opacity: abs > 3 ? 0 : 1 - abs * 0.18,
                    transform: `translate(-50%, -50%) translateX(${offset * 7.2}rem) rotateY(${offset * -32}deg) scale(${active ? 1 : 0.72})`,
                    filter: active ? "none" : "brightness(0.55)",
                  }}
                  title={entry.title}
                >
                  <span
                    className={`block h-[min(38vh,280px)] w-[min(26vh,190px)] sm:h-[min(42vh,320px)] sm:w-[min(28vh,215px)] overflow-hidden rounded-2xl border ${
                      active
                        ? "border-fuchsia-300 shadow-[0_20px_60px_rgba(217,70,239,0.45)]"
                        : "border-white/10"
                    }`}
                    style={entry.fit === "contain" ? { background: entry.posterBg ?? "#111" } : undefined}
                  >
                    <PosterImg item={entry} className="h-full w-full" padded={active} />
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => step(1)}
            className="absolute right-0 z-30 hidden sm:flex size-10 items-center justify-center rounded-full themed-surface"
            aria-label="Next"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="shrink-0 text-center pt-1 pb-1 px-2">
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/15 bg-black/65 backdrop-blur-md px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] themed-text-label">
              {[item.platform, item.year].filter(Boolean).join(" · ")}
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {item.title}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-cyan-200 mt-1">{item.credit}</p>
            <p className="text-white/85 text-xs sm:text-sm leading-relaxed mt-2 line-clamp-2 sm:line-clamp-3">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
