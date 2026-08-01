import { FaJava } from "react-icons/fa";
import { SiHtml5, SiJavascript, SiGooglecloud, SiCisco } from "react-icons/si";
import htmlJavascript from "../../assets/certificates/DISEÑAR_PÁGINAS _WEB_CON_HTML_Y_JAVASCRIP_certificado.pdf";
import javaBasico from "../../assets/certificates/FUNDAMENTOS BASICOS EN PROGRAMACIÓN JAVA.pdf";
import javaOracle from "../../assets/certificates/Java-oaracle_certificado.pdf";

type Certificate = {
    title: string;
    issuer: string;
    date: string;
    icon: JSX.Element;
    pdf?: string;
    link?: string;
};

const Certificates = () => {
    const certificates: Certificate[] = [
        {
            title: "Fundamentos Básicos en Programación Java",
            issuer: "SENA",
            date: "Julio 2020",
            icon: <FaJava className="text-orange-400" />,
            pdf: javaBasico,
        },
        {
            title: "Diseñar Páginas Web con HTML y JavaScript",
            issuer: "SENA",
            date: "Septiembre 2020",
            icon: (
                <span className="flex items-center gap-1">
                    <SiHtml5 className="text-orange-400" />
                    <SiJavascript className="text-yellow-300" />
                </span>
            ),
            pdf: htmlJavascript,
        },
        {
            title: "Java Fundamentals",
            issuer: "Oracle",
            date: "Noviembre 2023",
            icon: <FaJava className="text-orange-400" />,
            pdf: javaOracle,
        },
        {
            title: "Google Cloud Computing Foundations",
            issuer: "Google Cloud",
            date: "2024",
            icon: <SiGooglecloud className="text-blue-300" />,
            link: "https://www.credly.com/badges/a9c90e14-bf32-4a01-b080-17216ac6ce1e",

        },
        {
            title: "Ethical Hacker",
            issuer: "Cisco",
            date: "2026",
            icon: <SiCisco className="text-sky-400 text-5xl" />,
            link: "https://www.credly.com/badges/b5c3fa5a-e025-488a-b84d-3130def6589b",

        },
    ];

    return (
        <div
            className="min-h-screen p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center"
        >
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-fuchsia-300 drop-shadow-neon">
                    Certificados & Logros
                </h1>

                <p className="text-indigo-200 mt-3">
                    Certificaciones que respaldan mis conocimientos en desarrollo
                    de software y ciberseguridad.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-5 sm:gap-6 w-full max-w-6xl">

                {certificates.map((cert, index) => (
                    <div
                        key={index}
                        onClick={() => window.open(cert.link ?? cert.pdf, "_blank")}
                        className="group relative bg-black/70 backdrop-blur-md rounded-2xl border border-fuchsia-500/30 p-4 sm:p-5 hover:scale-105 hover:border-fuchsia-400 transition-all duration-300 shadow-xl w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-sm cursor-pointer"
                    >

                        <div className="flex justify-center mb-3 sm:mb-4">
                            <div className="w-12 h-12 rounded-xl bg-fuchsia-500/20 flex items-center justify-center text-2xl">
                                {cert.icon}
                            </div>
                        </div>

                        <h3 className="text-base sm:text-lg text-center font-bold text-fuchsia-200 mb-3 min-h-[3rem] flex items-center justify-center">
                            {cert.title}
                        </h3>

                        <div className="space-y-1.5 mb-4 text-sm sm:text-base">
                            <p className="text-indigo-200">
                                <span className="font-semibold">🏢 </span>
                                {cert.issuer}
                            </p>

                            <p className="text-indigo-200">
                                <span className="font-semibold">📅 </span>
                                {cert.date}
                            </p>
                        </div>

                        <div className="text-center">
                            <a
                                href={cert.link ?? cert.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
                                className="text-xs sm:text-sm text-fuchsia-300 group-hover:text-fuchsia-200 group-hover:underline transition-colors"
                            >
                                Ver certificado →
                            </a>
                        </div>

                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 w-full max-w-5xl">

                <div className="bg-black/50 rounded-xl p-4 text-center border border-fuchsia-500/20">
                    <h2 className="text-3xl font-bold text-fuchsia-300">
                        {certificates.length}
                    </h2>
                    <p className="text-indigo-200">Certificados</p>
                </div>

                <div className="bg-black/50 rounded-xl p-4 text-center border border-fuchsia-500/20">
                    <h2 className="text-3xl font-bold text-fuchsia-300">
                        {new Set(certificates.map(c => c.issuer)).size}
                    </h2>
                    <p className="text-indigo-200">Instituciones</p>
                </div>

                <div className="bg-black/50 rounded-xl p-4 text-center border border-fuchsia-500/20">
                    <h2 className="text-3xl font-bold text-fuchsia-300">
                        2020-2026
                    </h2>
                    <p className="text-indigo-200">Periodo</p>
                </div>

                <div className="bg-black/50 rounded-xl p-4 text-center border border-fuchsia-500/20">
                    <h2 className="text-3xl font-bold text-fuchsia-300">
                        100%
                    </h2>
                    <p className="text-indigo-200">Completados</p>
                </div>

            </div>
        </div>
    );
};

export default Certificates;