import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProjectFloatWindow, { Project } from "./projectFloatWindow";
import ecoturismoImg from "../../../assets/projects/ecoturismo.png";
import oldWestImg from "../../../assets/projects/old-west.png";
import bingoOnlineImg from "../../../assets/projects/bingo-online.png";
import projectWipImg from "../../../assets/projects/project-wip.png";

const projectList: Project[] = [
    {
        title: "EcoTurismo",
        description:
            "An ecotourism booking platform inspired by Airbnb/Booking. Hosts publish stays and units, while travelers explore, book, and leave reviews, with role-based dashboards for each user type.",
        image: ecoturismoImg,
        imageScale: 1.12,
        link: "https://github.com/imJOS3/ECOTURIOSMO-WEB-APP-",
        type: "Fullstack",
        category: "Fullstack",
        technologies: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Zustand", "Redis"],
        highlights: [
            "Role-based dashboards for tourists, hosts, and admins",
            "Centralized JWT auth and global state with Zustand",
            "Multi-image upload with preview before publishing",
            "Modular backend (auth, bookings, payments, reviews, moderation)",
        ],
    },
    {
        title: "Old West",
        description:
            "A web platform for a barbershop that digitizes daily operations: clients book appointments online by choosing a service and available slot, while the owner manages staff, shifts, and the schedule from a private dashboard.",
        image: oldWestImg,
        imageScale: 1.1,
        link: "https://github.com/imJOS3/old-west-",
        type: "Fullstack",
        category: "Fullstack",
        technologies: ["Next.js", "TypeScript", "Prisma"],
        highlights: [
            "Online appointment booking for barbershop clients",
            "Staff and work-shift management panel",
            "End-to-end typed relational database with Prisma + TypeScript",
            "Built on Next.js for a fast frontend with strong SEO",
        ],
    },
    {
        title: "Bingo Online",
        description:
            "A real-time multiplayer bingo game with interactive cards, a match countdown, chat, player and winner lists, and on-screen win patterns such as completing a column.",
        image: bingoOnlineImg,
        imageScale: 1.1,
        link: "https://github.com/imJOS3/BINGO-2",
        type: "Fullstack",
        category: "Fullstack",
        technologies: ["Preact", "Vite", "Tailwind", "Socket.io", "Zustand", "Axios"],
        highlights: [
            "Real-time matches with Socket.io",
            "Interactive 5x5 card with FREE cell and B-I-N-G-O letters",
            "Live players panel, winners list, and chat",
            "Target-pattern indicator and end-of-match timer",
        ],
    },
    {
        title: "NexusFlow",
        description:
            "A modular SaaS business-management platform that centralizes CRM, bookings, inventory, analytics, and automations in one dashboard, designed to scale as a multi-module product.",
        image: projectWipImg,
        status: "wip",
        link: "https://github.com/imJOS3/nexusflow",
        type: "SaaS",
        category: "Fullstack",
        technologies: ["Next.js 14", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "Redis", "Docker"],
        highlights: [
            "8 integrated business modules: CRM, bookings, inventory, finance, support, and more",
            "Scalable monorepo with Turborepo and pnpm workspaces",
            "JWT authentication and role-based access control (RBAC)",
            "Production-ready infrastructure with Docker and GitHub Actions CI",
        ],
    },
    {
        title: "Battio Lab",
        description:
            "A REST API for the day-to-day operations of an electric scooter workshop: employee and system-user management, with spare-parts inventory and maintenance coming next.",
        image: projectWipImg,
        status: "improve",
        link: "https://github.com/imJOS3/battio-lab",
        type: "Backend",
        category: "Backend",
        technologies: ["Python", "Flask", "MySQL"],
        highlights: [
            "REST API built with Flask following modular best practices",
            "Employee and user management with system roles",
            "Relational MySQL data model ready to grow into inventory and maintenance",
            "Clear roadmap: JWT auth and frontend integration",
        ],
    },
    {
        title: "Event Agency — ERP",
        description:
            "A collaborative ERP to manage an event agency end to end: clients and contracts, rental inventory, invoicing, accounting, and a portal where clients can hire services directly.",
        image: projectWipImg,
        status: "wip",
        link: "https://github.com/imJOS3/Event-Agency-msvc",
        type: "ERP",
        category: "Fullstack",
        technologies: ["Java 21", "Spring Boot", "Node.js", "React", "Vite", "MySQL", "Docker"],
        highlights: [
            "5 business modules: clients, inventory, invoicing, accounting, and client portal",
            "Hybrid architecture: Spring Boot microservices + Node.js/Express BFF",
            "Containerized with Docker Compose for consistent deployments",
            "Built as a team with solid Git version-control practices",
        ],
    },
];

const statusLabel = (status?: Project["status"]) => {
    if (status === "wip") return "In progress";
    if (status === "improve") return "Needs improvement";
    return null;
};

const Projects = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [shift, setShift] = useState(9.2);
    const touchX = useRef<number | null>(null);
    const project = projectList[activeIndex];
    const status = statusLabel(project.status);

    const go = (dir: -1 | 1) => {
        setActiveIndex((i) => (i + dir + projectList.length) % projectList.length);
    };

    useEffect(() => {
        const updateShift = () => {
            const width = window.innerWidth;
            setShift(width < 640 ? 5.1 : width < 1024 ? 7.2 : 9.2);
        };
        updateShift();
        window.addEventListener("resize", updateShift);
        return () => window.removeEventListener("resize", updateShift);
    }, []);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            const section = document.getElementById("projects");
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const onScreen = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
            if (!onScreen) return;
            if (event.key === "ArrowRight") go(1);
            if (event.key === "ArrowLeft") go(-1);
            if (event.key === "Enter") setSelectedProject(projectList[activeIndex]);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [activeIndex]);

    return (
        <>
            <div className="relative flex h-full w-full min-h-0 flex-col overflow-hidden pt-6 sm:pt-8 lg:pt-10 pb-8 lg:pb-12">
                <div className="flex h-full min-h-0 flex-col">
                    <div className="flex shrink-0 items-end justify-between gap-3">
                        <div>
                            <p className="section-kicker">02 — Work</p>
                            <h2 className="themed-accent-text text-[clamp(1.35rem,3vw,2.1rem)] font-extrabold leading-tight">
                                Featured projects
                            </h2>
                        </div>
                        <p className="font-mono text-xs themed-text-secondary tabular-nums">
                            {String(activeIndex + 1).padStart(2, "0")}
                            <span className="themed-text-muted"> / {String(projectList.length).padStart(2, "0")}</span>
                        </p>
                    </div>

                    <div
                        className="relative min-h-0 flex-1"
                        onTouchStart={(event) => {
                            touchX.current = event.touches[0].clientX;
                        }}
                        onTouchEnd={(event) => {
                            if (touchX.current == null) return;
                            const dx = event.changedTouches[0].clientX - touchX.current;
                            if (dx > 48) go(-1);
                            if (dx < -48) go(1);
                            touchX.current = null;
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => go(-1)}
                            className="absolute left-8 top-1/2 z-30 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[var(--accent-cyan)] bg-[var(--bg-base)] text-[var(--accent-cyan)] shadow-[0_0_18px_color-mix(in_srgb,var(--accent-cyan)_60%,transparent)] transition-colors hover:bg-[var(--accent-cyan)] hover:text-[var(--surface-solid)] sm:flex"
                            aria-label="Previous project"
                        >
                            <FaChevronLeft className="text-sm" />
                        </button>

                        <div className="project-stage h-full w-full">
                            {projectList.map((item, index) => {
                                const offset = index - activeIndex;
                                const abs = Math.abs(offset);
                                if (abs > 2) return null;
                                const active = offset === 0;
                                return (
                                    <button
                                        key={item.title}
                                        type="button"
                                        onClick={() => {
                                            if (active) setSelectedProject(item);
                                            else setActiveIndex(index);
                                        }}
                                        className="project-card-3d absolute left-1/2 top-1/2"
                                        style={{
                                            zIndex: 20 - abs,
                                            opacity: 1 - abs * 0.22,
                                            transform: `translate(-50%, -50%) translateX(${offset * shift}rem) rotateY(${offset * -32}deg) translateZ(${active ? 72 : -90}px) scale(${active ? 1 : 0.74})`,
                                            filter: active ? "none" : "brightness(0.55) saturate(0.8)",
                                        }}
                                        aria-label={active ? `Open ${item.title}` : `Show ${item.title}`}
                                    >
                                        <span className={`project-card-screen ${active ? "is-active" : ""}`}>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-full w-full object-cover"
                                                style={
                                                    item.imageScale
                                                        ? { transform: `scale(${item.imageScale})` }
                                                        : undefined
                                                }
                                            />
                                            {active && <span className="project-sheen" />}
                                        </span>
                                        {active && <span className="project-reflect" aria-hidden />}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={() => go(1)}
                            className="absolute right-8 top-1/2 z-30 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[var(--accent-cyan)] bg-[var(--bg-base)] text-[var(--accent-cyan)] shadow-[0_0_18px_color-mix(in_srgb,var(--accent-cyan)_60%,transparent)] transition-colors hover:bg-[var(--accent-cyan)] hover:text-[var(--surface-solid)] sm:flex"
                            aria-label="Next project"
                        >
                            <FaChevronRight className="text-sm" />
                        </button>
                    </div>

                    <div className="relative z-20 mx-auto -mt-4 w-full max-w-3xl shrink-0 rounded-2xl themed-surface px-4 py-3 text-center backdrop-blur-md sm:-mt-6 sm:px-6">
                        <div className="mb-1 flex flex-wrap items-center justify-center gap-1.5">
                            <span className="rounded-full themed-badge border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                                {project.type}
                            </span>
                            {status && (
                                <span className="rounded-full border border-cyan-300/40 bg-violet-700/85 px-2 py-0.5 text-[10px] font-semibold text-white">
                                    {status}
                                </span>
                            )}
                        </div>
                        <h3 className="text-xl font-extrabold leading-tight themed-text-primary sm:text-3xl">
                            {project.title}
                        </h3>
                        <p className="mx-auto mt-1 max-w-2xl line-clamp-2 text-xs themed-text-secondary sm:text-sm">
                            {project.description}
                        </p>
                        {project.technologies && (
                            <div className="mt-2 hidden flex-wrap justify-center gap-1.5 sm:flex">
                                {project.technologies.slice(0, 5).map((tech) => (
                                    <span key={tech} className="themed-pill rounded-md border px-2 py-0.5 text-[10px]">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="themed-btn-gradient mt-3 rounded-xl px-5 py-2 text-sm font-bold shadow-lg"
                        >
                            Open details
                        </button>
                    </div>

                    <div className="mt-2 flex shrink-0 justify-center gap-1.5">
                        {projectList.map((item, index) => (
                            <button
                                key={item.title}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                className="h-1.5 rounded-full transition-all"
                                style={{
                                    width: index === activeIndex ? "1.4rem" : "0.4rem",
                                    background:
                                        index === activeIndex
                                            ? "var(--accent-gradient)"
                                            : "color-mix(in srgb, var(--text-muted) 45%, transparent)",
                                }}
                                aria-label={`Go to ${item.title}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <ProjectFloatWindow project={selectedProject} onClose={() => setSelectedProject(null)} />
        </>
    );
};

export default Projects;
