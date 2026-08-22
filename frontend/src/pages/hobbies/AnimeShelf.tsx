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
    <section className="hobby-page themed-text-primary">
      <div className="absolute inset-0" aria-hidden>
        <img src={backdrop} alt="" className="h-full w-full scale-125 object-cover opacity-45 blur-3xl" />
        <div className="absolute inset-0 bg-[var(--bg-base)]/65" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, ${hobby.glow}, transparent 55%)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5 lg:px-8">
        <header className="mb-1 flex shrink-0 items-center justify-between gap-2 sm:mb-2 sm:gap-3">
          <Link to="/open" className="hobby-back-link group transition-opacity hover:opacity-80">
            <FaArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5 sm:size-4" />
            <span className="text-xs font-semibold sm:text-sm">Archive</span>
          </Link>
          <div className="min-w-0 text-center">
            <p className="text-[9px] uppercase tracking-[0.32em] themed-text-label sm:text-[10px]">
              {hobby.kicker}
            </p>
            <h1 className="truncate text-sm font-extrabold themed-text-primary sm:text-xl">{hobby.title}</h1>
          </div>
          <p className="shrink-0 font-mono text-xs tabular-nums themed-text-secondary">
            {paddedIndex}
            <span className="themed-text-muted"> / {String(total).padStart(2, "0")}</span>
          </p>
        </header>

        {showGroups && (
          <div className="mb-2 flex shrink-0 justify-start gap-1.5 overflow-x-auto sm:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { slug: "all", label: `All · ${catalogTotal}` },
              ...hobby.groups.map((group) => ({ slug: group.slug, label: group.label })),
            ].map((tab) => (
              <button
                key={tab.slug}
                type="button"
                onClick={() => setGroupKey(tab.slug)}
                className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-xs ${
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

        <div className="relative flex h-[min(44vh,18rem)] min-h-0 items-center md:h-auto md:flex-1">
          <button
            type="button"
            onClick={() => step(-1)}
            className="absolute left-0 z-30 flex size-8 items-center justify-center rounded-full themed-surface sm:size-10"
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>

          <div className="hobby-perspective flex h-full w-full items-center justify-center overflow-hidden">
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
                  className={`hobby-coverflow-card absolute left-1/2 top-1/2 ${abs > 2 ? "hobby-coverflow-far" : ""}`}
                  style={{
                    zIndex: 30 - abs,
                    opacity: abs > 3 ? 0 : 1 - abs * 0.18,
                    transform: `translate(-50%, -50%) translateX(calc(${offset} * var(--cover-step))) rotateY(${offset * -32}deg) scale(${active ? 1 : 0.72})`,
                    filter: active ? "none" : "brightness(0.55)",
                  }}
                  title={entry.title}
                >
                  <span
                    className={`block h-[min(34vh,240px)] w-[min(23vh,160px)] overflow-hidden rounded-2xl border sm:h-[min(38vh,280px)] sm:w-[min(26vh,190px)] md:h-[min(42vh,320px)] md:w-[min(28vh,215px)] ${
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
            className="absolute right-0 z-30 flex size-8 items-center justify-center rounded-full themed-surface sm:size-10"
            aria-label="Next"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="shrink-0 px-0 pb-1 pt-2 sm:px-2">
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/15 bg-black/65 px-3 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md sm:px-4">
            <p className="text-[10px] uppercase tracking-[0.28em] themed-text-label sm:text-xs">
              {[item.platform, item.year].filter(Boolean).join(" · ")}
            </p>
            <h2 className="text-xl font-extrabold leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:text-4xl md:text-5xl">
              {item.title}
            </h2>
            <p className="mt-1 text-xs font-semibold text-cyan-200 sm:text-sm">{item.credit}</p>
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/85 sm:line-clamp-3 sm:text-sm">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
