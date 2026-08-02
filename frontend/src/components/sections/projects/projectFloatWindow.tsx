import { useEffect } from "react";
import { createPortal } from "react-dom";

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
    /** Escala > 1 para acercar y ocultar bordes de la captura */
    imageScale?: number;
    /** Estado visual: en proceso / por mejorar / listo */
    status?: "wip" | "improve" | "done";
}

interface ProjectFloatWindowProps {
    project: Project | null;
    onClose: () => void;
}

const ProjectFloatWindow = ({ project, onClose }: ProjectFloatWindowProps) => {
    useEffect(() => {
        if (!project) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        // Bloquear scroll de la página (mantener posición)
        const scrollY = window.scrollY;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const { body, documentElement: html } = document;

        const prevBodyOverflow = body.style.overflow;
        const prevBodyPaddingRight = body.style.paddingRight;
        const prevBodyPosition = body.style.position;
        const prevBodyTop = body.style.top;
        const prevBodyWidth = body.style.width;
        const prevHtmlOverflow = html.style.overflow;

        body.style.overflow = "hidden";
        html.style.overflow = "hidden";
        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.width = "100%";
        if (scrollbarWidth > 0) {
            body.style.paddingRight = `${scrollbarWidth}px`;
        }

        const preventTouchScroll = (e: TouchEvent) => {
            // Permitir scroll solo dentro del contenido del modal
            const target = e.target as HTMLElement | null;
            if (target?.closest("[data-modal-scroll]")) return;
            e.preventDefault();
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("touchmove", preventTouchScroll, { passive: false });

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("touchmove", preventTouchScroll);

            body.style.overflow = prevBodyOverflow;
            body.style.paddingRight = prevBodyPaddingRight;
            body.style.position = prevBodyPosition;
            body.style.top = prevBodyTop;
            body.style.width = prevBodyWidth;
            html.style.overflow = prevHtmlOverflow;

            window.scrollTo(0, scrollY);
        };
    }, [project, onClose]);

    if (!project) return null;

    const modal = (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 animate-[fadeIn_0.2s_ease-out]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={onClose}
        >
            {/* Fondo: click fuera cierra */}
            <div className="absolute inset-0 themed-modal-overlay backdrop-blur-md" />

            {/* Ventana emergente */}
            <div
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl border themed-modal-surface animate-[scaleIn_0.25s_ease-out]"
                data-modal-scroll
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full themed-surface text-[var(--text-primary)] hover:border-cyan-400/50 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
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
                    <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, var(--surface-solid), transparent, transparent)" }}
                    />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-2">
                        <span className="rounded-full themed-badge border px-3 py-1 text-xs sm:text-sm font-semibold backdrop-blur-sm">
                            {project.type}
                        </span>
                        {(project.status === "wip" || project.status === "improve") && (
                            <span className="rounded-full bg-violet-600/90 text-white border border-cyan-400/40 px-3 py-1 text-xs sm:text-sm font-semibold backdrop-blur-sm shadow-[0_0_10px_rgba(34,211,238,0.35)]">
                                {project.status === "wip" ? "In progress" : "Needs improvement"}
                            </span>
                        )}
                    </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                    <h3
                        id="project-modal-title"
                        className="text-xl sm:text-2xl md:text-3xl font-extrabold themed-text-primary drop-shadow-[0_0_12px_var(--accent-purple)] leading-tight"
                    >
                        {project.title}
                    </h3>

                    <p className="mt-2 sm:mt-3 text-sm sm:text-base themed-text-secondary leading-relaxed">
                        {project.description}
                    </p>

                    {project.technologies && project.technologies.length > 0 && (
                        <div className="mt-4 sm:mt-5">
                            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider themed-glow-text mb-2">
                                Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full themed-pill border px-3 py-1 text-xs sm:text-sm backdrop-blur-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {project.highlights && project.highlights.length > 0 && (
                        <div className="mt-4 sm:mt-5">
                            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider themed-glow-text mb-2">
                                Highlights
                            </h4>
                            <ul className="space-y-1.5">
                                {project.highlights.map((point, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm sm:text-base themed-text-secondary">
                                        <span
                                            className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--accent-gradient)" }}
                                        />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 rounded-xl themed-pill border px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold themed-text-primary hover:opacity-80 transition-opacity"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.15 0 1.56-.01 2.81-.01 3.19 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
                            </svg>
                            View code
                            </a>

                        {project.demoLink && (
                            <a
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 rounded-xl themed-btn-gradient px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-[var(--glow-strong)] hover:opacity-90 transition-opacity"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H18m0 0v4.5M18 6l-8 8M6 12v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4" />
                                </svg>
                                View demo
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </div>
    );

    return createPortal(modal, document.body);
};

export default ProjectFloatWindow;
