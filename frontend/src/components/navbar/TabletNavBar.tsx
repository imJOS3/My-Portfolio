import React from "react";
import ProfileImage from "../../assets/pfpPorfolioCartoonCut.png";
import { FaChevronLeft, FaChevronRight, FaBars, FaTimes, FaComments, FaPalette } from "react-icons/fa";
import { useNavState } from "./useNavState";

const TabletNavBar: React.FC = () => {
  const {
    activeSection,
    open,
    setOpen,
    carouselIndex,
    setCarouselIndex,
    visibleCount,
    scrollTo,
    sections,
  } = useNavState();

  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    if (!open && activeSection) {
      const activeIndex = sections.findIndex(s => s.id === activeSection);
      const isVisible = activeIndex >= carouselIndex && activeIndex < carouselIndex + visibleCount;

      if (!isVisible && activeIndex !== -1) {
        setIsTransitioning(true);
        const newIndex = Math.floor(activeIndex / visibleCount) * visibleCount;
        setCarouselIndex(newIndex % sections.length);
        setTimeout(() => setIsTransitioning(false), 300);
      }
    }
  }, [activeSection, open, sections, carouselIndex, visibleCount, setCarouselIndex]);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (!activeSection && !open) {
      interval = setInterval(() => {
        setIsTransitioning(true);
        setCarouselIndex((i) => (i + visibleCount) % sections.length);
        setTimeout(() => setIsTransitioning(false), 300);
      }, 4000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeSection, open, sections.length, setCarouselIndex, visibleCount]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCarouselIndex((i) => (i - visibleCount + sections.length) % sections.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCarouselIndex((i) => (i + visibleCount) % sections.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

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

  return (
    <div className="hidden md:flex lg:hidden">

      {/* NAVBAR PRINCIPAL */}
      {!open && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-3xl 
          bg-[#05010f]/95 backdrop-blur-sm rounded-3xl px-6 py-4 flex 
          items-center justify-between shadow-2xl border border-cyan-500/20 z-40
          min-h-[80px] h-[80px]">

          {/* Left */}
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setOpen(true)}
              className="p-3 rounded-lg bg-gradient-to-tr from-cyan-400 to-fuchsia-600 text-[#05010f] shadow-lg
                       hover:from-cyan-300 hover:to-fuchsia-500 transition-all"
            >
              <FaBars size={22} />
            </button>

            <img
              src={ProfileImage}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400"
            />

            <div className="ml-2 max-w-[120px]">
              <div className="text-[14px] font-bold text-[#c084fc] leading-tight drop-shadow-[0_0_6px_#a855f7]">JOSE BENJUMEA</div>
              <div className="text-[12px] text-[#67e8f9] leading-tight mt-0.5">SOFTWARE ENGINEER</div>
            </div>
          </div>

          {/* Right - Carousel */}
          <div className="flex gap-4 items-center">
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className={`p-3 rounded-md transition-all ${
                isTransitioning 
                  ? "bg-[#05010f] text-[#3b3660] cursor-not-allowed" 
                  : "bg-[#12042e]/80 text-[#22d3ee] hover:bg-[#1a0b3d]"
              }`}
            >
              <FaChevronLeft size={18} />
            </button>

            <div className="flex gap-3 items-center px-2 py-1 overflow-hidden">
              {Array.from({ length: visibleCount }).map((_, i) => {
                const s = sections[(carouselIndex + i) % sections.length];

                return (
                  <button
                    key={`${s.id}-${i}`}
                    onClick={() => !isTransitioning && scrollTo(s.id)}
                    className={`flex flex-col items-center text-sm font-bold p-3 rounded-lg transition-all min-w-[100px] 
                      ${
                        activeSection === s.id
                          ? "text-[#05010f] bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-lg scale-105"
                          : "text-[#a5b4fc] hover:text-[#67e8f9] hover:bg-[#12042e]"
                      } ${isTransitioning ? "opacity-70 cursor-not-allowed" : "opacity-100"} 
                      transition-opacity duration-300`}
                    disabled={isTransitioning}
                  >
                    <span className="text-xl mb-1">{s.icon}</span>
                    <span className="text-xs">{s.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className={`p-3 rounded-md transition-all ${
                isTransitioning 
                  ? "bg-[#05010f] text-[#3b3660] cursor-not-allowed" 
                  : "bg-[#12042e]/80 text-[#22d3ee] hover:bg-[#1a0b3d]"
              }`}
            >
              <FaChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* SLIDE-UP MENU */}
      <div
        className={`fixed inset-0 z-30 transition-all duration-300 
        ${open ? "translate-y-0 backdrop-blur-sm" : "translate-y-full"}`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setOpen(false)}
        />

        <div className="absolute bottom-0 left-0 right-0 
          bg-gradient-to-t from-[#05010f] to-transparent 
          rounded-t-3xl p-6 max-h-[70vh] overflow-auto border-t border-cyan-500/20">

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={ProfileImage}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400"
            />
            <div>
              <div className="text-lg font-extrabold text-[#c084fc] drop-shadow-[0_0_6px_#a855f7]">JOSE BENJUMEA</div>
              <div className="text-xs text-[#67e8f9]">SOFTWARE ENGINEER</div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="ml-auto p-2 rounded-lg bg-gradient-to-tr from-cyan-400 to-fuchsia-600 text-[#05010f] shadow-lg hover:from-cyan-300 hover:to-fuchsia-500 
                       transition-all"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* List */}
          <ul className="space-y-3">
            {sections.map((s) => {
              const isActive = activeSection === s.id;

              return (
                <li key={s.id}>
                  <button
                    onClick={() => {
                      scrollTo(s.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 text-left font-bold rounded-lg 
                      transition-all duration-300 transform
                      ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-[#05010f] shadow-lg scale-105"
                          : "text-[#a5b4fc] hover:bg-[#12042e]/60 hover:scale-105"
                      }`}
                  >
                    <span className="mr-3 text-xl">{s.icon}</span>
                    <span>{s.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Extra */}
          <div className="mt-6 space-y-2">
            <a
              href="/theme"
              className="w-full inline-flex items-center gap-2 justify-center px-4 py-3 
              border border-cyan-400/40 text-cyan-200 font-bold rounded-lg
              hover:border-fuchsia-400/50 transition-all"
            >
              <FaPalette /> Colors
            </a>
            <a
              href="/open"
              className="w-full inline-flex items-center gap-2 justify-center px-4 py-3 
              bg-gradient-to-r from-cyan-400 to-fuchsia-600 text-[#05010f] font-bold 
              rounded-lg shadow-lg hover:from-cyan-300 hover:to-fuchsia-500 transition-all"
            >
              <FaComments /> My hobbies
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabletNavBar;