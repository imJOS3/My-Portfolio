import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import type { HobbyArchive } from "../../hooks/useHobbyArchive";
import { PosterImg } from "./PosterImg";

export function MusicDeck({ archive }: { archive: HobbyArchive }) {
  const {
    hobby,
    item,
    visible,
    goTo,
    paddedIndex,
    total,
    index,
    groupKey,
    groupLabel,
    setGroupKey,
    showGroups,
  } = archive;

  return (
    <section className="hobby-page themed-text-primary">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(168,85,247,0.25), transparent 42%), var(--bg-base)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-5 lg:px-10">
        <header className="mb-3 flex shrink-0 items-center justify-between gap-2">
          <Link
            to="/open"
            className="hobby-back-link text-xs font-semibold transition-opacity hover:opacity-80 sm:text-sm"
          >
            <FaArrowLeft className="size-3.5" />
            Library
          </Link>
          <p className="truncate text-[10px] uppercase tracking-[0.2em] themed-text-muted sm:tracking-[0.35em]">
            <span className="sm:hidden">Play</span>
            <span className="hidden sm:inline">Now playing</span>
          </p>
          <p className="shrink-0 font-mono text-xs themed-text-secondary">
            {paddedIndex} / {String(total).padStart(2, "0")}
          </p>
        </header>

        {showGroups && (
          <div className="mb-3 flex shrink-0 gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { slug: "all", label: "All" },
              ...hobby.groups.map((group) => ({
                slug: group.slug,
                label: group.label === "Música favorita" ? "Favorita" : group.label,
              })),
            ].map((tab) => {
              const active = groupKey === tab.slug;
              return (
                <button
                  key={tab.slug}
                  type="button"
                  onClick={() => setGroupKey(tab.slug)}
                  className={`shrink-0 rounded-full border px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-xs ${
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

        <div className="grid min-h-0 flex-1 grid-cols-1 items-center gap-4 md:grid-cols-2 md:items-stretch md:gap-8">
          <div className="flex shrink-0 flex-col items-center justify-center md:min-h-0">
            <div className="relative size-[min(42vw,11.5rem)] sm:size-[min(32vh,15rem)] md:size-[min(46vh,20rem)]">
              <div className="hobby-vinyl absolute inset-0 rounded-full bg-gradient-to-br from-zinc-700 to-black shadow-2xl" />
              <div className="absolute inset-[18%] overflow-hidden rounded-full border-4 border-black/80 shadow-inner">
                <PosterImg item={item} className="h-full w-full" />
              </div>
              <div className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-fuchsia-400 bg-[var(--bg-base)]" />
            </div>
            <div className="mt-3 flex h-6 items-end gap-0.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className="hobby-eq w-1 rounded-full bg-fuchsia-400/80 sm:w-1.5"
                  style={{ animationDelay: `${i * 0.08}s` }}
                />
              ))}
            </div>
          </div>

          <div className="flex min-h-0 flex-col md:h-full">
            <p className="mb-1 text-[10px] uppercase tracking-[0.28em] themed-text-muted">
              {item.platform ?? hobby.title}
            </p>
            <h2 className="mb-1 text-2xl font-extrabold leading-tight themed-text-primary sm:text-4xl">
              {item.title}
            </h2>
            <p className="mb-3 text-sm themed-glow-text">{item.credit}</p>
            <p className="mb-3 line-clamp-3 text-xs leading-relaxed themed-text-secondary sm:text-sm">
              {item.description}
            </p>

            <p className="mb-2 text-[10px] uppercase tracking-[0.22em] themed-text-muted">
              {groupKey === "all" ? "Queue" : groupLabel}
            </p>
            <ol className="min-h-0 flex-1 space-y-1 md:overflow-y-auto">
              {visible.map((entry, i) => {
                const active = entry.id === item.id;
                return (
                  <li key={entry.id}>
                    <button
                      type="button"
                      onClick={() => goTo(entry.id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-1.5 text-left ${
                        active ? "themed-surface border border-fuchsia-400/40" : "hover:bg-white/5"
                      }`}
                    >
                      <span className="w-5 font-mono text-[10px] themed-text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="size-9 shrink-0 overflow-hidden rounded-md">
                        <PosterImg item={entry} className="h-full w-full" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-sm font-semibold ${active ? "themed-text-primary" : "themed-text-secondary"}`}
                        >
                          {entry.title}
                        </span>
                        <span className="block truncate text-[10px] themed-text-muted">{entry.credit}</span>
                      </span>
                      {active && (
                        <span className="text-[9px] uppercase tracking-wider themed-glow-text">Playing</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className="mt-2 hidden text-[10px] themed-text-muted sm:block">
              Track {index + 1} of {total} · arrow keys skip
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
