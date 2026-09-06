import { FaComments, FaPalette } from "react-icons/fa";
import ProfileImage from "../../assets/pfpPorfolioCartoonCut.png";
import { useNavState } from "./useNavState";

const itemClass = (active: boolean) =>
  `flex items-center w-full px-8 py-2 text-left font-bold transition-all duration-300 rounded-lg hover:scale-105 hover:text-[#05010f] hover:drop-shadow-[0_0_16px_#22d3ee] hover:bg-gradient-to-r hover:from-cyan-400 hover:to-fuchsia-500 [@media(max-height:760px)]:px-6 [@media(max-height:760px)]:py-1.5 [@media(max-height:640px)]:py-1 [@media(min-height:900px)]:py-2.5 [@media(min-height:1100px)]:py-3 ${
    active
      ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-[#05010f] scale-105 drop-shadow-[0_0_16px_#22d3ee] border-l-8 border-[#22d3ee]"
      : "text-[#a5b4fc] drop-shadow-[0_0_8px_#a855f7]"
  }`;

const DesktopNavBar = () => {
  const { activeSection, scrollTo, sections } = useNavState();

  return (
    <nav className="fixed left-0 top-0 z-40 hidden h-dvh max-h-dvh w-60 flex-col items-center overflow-hidden border-r border-cyan-500/20 bg-gradient-to-b from-[#05010f] to-[#12042e] py-2 text-white shadow-2xl lg:flex [@media(min-height:900px)]:py-4 [@media(min-height:1100px)]:py-5">
      <div className="relative my-2 shrink-0 [@media(max-height:700px)]:my-1 [@media(min-height:900px)]:my-3">
        <span className="absolute -inset-2 z-0 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-600 to-fuchsia-500 opacity-50 blur-md animate-pulse [@media(max-height:700px)]:-inset-1" />
        <img
          src={ProfileImage}
          alt="Jose Benjumea"
          className="relative mx-auto mb-3 h-[clamp(8.5rem,30vh,16.5rem)] w-[clamp(6.75rem,23.5vh,13rem)] rounded-t-3xl rounded-b-none border-x-4 border-t-4 border-b-0 border-cyan-400 object-cover object-top shadow-lg [@media(max-height:700px)]:mb-1 [@media(min-height:900px)]:mb-2 [@media(min-height:900px)]:h-[18.5rem] [@media(min-height:900px)]:w-52 [@media(min-height:1100px)]:h-[20rem]"
        />
      </div>

      <h1 className="shrink-0 -mt-2 px-2 text-center text-2xl font-extrabold text-[#c084fc] drop-shadow-[0_0_8px_#a855f7] [@media(max-height:760px)]:text-xl [@media(max-height:640px)]:text-lg">
        JOSE BENJUMEA
      </h1>
      <p className="shrink-0 text-sm text-[#67e8f9] drop-shadow-[0_0_6px_#22d3ee] [@media(max-height:640px)]:text-xs">
        SOFTWARE ENGINEER
      </p>

      <div className="desktop-navbar-scroll mt-3 flex min-h-0 w-full flex-1 flex-col overflow-x-hidden [@media(max-height:760px)]:mt-2 [@media(max-height:640px)]:mt-1 [@media(min-height:900px)]:mt-5">
        <ul className="flex w-full flex-col space-y-2 [@media(max-height:760px)]:space-y-1 [@media(max-height:640px)]:space-y-0.5 [@media(min-height:900px)]:min-h-0 [@media(min-height:900px)]:flex-1 [@media(min-height:900px)]:justify-evenly [@media(min-height:900px)]:space-y-0">
          {sections.map((s) => (
            <li className="w-full" key={s.id}>
              <button type="button" onClick={() => scrollTo(s.id)} className={itemClass(activeSection === s.id)}>
                {s.icon}
                <span className="ml-2">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div role="separator" className="mx-8 my-2 h-px w-[calc(100%-4rem)] shrink-0 bg-white/20 [@media(max-height:640px)]:my-1 [@media(min-height:900px)]:my-3" />

        <div className="mb-1 flex w-full shrink-0 flex-col gap-1 [@media(max-height:640px)]:gap-0.5 [@media(min-height:900px)]:mb-4 [@media(min-height:900px)]:gap-2 [@media(min-height:1100px)]:mb-6">
          <a href="/theme" className={itemClass(false)}>
            <FaPalette size={22} className="mr-2" /> Colors
          </a>
          <a href="/open" className={itemClass(false)}>
            <FaComments size={22} className="mr-2" /> My hobbies
          </a>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavBar;
