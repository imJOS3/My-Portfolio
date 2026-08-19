import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FaGithub, FaTimes, FaExternalLinkAlt } from "react-icons/fa";

export interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
    demoLink?: string;
    type: string;
    category: string;
    technologies?: string[];
    highlights?: string[];
    imageScale?: number;
    status?: "wip" | "improve" | "done";
}

interface ProjectFloatWindowProps {
    project: Project | null;
    onClose: () => void;
}

const statusLabel = (status?: Project["status"]) => {
    if (status === "wip") return "In progress";
    if (status === "improve") return "Needs improvement";
    return null;
};

const ProjectFloatWindow = ({ project, onClose }: ProjectFloatWindowProps) => {
    useEffect(() => {
        if (!project) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        const scrollY = window.scrollY;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const { body, documentElement: html } = document;
        const prevBodyOverflow = body.style.overflow;
        const prevBodyPaddingRight = body.style.paddingRight;

        html.classList.add("modal-lock");
        body.style.overflow = "hidden";
        if (scrollbarWidth > 0) {
            body.style.paddingRight = `${scrollbarWidth}px`;
        }
        html.scrollTop = scrollY;
        window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });

        const preventTouchScroll = (e: TouchEvent) => {
            const target = e.target as HTMLElement | null;
            if (target?.closest("[data-modal-scroll]")) return;
            e.preventDefault();
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("touchmove", preventTouchScroll, { passive: false });

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("touchmove", preventTouchScroll);

            html.style.scrollSnapType = "none";
            html.style.scrollBehavior = "auto";
            html.classList.remove("modal-lock");
            body.style.overflow = prevBodyOverflow;
            body.style.paddingRight = prevBodyPaddingRight;

            html.scrollTop = scrollY;
            window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });

            requestAnimationFrame(() => {
                html.scrollTop = scrollY;
                window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
                requestAnimationFrame(() => {
                    html.style.removeProperty("scroll-snap-type");
                    html.style.removeProperty("scroll-behavior");
                });
            });
        };
    }, [project, onClose]);

    if (!project) return null;

    const status = statusLabel(project.status);
    const fileName = project.title.toLowerCase().replace(/\s+/g, "-");

    const modal = (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={onClose}
        >
            <div className="absolute inset-0 themed-modal-overlay backdrop-blur-md" />

            <div
                className="project-modal relative z-10 flex w-full max-w-5xl max-h-[88vh] flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="home-terminal-bar shrink-0">
                    <span className="home-terminal-dot bg-rose-400" />
                    <span className="home-terminal-dot bg-amber-300" />
                    <span className="home-terminal-dot bg-emerald-400" />
                    <span className="ml-2 truncate font-mono text-[11px] themed-text-muted">
                        {fileName}
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] shadow-[0_0_12px_color-mix(in_srgb,var(--accent-cyan)_50%,transparent)] transition hover:bg-[var(--accent-cyan)] hover:text-[var(--surface-solid)]"
                    >
                        <FaTimes className="text-xs" />
                    </button>
                </div>

                <div className="grid min-h-0 flex-1 grid-rows-[minmax(11rem,32vh)_minmax(0,1fr)] overflow-hidden lg:grid-cols-[1.08fr_0.92fr] lg:grid-rows-1">
                    <div className="relative min-h-[180px] overflow-hidden sm:min-h-[240px] lg:min-h-0">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover"
                            style={
                                project.imageScale
                                    ? { transform: `scale(${project.imageScale})` }
                                    : undefined
                            }
                            loading="lazy"
                        />
                        <div className="project-modal-veil pointer-events-none absolute inset-0" />
                        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                            <span className="rounded-full themed-badge border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm sm:text-xs">
                                {project.type}
                            </span>
                            {status && (
                                <span className="rounded-full border border-cyan-300/40 bg-violet-700/85 px-2.5 py-1 text-[10px] font-semibold text-white sm:text-xs">
                                    {status}
                                </span>
                            )}
                        </div>
                    </div>

                    <div
                        className="min-h-0 overflow-y-auto p-4 sm:p-6"
                        data-modal-scroll
                    >
                        <p className="section-kicker mb-1">Inspect · {project.category}</p>
                        <h3
                            id="project-modal-title"
                            className="themed-accent-text text-2xl font-extrabold leading-tight sm:text-3xl"
                        >
                            {project.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed themed-text-secondary">
                            {project.description}
                        </p>

                        {project.technologies && project.technologies.length > 0 && (
                            <div className="mt-5">
                                <p className="section-kicker mb-2">Stack</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="themed-pill rounded-lg border px-2.5 py-1 text-xs"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.highlights && project.highlights.length > 0 && (
                            <div className="mt-5">
                                <p className="section-kicker mb-2">Highlights</p>
                                <ol className="space-y-2">
                                    {project.highlights.map((point, i) => (
                                        <li key={point} className="flex gap-3 text-sm themed-text-secondary">
                                            <span className="mt-0.5 font-mono text-[11px] themed-text-label">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}

                        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent-cyan)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-cyan)] shadow-[0_0_14px_color-mix(in_srgb,var(--accent-cyan)_35%,transparent)] transition hover:bg-[var(--accent-cyan)] hover:text-[var(--surface-solid)]"
                            >
                                <FaGithub />
                                View code
                            </a>
                            {project.demoLink && (
                                <a
                                    href={project.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="themed-btn-gradient inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold"
                                >
                                    <FaExternalLinkAlt className="text-xs" />
                                    View demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modal, document.body);
};

export default ProjectFloatWindow;
