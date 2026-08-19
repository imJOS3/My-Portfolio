import { Link } from "react-router-dom";
import ProfileImage from "../../assets/pfpPortfolio.png";
import CurriculumPDF from "../../assets/curriculum/JoseBenjumeaCV.pdf";

const facts = [
    { label: "Based in", value: "Bogotá" },
    { label: "University", value: "Manuela Beltrán" },
    { label: "Status", value: "Internship" },
];

const AboutMe = () => {
    return (
        <div className="relative flex h-full w-full min-h-0 flex-col justify-center gap-3 sm:gap-4">
            <div className="section-orb left-1/3 -top-8 h-40 w-40 bg-[var(--accent-fuchsia)]" />

            <div className="relative flex items-center gap-4 lg:grid lg:grid-cols-[0.34fr_0.66fr] lg:gap-8">
                <div className="w-24 shrink-0 sm:w-32 lg:w-full lg:max-w-[240px] lg:justify-self-center">
                    <div className="themed-surface rounded-2xl p-1.5 shadow-2xl lg:rotate-[-2deg] lg:p-2 lg:transition lg:hover:rotate-0">
                        <img
                            src={ProfileImage}
                            alt="Jose Benjumea"
                            className="aspect-[3/4] w-full rounded-xl object-cover"
                        />
                        <p className="hidden px-1 py-2 text-center font-mono text-[11px] themed-text-muted lg:block">
                            jose · final semesters
                        </p>
                    </div>
                </div>

                <div className="min-w-0">
                    <p className="section-kicker">03 — About</p>
                    <h2 className="themed-headline text-[clamp(1.25rem,3vw,2.2rem)] font-extrabold">
                        Engineer in the making
                    </h2>
                    <p className="mt-2 text-xs leading-relaxed themed-text-secondary sm:text-sm">
                        I'm <strong className="themed-text-primary">Jose Benjumea</strong>, a Software
                        Engineering student in my final semesters. I was born and raised in
                        Barranquilla and I live in Bogotá. I build fullstack products with a backend
                        focus — APIs, data models, and systems that hold up outside the classroom.
                        Main stack: React, Node.js, Java, and Spring Boot.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {facts.map((fact) => (
                    <div key={fact.label} className="themed-surface rounded-xl px-2 py-2 sm:px-3">
                        <p className="section-kicker !text-[9px] sm:!text-[10px]">{fact.label}</p>
                        <p className="mt-1 text-[11px] font-semibold themed-text-primary sm:text-sm">
                            {fact.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                <a
                    href={CurriculumPDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="themed-btn-gradient rounded-xl px-4 py-2 text-xs font-semibold sm:text-sm"
                >
                    Open CV
                </a>
                <Link
                    to="/faq"
                    className="themed-surface rounded-xl px-4 py-2 text-xs font-semibold themed-text-primary sm:text-sm"
                >
                    FAQs
                </Link>
            </div>

            <div>
                <p className="section-kicker mb-2">Also in my network</p>
                <div className="flex gap-2">
                    <a
                        href="https://araque08.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="themed-surface flex-1 rounded-xl px-3 py-2 text-center text-[11px] themed-text-secondary transition hover:border-[var(--surface-border-hover)] sm:text-sm"
                    >
                        Sebastian Araque · Frontend
                    </a>
                    <a
                        href="https://juancastro6208.github.io/portafolio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="themed-surface flex-1 rounded-xl px-3 py-2 text-center text-[11px] themed-text-secondary transition hover:border-[var(--surface-border-hover)] sm:text-sm"
                    >
                        Juan Castro · Backend
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
