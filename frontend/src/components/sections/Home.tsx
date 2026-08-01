import { useEffect, useState } from "react";

const Home = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);
  const [showCursor3, setShowCursor3] = useState(false);

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

  return (
    <div
      className="
      min-h-screen flex flex-col items-center 
      justify-start md:justify-center 
      pt-10 md:pt-0 pb-24 sm:pb-28"
    >
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
    </div>
  );
};

export default Home;