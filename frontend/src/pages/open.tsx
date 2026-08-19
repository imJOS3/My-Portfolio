import { Link } from "react-router-dom";
import { FaBookOpen, FaFutbol, FaGamepad, FaHeadphones } from "react-icons/fa";
import { HOBBIES, groupTitles, type HobbyCategory, type HobbyIconId } from "../data/hobbies";
import { useLockViewport } from "../hooks/useLockViewport";

const ICONS: Record<HobbyIconId, typeof FaGamepad> = {
  games: FaGamepad,
  anime: FaBookOpen,
  sports: FaFutbol,
  music: FaHeadphones,
};

const OpenHobbies = () => {
  useLockViewport();

  return (
    <section className="relative h-dvh overflow-hidden themed-text-primary flex flex-col px-3 sm:px-5 lg:px-8 py-3 sm:py-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 18% 12%, rgba(34,211,238,0.32), transparent 48%), radial-gradient(ellipse at 88% 8%, rgba(168,85,247,0.38), transparent 42%), radial-gradient(ellipse at 50% 100%, rgba(217,70,239,0.28), transparent 52%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-h-0 flex-col mx-auto w-full max-w-6xl">
        <header className="flex shrink-0 items-center justify-between gap-3 mb-3 sm:mb-4">
          <Link
            to="/"
            className="hobby-back-link text-xs sm:text-sm font-semibold hover:opacity-80 transition-opacity group"
          >
            <span className="font-semibold text-xs sm:text-sm">← Back</span>
          </Link>
          <div className="text-center min-w-0">
            <p className="hidden sm:block text-[10px] uppercase tracking-[0.32em] themed-text-muted mb-0.5">
              Off the clock · Still me
            </p>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-none themed-text-primary">
              My hobbies
            </h1>
          </div>
          <span className="w-12 sm:w-14" aria-hidden />
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2 sm:gap-3 md:gap-4">
          {HOBBIES.map((hobby, index) => (
            <HobbyCard key={hobby.id} hobby={hobby} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

function HobbyCard({ hobby, index }: { hobby: HobbyCategory; index: number }) {
  const Icon = ICONS[hobby.icon];
  const groups = groupTitles(hobby);
  const splitGroups = groups.length > 1;

  const skin = {
    games: {
      wrap: "rounded-2xl border-cyan-400/35",
      iconWrap: "rounded-xl themed-btn-gradient",
      cta: "Open vault →",
    },
    anime: {
      wrap: "rounded-2xl border-fuchsia-400/40",
      iconWrap: "rounded-xl themed-btn-gradient",
      cta: "Open signal →",
    },
    sports: {
      wrap: "rounded-2xl border-cyan-400/35",
      iconWrap: "rounded-xl themed-btn-gradient",
      cta: "Open HUD →",
    },
    music: {
      wrap: "rounded-[1.75rem] border-purple-400/40",
      iconWrap: "rounded-full themed-btn-gradient",
      cta: "Now playing →",
    },
  }[hobby.id] ?? {
    wrap: "rounded-2xl",
    iconWrap: "rounded-xl themed-btn-gradient",
    cta: "Open archive →",
  };

  return (
    <Link
      to={`/open/${hobby.id}`}
      className={`group relative flex min-h-0 h-full flex-col themed-surface backdrop-blur-md p-3 sm:p-4 md:p-5 overflow-hidden shadow-xl hover:border-[var(--surface-border-hover)] animate-fade-in ${skin.wrap}`}
      style={{ animationDelay: `${index * 70}ms`, animationFillMode: "backwards" }}
    >
      <div
        className="pointer-events-none absolute -top-12 -right-8 h-28 w-28 rounded-full blur-3xl opacity-50 group-hover:opacity-80"
        style={{ background: hobby.glow }}
        aria-hidden
      />
      <Icon
        className="pointer-events-none absolute -bottom-4 -right-3 size-20 sm:size-24 opacity-[0.07] group-hover:opacity-[0.12]"
        aria-hidden
      />

      <div className="relative flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2 shrink-0">
        <span
          className={`flex size-8 sm:size-10 shrink-0 items-center justify-center ${skin.iconWrap}`}
          style={{ boxShadow: `0 0 18px ${hobby.glow}` }}
        >
          <Icon className="size-3.5 sm:size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] themed-text-muted leading-none mb-0.5">
            {hobby.kicker}
          </p>
          <h2 className="text-sm sm:text-lg md:text-xl font-extrabold themed-text-primary leading-tight truncate">
            {hobby.title}
          </h2>
        </div>
      </div>

      <p className="relative themed-text-secondary text-[11px] sm:text-xs md:text-sm leading-snug mb-2 sm:mb-3 line-clamp-2">
        {hobby.description}
      </p>

      <div
        className={`relative min-h-0 flex-1 ${
          groups.length >= 3
            ? "grid grid-cols-3 gap-1.5 sm:gap-2"
            : splitGroups
              ? "grid grid-cols-2 gap-2 sm:gap-3"
              : "flex flex-col"
        }`}
      >
        {groups.map((group) => (
          <div key={group.label} className="min-h-0">
            <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] themed-text-muted mb-1.5">
              {group.label}
            </p>
            <ul className="flex flex-wrap gap-1 sm:gap-1.5">
              {group.items.slice(0, groups.length >= 3 ? 2 : 3).map((name) => (
                <li
                  key={name}
                  className="themed-pill border rounded-full px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-medium"
                >
                  {name}
                </li>
              ))}
              {group.items.length > (groups.length >= 3 ? 2 : 3) && (
                <li className="themed-pill border rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium themed-text-muted">
                  +{group.items.length - (groups.length >= 3 ? 2 : 3)}
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      <p className="relative mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] themed-glow-text">
        {skin.cta}
      </p>
    </Link>
  );
}

export default OpenHobbies;
