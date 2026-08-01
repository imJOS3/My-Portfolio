import React from "react";
import ProfileImage from "../../assets/pfpPorfolioCartoonCut.png";
import { FaComments, FaBars, FaTimes } from "react-icons/fa";
import { useNavState } from "./useNavState";

const MobileNavBar: React.FC = () => {
  const {
    activeSection,
    open,
    setOpen,
    activePulse,
    scrollTo,
    sections,
  } = useNavState();

  const [showNavBar, setShowNavBar] = React.useState(true);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current) {
        setShowNavBar(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNavBar(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const currentIcon = sections.find((s) => s.id === activeSection)?.icon;

  return (
    <div className="md:hidden">
      {/* BOTTOM FIXED MOBILE NAV (when menu closed) */}
      {!open && (
        <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-3xl 
          bg-[#05010f]/95 backdrop-blur-sm rounded-3xl px-4 py-2 flex 
          items-center justify-between shadow-2xl border border-cyan-500/20 z-40
          transition-all duration-300 ${
            showNavBar ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
          }`}>

          {/* Profile + Toggle Button */}
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              className="p-2 rounded-lg bg-gradient-to-tr from-cyan-400 to-fuchsia-600 text-[#05010f] shadow-lg"
            >
              <FaBars size={18} />
            </button>

            <img
              src={ProfileImage}
              alt="Foto de perfil"
              className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400"
            />

            <div className="ml-2">
              <div className="text-sm font-bold text-[#c084fc] drop-shadow-[0_0_6px_#a855f7]">JOSE BENJUMEA</div>
              <div className="text-xs text-[#67e8f9]">SOFTWARE ENGINEER</div>
            </div>
          </div>

          {/* Button to focus current active section */}
          <button
            onClick={() => scrollTo(activeSection)}
            aria-label="Ir a la sección activa"
            className={`px-3 py-2 bg-[#12042e]/80 text-[#22d3ee] rounded-md font-bold 
              transition-all duration-300 transform
              ${activePulse ? "scale-105 shadow-md" : "scale-100"}`}
          >
            {currentIcon}
          </button>
        </div>
      )}

      {/* SLIDE-UP MENU (when open) */}
      <div
        className={`fixed inset-0 z-30 transition-all duration-300 
        ${open ? "translate-y-0 backdrop-blur-sm" : "translate-y-full"}`}
      >
        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
        />

        {/* PANEL */}
        <div className="absolute bottom-0 left-0 right-0 
          bg-gradient-to-t from-[#05010f] to-transparent 
          rounded-t-3xl p-4 max-h-[70vh] overflow-auto border-t border-cyan-500/20">

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={ProfileImage}
              alt="Foto de perfil"
              className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400"
            />
            <div>
              <div className="text-lg font-extrabold text-[#c084fc] drop-shadow-[0_0_6px_#a855f7]">JOSE BENJUMEA</div>
              <div className="text-xs text-[#67e8f9]">SOFTWARE ENGINEER</div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="ml-auto p-2 rounded-lg bg-gradient-to-tr from-cyan-400 to-fuchsia-600 text-[#05010f] shadow-lg"
              aria-label="Cerrar menú"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Navigation List */}
          <ul className="space-y-2">
            {sections.map((s) => {
              const isActive = activeSection === s.id;

              return (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo(s.id)}
                    aria-label={`Ir a ${s.label}`}
                    className={`w-full flex items-center px-4 py-3 text-left font-bold rounded-lg 
                      transition-all duration-300 transform
                      ${
                        isActive
                          ? `bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-[#05010f] ${
                              activePulse ? "scale-102 shadow-lg" : "scale-100"
                            }`
                          : "text-[#a5b4fc] hover:bg-[#12042e]/60"
                      }`}
                  >
                    <span className="mr-3">{s.icon}</span>
                    <span>{s.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Link Extra */}
          <div className="mt-4">
            <a
              href="/open"
              className="w-full inline-flex items-center gap-2 justify-center px-4 py-3 
              bg-gradient-to-r from-cyan-400 to-fuchsia-600 text-[#05010f] font-bold 
              rounded-lg shadow-lg"
            >
              <FaComments /> Mis hobbies
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavBar;