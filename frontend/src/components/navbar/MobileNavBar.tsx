import ProfileImage from "../../assets/pfpPorfolioCartoonCut.png";
import { FaComments, FaBars, FaTimes, FaPalette } from "react-icons/fa";
import { useNavState } from "./useNavState";

const MobileNavBar = () => {
  const { activeSection, open, setOpen, scrollTo, sections } = useNavState();

  return (
    <div className="md:hidden">
      {!open && (
        <div className="fixed bottom-3 left-1/2 z-40 flex w-[min(96%,28rem)] -translate-x-1/2 items-center gap-1 rounded-2xl border border-cyan-500/20 bg-[#05010f]/95 px-2 py-1.5 shadow-2xl backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="shrink-0 rounded-lg bg-gradient-to-tr from-cyan-400 to-fuchsia-600 p-2 text-[#05010f] shadow-lg"
          >
            <FaBars size={14} />
          </button>

          <div className="flex min-w-0 flex-1 items-center justify-around">
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollTo(s.id)}
                aria-label={s.label}
                className={`rounded-md p-1.5 ${
                  activeSection === s.id
                    ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-[#05010f]"
                    : "text-[#a5b4fc]"
                }`}
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80dvh] overflow-y-auto rounded-t-3xl border-t border-cyan-500/20 bg-[#05010f] p-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="mb-4 flex items-center gap-3">
              <img
                src={ProfileImage}
                alt=""
                className="h-12 w-12 rounded-full border-2 border-cyan-400 object-cover"
              />
              <div className="min-w-0">
                <p className="font-extrabold text-[#c084fc]">JOSE BENJUMEA</p>
                <p className="text-xs text-[#67e8f9]">SOFTWARE ENGINEER</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="ml-auto rounded-lg bg-gradient-to-tr from-cyan-400 to-fuchsia-600 p-2 text-[#05010f]"
                aria-label="Close menu"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <ul className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(s.id)}
                    className={`flex w-full items-center rounded-lg px-4 py-3 text-left font-bold ${
                      activeSection === s.id
                        ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-[#05010f]"
                        : "text-[#a5b4fc]"
                    }`}
                  >
                    <span className="mr-3">{s.icon}</span>
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2">
              <a
                href="/theme"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-400/40 px-4 py-3 font-bold text-cyan-200"
              >
                <FaPalette /> Colors
              </a>
              <a
                href="/open"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-600 px-4 py-3 font-bold text-[#05010f]"
              >
                <FaComments /> My hobbies
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavBar;
