import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import type { HobbyArchive } from "../../hooks/useHobbyArchive";
import { PosterImg } from "./PosterImg";

export function SportsPitch({ archive }: { archive: HobbyArchive }) {
  const {
    hobby,
    item,
    visible,
    groupKey,
    setGroupKey,
    showGroups,
    goTo,
    catalogTotal,
    paddedIndex,
    total,
  } = archive;

  return (
    <section className="hobby-page themed-text-primary">
      <div className="absolute inset-0 hobby-pitch" aria-hidden />
      <div className="absolute inset-0 bg-[var(--bg-base)]/72" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 18% 20%, rgba(34,211,238,0.2), transparent 42%), radial-gradient(ellipse at 82% 80%, ${hobby.glow}, transparent 48%)`,
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5 lg:px-8">
        <header className="mb-2 flex shrink-0 items-center justify-between gap-2 rounded-xl border border-cyan-400/25 bg-black/55 px-3 py-2 sm:gap-3">
          <Link to="/open" className="hobby-back-link group transition-opacity hover:opacity-80">
            <FaArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5 sm:size-4" />
            <span className="text-xs font-semibold sm:text-sm">Bench</span>
          </Link>
          <div className="min-w-0 text-center">
            <p className="text-[9px] uppercase tracking-[0.3em] themed-text-label">Match day</p>
            <h1 className="truncate text-sm font-black text-white sm:text-lg">{hobby.title}</h1>
          </div>
          <p className="shrink-0 font-mono text-xs tabular-nums text-cyan-200 sm:text-sm">
            {paddedIndex}
            <span className="text-white/50">:{String(total).padStart(2, "0")}</span>
          </p>
        </header>

        {showGroups && (
          <div className="mb-2 flex shrink-0 gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { slug: "all", label: `Squad ${catalogTotal}` },
              ...hobby.groups.map((group) => ({ slug: group.slug, label: group.label })),
            ].map((tab) => (
              <button
                key={tab.slug}
                type="button"
                onClick={() => setGroupKey(tab.slug)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-wider md:flex-1 sm:text-xs ${
                  groupKey === tab.slug
                    ? "themed-btn-gradient border-transparent text-[var(--surface-solid)]"
                    : "border border-cyan-400/20 bg-black/45 text-cyan-100/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <div className="grid min-h-0 flex-1 grid-cols-1 items-center gap-3 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-stretch md:gap-6">
          <div className="flex min-h-0 justify-center">
            <article
              key={item.id}
              className="relative h-[min(40vh,16.5rem)] w-auto max-w-[16rem] aspect-[3/4] animate-fade-in overflow-hidden rounded-2xl border-2 border-cyan-300/70 bg-black/40 shadow-[0_0_36px_rgba(34,211,238,0.28)] md:h-full md:max-h-full md:w-full md:max-w-[280px]"
              style={item.fit === "contain" ? { background: item.posterBg ?? "#05010f" } : undefined}
            >
              <PosterImg item={item} className="absolute inset-0 h-full w-full" padded />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-10">
                <p className="text-[9px] uppercase tracking-[0.2em] text-cyan-200">
                  {item.platform ?? "Player"}
                </p>
                <h2 className="text-lg font-black leading-tight text-white sm:text-2xl">
                  {item.shortTitle ?? item.title}
                </h2>
              </div>
            </article>
          </div>

          <div className="min-h-0 rounded-2xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">
            <p className="mb-1 text-[10px] uppercase tracking-[0.28em] themed-text-label">
              {item.platform ?? "Featured"}
            </p>
            <h2 className="mb-2 text-xl font-black leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:text-3xl md:text-4xl">
              {item.title}
            </h2>
            <p className="mb-3 inline-block rounded-md border border-cyan-300/40 bg-cyan-400/15 px-2.5 py-1 text-xs font-semibold text-cyan-100 sm:text-sm">
              {item.credit}
            </p>
            <p className="mb-3 line-clamp-4 text-xs leading-relaxed text-white/85 sm:mb-4 sm:line-clamp-6 sm:text-sm">
              {item.description}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-sm border border-cyan-400/30 bg-cyan-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cyan-100"
                >
                  {tag}
                </li>
              ))}
            </ul>
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
                className={`relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-lg border-2 sm:w-[4.6rem] ${
                  active
                    ? "scale-[1.04] border-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.4)]"
                    : "border-white/20 opacity-80 hover:opacity-100"
                }`}
                title={entry.title}
              >
                <PosterImg item={entry} className="h-full w-full" />
                <span className="absolute inset-x-0 bottom-0 bg-black/85 px-0.5 py-0.5 text-[8px] font-bold text-white line-clamp-2">
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
