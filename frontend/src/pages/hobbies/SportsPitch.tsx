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
    <section className="relative h-dvh overflow-hidden themed-text-primary flex flex-col">
      <div className="absolute inset-0 hobby-pitch" aria-hidden />
      <div className="absolute inset-0 bg-[var(--bg-base)]/72" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 18% 20%, rgba(34,211,238,0.2), transparent 42%), radial-gradient(ellipse at 82% 80%, ${hobby.glow}, transparent 48%)`,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-h-0 flex-col px-3 sm:px-5 lg:px-8 py-3">
        <header className="shrink-0 mb-2 rounded-xl border border-cyan-400/25 bg-black/55 px-3 py-2 flex items-center justify-between gap-3">
          <Link
            to="/open"
            className="hobby-back-link hover:opacity-80 transition-opacity group"
          >
            <FaArrowLeft className="size-3.5 sm:size-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-semibold text-xs sm:text-sm">Bench</span>
          </Link>
          <div className="text-center min-w-0">
            <p className="text-[9px] uppercase tracking-[0.3em] themed-text-label">Match day</p>
            <h1 className="text-sm sm:text-lg font-black text-white truncate">{hobby.title}</h1>
          </div>
          <p className="font-mono text-cyan-200 text-xs sm:text-sm tabular-nums">
            {paddedIndex}
            <span className="text-white/50">:{String(total).padStart(2, "0")}</span>
          </p>
        </header>

        {showGroups && (
          <div className="shrink-0 mb-2 flex gap-1.5">
            {[
              { slug: "all", label: `Squad ${catalogTotal}` },
              ...hobby.groups.map((group) => ({ slug: group.slug, label: group.label })),
            ].map((tab) => (
              <button
                key={tab.slug}
                type="button"
                onClick={() => setGroupKey(tab.slug)}
                className={`flex-1 rounded-lg py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider ${
                  groupKey === tab.slug
                    ? "themed-btn-gradient border-transparent text-[var(--surface-solid)]"
                    : "bg-black/45 text-cyan-100/80 border border-cyan-400/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-3 sm:gap-6 items-center">
          <div className="min-h-0 flex justify-center">
            <article
              key={item.id}
              className="relative h-full max-h-full aspect-[3/4] max-w-[280px] w-full animate-fade-in overflow-hidden rounded-2xl border-2 border-cyan-300/70 bg-black/40 shadow-[0_0_36px_rgba(34,211,238,0.28)]"
              style={item.fit === "contain" ? { background: item.posterBg ?? "#05010f" } : undefined}
            >
              <PosterImg item={item} className="absolute inset-0 h-full w-full" padded />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-10">
                <p className="text-[9px] uppercase tracking-[0.2em] text-cyan-200">
                  {item.platform ?? "Player"}
                </p>
                <h2 className="text-white font-black text-lg sm:text-2xl leading-tight">
                  {item.shortTitle ?? item.title}
                </h2>
              </div>
            </article>
          </div>

          <div className="min-h-0 rounded-2xl border border-white/10 bg-black/55 backdrop-blur-md px-4 py-4 sm:px-6">
            <p className="text-[10px] uppercase tracking-[0.28em] themed-text-label mb-1">
              {item.platform ?? "Featured"}
            </p>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {item.title}
            </h2>
            <p className="inline-block mb-3 rounded-md bg-cyan-400/15 border border-cyan-300/40 px-2.5 py-1 text-xs sm:text-sm font-semibold text-cyan-100">
              {item.credit}
            </p>
            <p className="text-white/85 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-4 sm:line-clamp-6">
              {item.description}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-sm bg-cyan-500/15 border border-cyan-400/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cyan-100"
                >
                  {tag}
                </li>
              ))}
            </ul>
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
                className={`relative shrink-0 w-16 sm:w-[4.6rem] aspect-[3/4] overflow-hidden rounded-lg border-2 ${
                  active
                    ? "border-cyan-300 scale-[1.04] shadow-[0_0_16px_rgba(34,211,238,0.4)]"
                    : "border-white/20 opacity-80 hover:opacity-100"
                }`}
                title={entry.title}
              >
                <PosterImg item={entry} className="h-full w-full" />
                <span className="absolute bottom-0 inset-x-0 bg-black/85 text-[8px] text-white font-bold py-0.5 px-0.5 line-clamp-2">
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
