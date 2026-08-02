import { FaComments, FaPalette } from "react-icons/fa";
import ProfileImage from "../../assets/pfpPorfolioCartoonCut.png";
import { useNavState } from "./useNavState";

const DesktopNavBar = () => {
  const { activeSection, scrollTo, sections } = useNavState();

  return (
    <nav className="hidden md:flex w-60 h-screen bg-gradient-to-b from-[#05010f] to-[#12042e] text-white flex-col items-center py-2 fixed shadow-2xl border-r border-cyan-500/20">
      <div className="relative my-2">
        <span className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-600 to-fuchsia-500 blur-md opacity-50 animate-pulse z-0"></span>
        <img
          src={ProfileImage}
          alt="Profiles"
          className="w-52 h-[264px] object-cover mx-auto rounded-t-3xl rounded-b-none border-t-4 border-x-4 border-b-0 border-cyan-400 shadow-lg relative mb-3"
        />
      </div>

      <h1 className="text-2xl font-extrabold text-[#c084fc] drop-shadow-[0_0_8px_#a855f7] -mt-2">
        JOSE BENJUMEA
      </h1>
      <p className="text-sm text-[#67e8f9] drop-shadow-[0_0_6px_#22d3ee]">
        SOFTWARE ENGINEER
      </p>

      <ul className="mt-3 space-y-2 w-full flex-1 flex flex-col justify-center items-start">
        {sections.map((s) => (
          <li className="w-full" key={s.id}>
            <button
              onClick={() => scrollTo(s.id)}
              className={`flex items-center w-full px-8 py-2 text-left font-bold transition-all duration-300 rounded-lg hover:scale-105 hover:text-[#05010f] hover:drop-shadow-[0_0_16px_#22d3ee] hover:bg-gradient-to-r hover:from-cyan-400 hover:to-fuchsia-500 ${
                activeSection === s.id
                  ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-[#05010f] scale-105 drop-shadow-[0_0_16px_#22d3ee] border-l-8 border-[#22d3ee]"
                  : "text-[#a5b4fc] drop-shadow-[0_0_8px_#a855f7]"
              }`}
            >
              {s.icon}
              <span className="ml-2">{s.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="w-full flex flex-col items-center mt-auto mb-6 gap-1">
        <a
          href="/theme"
          className="flex w-full px-8 py-2 text-left font-bold transition-all duration-300 rounded-lg hover:scale-105 hover:text-[#05010f] hover:drop-shadow-[0_0_16px_#22d3ee] hover:bg-gradient-to-r hover:from-cyan-400 hover:to-fuchsia-500 text-[#a5b4fc] drop-shadow-[0_0_8px_#a855f7] items-center"
        >
          <FaPalette size={22} className="mr-2" /> Colors
        </a>
        <a
          href="/open"
          className="flex w-full px-8 py-2 text-left font-bold transition-all duration-300 rounded-lg hover:scale-105 hover:text-[#05010f] hover:drop-shadow-[0_0_16px_#22d3ee] hover:bg-gradient-to-r hover:from-cyan-400 hover:to-fuchsia-500 text-[#a5b4fc] drop-shadow-[0_0_8px_#a855f7] items-center"
        >
          <FaComments size={22} className="mr-2" /> My hobbies
        </a>
      </div>
    </nav>
  );
};

export default DesktopNavBar;