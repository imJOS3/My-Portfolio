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
            "Plataforma de reservas de ecoturismo estilo Airbnb/Booking. Permite a anfitriones publicar alojamientos y unidades, y a turistas explorar, reservar y dejar reseñas, todo con paneles diferenciados según el rol del usuario.",
        image: ecoturismoImg,
        imageScale: 1.12,
        link: "https://github.com/imJOS3/ECOTURIOSMO-WEB-APP-",
        type: "Fullstack",
        category: "Fullstack",
        technologies: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Zustand", "Redis"],
        highlights: [
            "Paneles diferenciados por rol: turista, anfitrión y administrador",
            "Autenticación centralizada con JWT y manejo de estado global con Zustand",
            "Carga múltiple de imágenes con vista previa antes de publicar",
            "Arquitectura backend modular (auth, reservas, pagos, reseñas, moderación)",
        ],
    },
    {
        title: "Old West",
        description:
            "Plataforma web para una barbería, pensada para digitalizar la operación diaria del negocio: los clientes reservan su cita online eligiendo servicio y horario disponible, mientras que el dueño gestiona el personal, los turnos y la agenda desde un panel propio.",
        image: oldWestImg,
        imageScale: 1.1,
        link: "https://github.com/imJOS3/old-west-",
        type: "Fullstack",
        category: "Fullstack",
        technologies: ["Next.js", "TypeScript", "Prisma"],
        highlights: [
            "Sistema de reserva de citas online para los clientes de la barbería",
            "Panel de gestión de personal y turnos de trabajo",
            "Base de datos relacional tipada de extremo a extremo con Prisma + TypeScript",
            "Construido sobre Next.js para un frontend rápido y con buen SEO",
        ],
    },
    {
        title: "Bingo Online",
        description:
            "Juego de bingo multijugador en tiempo real: cartones interactivos, cuenta regresiva de partida, chat, listado de jugadores y ganadores, con patrones de victoria (como completar una columna) visibles en pantalla.",
        image: bingoOnlineImg,
        imageScale: 1.1,
        link: "https://github.com/imJOS3/BINGO-2",
        type: "Fullstack",
        category: "Fullstack",
        technologies: ["Preact", "Vite", "Tailwind", "Socket.io", "Zustand", "Axios"],
        highlights: [
            "Partidas en tiempo real con Socket.io",
            "Cartón interactivo 5x5 con casilla FREE y letras B-I-N-G-O",
            "Panel de jugadores, ganadores y chat en vivo",
            "Indicador de patrón objetivo y temporizador de fin de partida",
        ],
    },
    {
        title: "NexusFlow",
        description:
            "Plataforma SaaS modular de gestión empresarial que centraliza CRM, reservas, inventario, analítica y automatizaciones en un solo panel, pensada para escalar como producto multi-módulo.",
        image: projectWipImg,
        status: "wip",
        link: "https://github.com/imJOS3/nexusflow",
        type: "SaaS",
        category: "Fullstack",
        technologies: ["Next.js 14", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "Redis", "Docker"],
        highlights: [
            "8 módulos de negocio integrados: CRM, reservas, inventario, finanzas, soporte y más",
            "Monorepo escalable con Turborepo y pnpm workspaces",
            "Autenticación con JWT y control de acceso basado en roles (RBAC)",
            "Infraestructura lista para producción con Docker y CI en GitHub Actions",
        ],
    },
    {
        title: "Battio Lab",
        description:
            "API REST para la gestión operativa de un taller de scooters eléctricas: control de empleados, usuarios del sistema y, próximamente, inventario de repuestos y mantenimiento.",
        image: projectWipImg,
        status: "improve",
        link: "https://github.com/imJOS3/battio-lab",
        type: "Backend",
        category: "Backend",
        technologies: ["Python", "Flask", "MySQL"],
        highlights: [
            "API REST construida con Flask siguiendo buenas prácticas de organización por módulos",
            "Gestión de empleados y usuarios con roles del sistema",
            "Modelo de datos relacional en MySQL, listo para escalar a inventario y mantenimiento",
            "Roadmap definido: autenticación JWT y conexión con frontend",
        ],
    },
    {
        title: "Agencia de Eventos — ERP",
        description:
            "Sistema ERP colaborativo para gestionar una agencia de eventos de punta a punta: clientes y contratos, inventario de alquiler, facturación, contabilidad y un portal para que los clientes contraten servicios directamente.",
        image: projectWipImg,
        status: "wip",
        link: "https://github.com/imJOS3/Event-Agency-msvc",
        type: "ERP",
        category: "Fullstack",
        technologies: ["Java 21", "Spring Boot", "Node.js", "React", "Vite", "MySQL", "Docker"],
        highlights: [
            "5 módulos de negocio: clientes, inventario, facturación, contabilidad y portal del cliente",
            "Arquitectura híbrida: microservicios en Spring Boot + BFF en Node.js/Express",
            "Contenedorizado con Docker Compose para despliegue consistente",
            "Desarrollado en equipo, aplicando buenas prácticas de control de versiones con Git",
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
                        Mis Proyectos
                    </h2>
                    <p className="themed-text-secondary text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2">
                        Descubre mis trabajos más recientes en desarrollo web y aplicaciones móviles
                    </p>
                </div>

                <div className="themed-surface backdrop-blur-md rounded-2xl px-4 sm:px-6 py-2 sm:py-3">
                    <p className="themed-text-primary text-xs sm:text-sm md:text-base">
                        Mostrando <span className="themed-glow-text font-bold">{projectList.length}</span> proyectos destacados
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
