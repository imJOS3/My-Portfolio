import { useRef, useEffect, useState } from "react";
import ProfileImage from '../../assets/pfpPortfolio.png';
import CurriculumPDF from '../../assets/curriculum/JoseBenjumeaCV.pdf';

const AboutMe = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    return (
        <div
            ref={ref}
            className={`section-animate${visible ? ' visible' : ''} bg-black/70 backdrop-blur-md text-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border border-fuchsia-400/40 w-full max-w-6xl mx-auto flex flex-col scroll-mt-[50vh]`}
        >
            <div className="flex flex-col lg:flex-row items-center gap-5 sm:gap-6 md:gap-8">
                <div className="flex-shrink-0 flex justify-center">
                    <img
                        src={ProfileImage}
                        alt="Profile"
                        className="w-32 h-44 sm:w-36 sm:h-48 md:w-44 md:h-56 lg:w-48 lg:h-64 rounded-2xl object-cover border-4 border-fuchsia-400 shadow-lg drop-shadow-neon transition-transform hover:scale-105"
                    />
                </div>

                <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-fuchsia-300 drop-shadow-neon">
                        About Me
                    </h2>
                    <p className="text-indigo-200 leading-relaxed text-sm sm:text-base mb-3">
                        Hi! I'm{" "}
                        <strong className="text-white">Jose Benjumea</strong>, a
                        Software Engineering student in my{" "}
                        <span className="text-fuchsia-300 font-semibold">final semesters</span>{" "}
                        at{" "}
                        <span className="text-fuchsia-300 font-semibold">Universidad Manuela Beltrán</span>.
                        I'm actively looking for a{" "}
                        <span className="text-fuchsia-300 font-semibold">developer internship</span>{" "}
                        to grow in a real engineering team.
                    </p>

                    <p className="text-indigo-200 text-sm sm:text-base mb-4">
                        I build fullstack applications with a strong interest in backend
                        and real-world systems. I work mainly with{" "}
                        <span className="text-fuchsia-300 font-semibold">React</span>,{" "}
                        <span className="text-fuchsia-300 font-semibold">Node.js</span>,{" "}
                        <span className="text-fuchsia-300 font-semibold">Java</span>, and{" "}
                        <span className="text-fuchsia-300 font-semibold">Spring Boot</span>.
                    </p>

                    <div className="mb-4 sm:mb-5">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-fuchsia-200 drop-shadow-neon mb-2">
                            Key Skills:
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-indigo-100 text-sm sm:text-base">
                            <li className="flex items-start">
                                <span className="text-fuchsia-400 mr-2">•</span>
                                Modern interfaces with React and TypeScript
                            </li>
                            <li className="flex items-start">
                                <span className="text-fuchsia-400 mr-2">•</span>
                                Backend APIs with Node.js and Spring Boot
                            </li>
                            <li className="flex items-start">
                                <span className="text-fuchsia-400 mr-2">•</span>
                                Relational databases (PostgreSQL, MySQL)
                            </li>
                            <li className="flex items-start">
                                <span className="text-fuchsia-400 mr-2">•</span>
                                REST API integration and Docker basics
                            </li>
                            <li className="flex items-start sm:col-span-2">
                                <span className="text-fuchsia-400 mr-2">•</span>
                                Teamwork and version control with Git
                            </li>
                        </ul>
                    </div>

                    <div className="text-center lg:text-right">
                        <a
                            href={CurriculumPDF}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs sm:text-sm text-fuchsia-300 hover:underline hover:text-fuchsia-200 transition-colors"
                        >
                            Want to see my CV? Open it here
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-center lg:text-right">
                <a
                    href="/faq"
                    className="text-xs sm:text-sm text-fuchsia-300 hover:underline hover:text-fuchsia-200 transition-colors"
                >
                    Have questions? Check the FAQs here
                </a>
            </div>

            <div className="mt-5 sm:mt-6 md:mt-8">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-fuchsia-200 drop-shadow-neon mb-2 sm:mb-3 text-center lg:text-left">
                    My Network
                </h3>
                <p className="text-indigo-200 mb-3 text-sm sm:text-base text-center lg:text-left">
                    Feel free to connect with these colleagues as well:
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                    <a
                        href="https://araque08.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-fuchsia-800/60 hover:bg-fuchsia-600 text-white px-4 py-2.5 rounded-lg shadow-md transition-all duration-200 text-sm sm:text-base text-center flex-1 sm:flex-none min-w-[200px] hover:scale-105"
                    >
                        Eng. Sebastian Araque – Frontend
                    </a>
                    <a
                        href="https://juancastro6208.github.io/portafolio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-fuchsia-800/60 hover:bg-fuchsia-600 text-white px-4 py-2.5 rounded-lg shadow-md transition-all duration-200 text-sm sm:text-base text-center flex-1 sm:flex-none min-w-[200px] hover:scale-105"
                    >
                        Eng. Juan Castro – Backend
                    </a>
                </div>
            </div>

        </div>
    );
};

export default AboutMe;
