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
    <section className="relative h-dvh overflow-hidden themed-text-primary flex flex-col">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(168,85,247,0.25), transparent 42%), var(--bg-base)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-h-0 flex-col px-3 sm:px-6 lg:px-10 py-3 sm:py-5">
        <header className="flex shrink-0 items-center justify-between mb-3">
          <Link to="/open" className="hobby-back-link text-xs sm:text-sm font-semibold hover:opacity-80 transition-opacity">
            <FaArrowLeft className="size-3.5" />
            Library
          </Link>
          <p className="text-[10px] uppercase tracking-[0.35em] themed-text-muted">Now playing</p>
          <p className="font-mono text-xs themed-text-secondary">
            {paddedIndex} / {String(total).padStart(2, "0")}
          </p>
        </header>

        {showGroups && (
          <div className="shrink-0 mb-3 grid grid-cols-3 gap-1.5">
            {hobby.groups.map((group) => {
              const active = groupKey === group.slug;
              return (
                <button
                  key={group.slug}
                  type="button"
                  onClick={() => setGroupKey(group.slug)}
                  className={`rounded-full border px-2 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] ${
                    active
                      ? "themed-btn-gradient border-transparent text-[var(--surface-solid)]"
                      : "themed-surface themed-text-secondary hover:border-[var(--surface-border-hover)]"
                  }`}
                >
                  {group.label === "Música favorita" ? "Favorita" : group.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="grid min-h-0 flex-1 grid-cols-[40%_1fr] lg:grid-cols-2 gap-3 sm:gap-8 items-center">
          <div className="flex flex-col items-center justify-center min-h-0">
            <div className="relative size-[min(32vh,200px)] sm:size-[min(46vh,320px)]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-700 to-black shadow-2xl hobby-vinyl" />
              <div className="absolute inset-[18%] rounded-full overflow-hidden border-4 border-black/80 shadow-inner">
                <PosterImg item={item} className="h-full w-full" />
              </div>
              <div className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--bg-base)] border-2 border-fuchsia-400" />
            </div>
            <div className="mt-3 flex items-end gap-0.5 h-6">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className="hobby-eq w-1 sm:w-1.5 rounded-full bg-fuchsia-400/80"
                  style={{ animationDelay: `${i * 0.08}s` }}
                />
              ))}
            </div>
          </div>

          <div className="min-h-0 flex flex-col">
            <p className="text-[10px] uppercase tracking-[0.28em] themed-text-muted mb-1">
              {item.platform ?? hobby.title}
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold themed-text-primary leading-tight mb-1">
              {item.title}
            </h2>
            <p className="text-sm themed-glow-text mb-3">{item.credit}</p>
            <p className="themed-text-secondary text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2 sm:line-clamp-3">
              {item.description}
            </p>

            <p className="text-[10px] uppercase tracking-[0.22em] themed-text-muted mb-2">
              {groupKey === "all" ? "Queue" : groupLabel}
            </p>
            <ol className="min-h-0 flex-1 overflow-y-auto space-y-1">
              {visible.map((entry, i) => {
                const active = entry.id === item.id;
                return (
                  <li key={entry.id}>
                    <button
                      type="button"
                      onClick={() => goTo(entry.id)}
                      className={`w-full flex items-center gap-3 rounded-xl px-3 py-1.5 text-left ${
                        active ? "themed-surface border border-fuchsia-400/40" : "hover:bg-white/5"
                      }`}
                    >
                      <span className="font-mono text-[10px] themed-text-muted w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="size-9 shrink-0 overflow-hidden rounded-md">
                        <PosterImg item={entry} className="h-full w-full" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-sm font-semibold truncate ${active ? "themed-text-primary" : "themed-text-secondary"}`}>
                          {entry.title}
                        </span>
                        <span className="block text-[10px] themed-text-muted truncate">{entry.credit}</span>
                      </span>
                      {active && (
                        <span className="text-[9px] uppercase tracking-wider themed-glow-text">Playing</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className="hidden sm:block mt-2 text-[10px] themed-text-muted">
              Track {index + 1} of {total} · arrow keys skip
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
