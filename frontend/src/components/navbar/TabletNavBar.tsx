import ProfileImage from "../../assets/pfpPorfolioCartoonCut.png";
import { FaComments, FaPalette } from "react-icons/fa";
import { useNavState } from "./useNavState";

const TabletNavBar = () => {
  const { activeSection, scrollTo, sections } = useNavState();

  return (
    <nav className="fixed inset-x-0 top-0 z-40 hidden h-[4.25rem] items-center justify-between gap-3 border-b border-cyan-500/20 bg-[#05010f]/90 px-4 pt-[env(safe-area-inset-top)] shadow-[0_8px_28px_rgba(5,1,15,0.45)] backdrop-blur-md md:flex lg:hidden">
      <div className="flex min-w-0 items-center gap-2.5">
        <img
          src={ProfileImage}
          alt=""
          className="size-9 shrink-0 rounded-full border-2 border-cyan-400 object-cover"
        />
        <p className="hidden truncate text-sm font-extrabold text-[#c084fc] min-[920px]:block">
          JOSE BENJUMEA
        </p>
      </div>

      <div className="flex min-w-0 items-center gap-0.5">
        {sections.map((s) => {
          const active = activeSection === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              title={s.label}
              aria-label={s.label}
              aria-current={active ? "true" : undefined}
              className={`flex min-w-[2.6rem] flex-col items-center rounded-lg px-2 py-1 text-[10px] font-bold transition ${
                active
                  ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-[#05010f]"
                  : "text-[#a5b4fc] hover:bg-white/5"
              }`}
            >
              <span className="text-base leading-none">{s.icon}</span>
              <span className="mt-0.5 hidden min-[900px]:block">{s.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <a
          href="/theme"
          title="Colors"
          aria-label="Colors"
          className="inline-flex size-9 items-center justify-center rounded-lg border border-cyan-400/35 text-cyan-200 transition hover:border-cyan-300/70"
        >
          <FaPalette />
        </a>
        <a
          href="/open"
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-600 px-2.5 py-2 text-xs font-bold text-[#05010f]"
        >
          <FaComments />
          <span className="hidden min-[900px]:inline">Hobbies</span>
        </a>
      </div>
    </nav>
  );
};

export default TabletNavBar;
