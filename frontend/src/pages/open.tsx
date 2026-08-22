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
    <section className="hobby-page themed-text-primary px-3 py-3 sm:px-5 sm:py-4 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 18% 12%, rgba(34,211,238,0.32), transparent 48%), radial-gradient(ellipse at 88% 8%, rgba(168,85,247,0.38), transparent 42%), radial-gradient(ellipse at 50% 100%, rgba(217,70,239,0.28), transparent 52%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <header className="mb-3 flex shrink-0 items-center justify-between gap-3 sm:mb-4">
          <Link
            to="/"
            className="hobby-back-link group text-xs font-semibold transition-opacity hover:opacity-80 sm:text-sm"
          >
            <span className="text-xs font-semibold sm:text-sm">← Back</span>
          </Link>
          <div className="min-w-0 text-center">
            <p className="mb-0.5 hidden text-[10px] uppercase tracking-[0.32em] themed-text-muted sm:block">
              Off the clock · Still me
            </p>
            <h1 className="text-xl font-extrabold leading-none themed-text-primary sm:text-2xl md:text-3xl">
              My hobbies
            </h1>
          </div>
          <span className="w-12 sm:w-14" aria-hidden />
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2 md:grid-rows-2 md:gap-4">
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
  const previewItems = groups.flatMap((group) => group.items);
  const mobilePreview = previewItems.slice(0, 4);

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
      className={`group relative flex min-h-0 flex-col overflow-hidden themed-surface p-3 shadow-xl backdrop-blur-md animate-fade-in hover:border-[var(--surface-border-hover)] sm:p-4 md:h-full md:p-5 ${skin.wrap}`}
      style={{ animationDelay: `${index * 70}ms`, animationFillMode: "backwards" }}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-12 h-28 w-28 rounded-full opacity-50 blur-3xl group-hover:opacity-80"
        style={{ background: hobby.glow }}
        aria-hidden
      />
      <Icon
        className="pointer-events-none absolute -bottom-4 -right-3 size-16 opacity-[0.07] group-hover:opacity-[0.12] sm:size-24"
        aria-hidden
      />

      <div className="relative mb-1.5 flex shrink-0 items-center gap-2.5 sm:mb-2 sm:gap-3">
        <span
          className={`flex size-8 shrink-0 items-center justify-center sm:size-10 ${skin.iconWrap}`}
          style={{ boxShadow: `0 0 18px ${hobby.glow}` }}
        >
          <Icon className="size-3.5 sm:size-4" />
        </span>
        <div className="min-w-0">
          <p className="mb-0.5 text-[9px] uppercase leading-none tracking-[0.24em] themed-text-muted sm:text-[10px]">
            {hobby.kicker}
          </p>
          <h2 className="truncate text-base font-extrabold leading-tight themed-text-primary sm:text-lg md:text-xl">
            {hobby.title}
          </h2>
        </div>
      </div>

      <p className="relative mb-2 line-clamp-2 text-[11px] leading-snug themed-text-secondary sm:mb-3 sm:text-xs md:text-sm">
        {hobby.description}
      </p>

      <ul className="relative mb-2 flex flex-wrap gap-1 md:hidden">
        {mobilePreview.map((name) => (
          <li
            key={name}
            className="themed-pill rounded-full border px-2 py-0.5 text-[10px] font-medium"
          >
            {name}
          </li>
        ))}
        {previewItems.length > mobilePreview.length && (
          <li className="themed-pill rounded-full border px-2 py-0.5 text-[10px] font-medium themed-text-muted">
            +{previewItems.length - mobilePreview.length}
          </li>
        )}
      </ul>

      <div
        className={`relative hidden min-h-0 flex-1 md:grid ${
          groups.length >= 3
            ? "grid-cols-3 gap-1.5 sm:gap-2"
            : splitGroups
              ? "grid-cols-2 gap-2 sm:gap-3"
              : "flex flex-col"
        }`}
      >
        {groups.map((group) => (
          <div key={group.label} className="min-h-0">
            <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] themed-text-muted sm:text-[10px]">
              {group.label}
            </p>
            <ul className="flex flex-wrap gap-1 sm:gap-1.5">
              {group.items.slice(0, groups.length >= 3 ? 2 : 3).map((name) => (
                <li
                  key={name}
                  className="themed-pill rounded-full border px-2 py-0.5 text-[10px] font-medium sm:px-2.5 sm:text-xs"
                >
                  {name}
                </li>
              ))}
              {group.items.length > (groups.length >= 3 ? 2 : 3) && (
                <li className="themed-pill rounded-full border px-2 py-0.5 text-[10px] font-medium themed-text-muted sm:text-xs">
                  +{group.items.length - (groups.length >= 3 ? 2 : 3)}
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      <p className="relative mt-auto text-[10px] uppercase tracking-[0.2em] themed-glow-text sm:text-xs">
        {skin.cta}
      </p>
    </Link>
  );
}

export default OpenHobbies;
