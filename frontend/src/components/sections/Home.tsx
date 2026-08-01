import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";

const Home = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);
  const [showCursor3, setShowCursor3] = useState(false);
  const [showBelow, setShowBelow] = useState(false);

  useEffect(() => {
    const fullText1 = "Hello world!";
    const fullText2 = "I'm Jose Benjumea";
    const fullText3 = "Software engineer";

    let index1 = 0;
    const typing1 = setInterval(() => {
      setText1(fullText1.slice(0, index1 + 1));
      index1++;
      if (index1 === fullText1.length) {
        clearInterval(typing1);
        setShowCursor1(false);

        setTimeout(() => {
          setShowCursor2(true);
          let index2 = 0;
          const typing2 = setInterval(() => {
            setText2(fullText2.slice(0, index2 + 1));
            index2++;
            if (index2 === fullText2.length) {
              clearInterval(typing2);
              setShowCursor2(false);

              setTimeout(() => {
                setShowCursor3(true);
                let index3 = 0;
                const typing3 = setInterval(() => {
                  setText3(fullText3.slice(0, index3 + 1));
                  index3++;
                  if (index3 === fullText3.length) {
                    clearInterval(typing3);
                    setShowCursor3(false);
                    setTimeout(() => setShowBelow(true), 300);
                  }
                }, 100);
              }, 400);
            }
          }, 100);
        }, 400);
      }
    }, 100);

    return () => clearInterval(typing1);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="
      min-h-screen flex flex-col items-center 
      justify-start md:justify-center 
      pt-10 md:pt-0 pb-24 sm:pb-28 gap-10 md:gap-14"
    >
      {/* Animación original */}
      <div className="relative">
        <span className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-cyan-400 via-purple-600 to-fuchsia-500 blur-xl opacity-30"></span>

        <div className="relative bg-[#05010f]/70 backdrop-blur-md rounded-xl p-10 shadow-2xl border border-cyan-500/20">
          <span className="block text-5xl leading-[1.3] pb-2 font-extrabold bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_16px_#22d3ee] mb-2">
            {text1}
            {showCursor1 && <span className="text-cyan-300 animate-pulse">|</span>}
          </span>
          <span className="block text-5xl leading-[1.3] pb-2 font-extrabold bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_16px_#a855f7] mb-2">
            {text2}
            {showCursor2 && <span className="text-cyan-300 animate-pulse">|</span>}
          </span>
          <p className="text-xl text-[#a5b4fc] mb-8 font-medium">
            {text3}
            {showCursor3 && <span className="text-cyan-300 animate-pulse">|</span>}
          </p>
        </div>
      </div>

      {/* Aparece solo al terminar la animación */}
      <div
        className={`w-full max-w-2xl px-4 text-center transition-all duration-700 ease-out ${
          showBelow
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <p className="text-indigo-200/90 text-sm sm:text-base mb-5 leading-relaxed">
          Fullstack developer en progreso · Enfocado en backend y sistemas reales
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["Node.js", "Java", "Spring Boot", "React", "PostgreSQL", "Docker"].map((tech) => (
            <span
              key={tech}
              className="text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-cyan-400/25 bg-[#05010f]/50 text-cyan-100/90"
            >
              {tech}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={scrollToProjects}
          className="inline-flex flex-col items-center gap-1 text-fuchsia-300/80 hover:text-fuchsia-200 transition-colors"
          aria-label="Ir a proyectos"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <FaArrowDown className="animate-bounce" />
        </button>
      </div>
    </div>
  );
};

export default Home;
