import { useState } from "react";
import ProjectCarousel from "./ProjectCarousel";
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

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
    };

    const handleClose = () => {
        setSelectedProject(null);
    };

    const typeStats = Object.entries(
        projectList.reduce<Record<string, number>>((acc, project) => {
            const key = project.type || project.category;
            acc[key] = (acc[key] ?? 0) + 1;
            return acc;
        }, {})
    )
        .filter(([, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);

    return (
        <>
            <div
                className="min-h-screen w-full flex flex-col items-center justify-center gap-4 sm:gap-6 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-24 py-6 sm:py-10 md:py-14 scroll-mt-[50vh] overflow-y-auto"
            >
                <div className="text-center w-full max-w-7xl">
                    <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 sm:mb-4 themed-accent-text drop-shadow-[0_0_16px_var(--accent-cyan)] leading-tight break-words">
                        My Projects
                    </h2>
                    <p className="themed-text-secondary text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2">
                        A selection of my latest work in web development and fullstack applications
                    </p>
                </div>

                <div className="themed-surface backdrop-blur-md rounded-2xl px-4 sm:px-6 py-2 sm:py-3">
                    <p className="themed-text-primary text-xs sm:text-sm md:text-base">
                        Showing <span className="themed-glow-text font-bold">{projectList.length}</span> featured projects
                    </p>
                </div>

                <div className="w-full max-w-7xl">
                    <ProjectCarousel projects={projectList} onProjectClick={handleProjectClick} />
                </div>

                {typeStats.length > 0 && (
                    <div className="hidden lg:block w-full max-w-4xl">
                        <div
                            className="grid gap-3 xl:gap-4 text-center"
                            style={{ gridTemplateColumns: `repeat(${typeStats.length}, minmax(0, 1fr))` }}
                        >
                            {typeStats.map(([label, count]) => (
                                <div key={label} className="themed-surface rounded-xl p-2 xl:p-3">
                                    <div className="themed-glow-text font-bold text-base xl:text-lg">
                                        {count}
                                    </div>
                                    <div className="themed-text-secondary text-xs xl:text-sm">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <ProjectFloatWindow project={selectedProject} onClose={handleClose} />
        </>
    );
};

export default Projects;
