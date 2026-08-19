import { FaJava, FaExternalLinkAlt } from "react-icons/fa";
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

const certificates: Certificate[] = [
    {
        title: "Java Programming Fundamentals",
        issuer: "SENA",
        date: "July 2020",
        icon: <FaJava className="text-orange-400" />,
        pdf: javaBasico,
    },
    {
        title: "Web Design with HTML and JavaScript",
        issuer: "SENA",
        date: "September 2020",
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
        date: "November 2023",
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
        icon: <SiCisco className="text-sky-400 text-2xl" />,
        link: "https://www.credly.com/badges/b5c3fa5a-e025-488a-b84d-3130def6589b",
    },
];

const Certificates = () => {
    return (
        <div className="flex h-full w-full min-h-0 flex-col justify-center gap-4 pt-5 sm:pt-8">
            <div>
                <p className="section-kicker">05 — Proof</p>
                <h2 className="themed-accent-text text-[clamp(1.35rem,3vw,2.1rem)] font-extrabold leading-tight">
                    Certificates
                </h2>
                <p className="mt-1 text-xs themed-text-muted sm:text-sm">
                    Click a row to open the diploma or Credly badge.
                </p>
            </div>

            <ul className="flex flex-col gap-2">
                {certificates.map((cert) => (
                    <li key={cert.title}>
                        <a
                            href={cert.link ?? cert.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="themed-surface flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:border-[var(--surface-border-hover)] sm:gap-4 sm:px-5"
                        >
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--pill-bg)] text-xl">
                                {cert.icon}
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block truncate font-semibold themed-text-primary sm:text-lg">
                                    {cert.title}
                                </span>
                                <span className="text-xs themed-text-muted sm:text-sm">
                                    {cert.issuer}
                                </span>
                            </span>
                            <span className="hidden shrink-0 text-sm themed-text-secondary sm:block">
                                {cert.date}
                            </span>
                            <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold themed-text-label sm:text-sm">
                                View
                                <FaExternalLinkAlt className="text-[10px]" />
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Certificates;
