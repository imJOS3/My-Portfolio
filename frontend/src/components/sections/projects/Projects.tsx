import { useState } from "react";
import ProjectCarousel from "./ProjectCarousel";
import ProjectFloatWindow, { Project } from "./projectFloatWindow";

const projectList: Project[] = [
    {
        title: "EcoTurismo",
        description:
            "Plataforma de reservas de ecoturismo estilo Airbnb/Booking. Permite a anfitriones publicar alojamientos y unidades, y a turistas explorar, reservar y dejar reseñas, todo con paneles diferenciados según el rol del usuario.",
        image:
            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
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
        title: "NexusFlow",
        description:
            "Plataforma SaaS modular de gestión empresarial que centraliza CRM, reservas, inventario, analítica y automatizaciones en un solo panel, pensada para escalar como producto multi-módulo.",
        image:
            "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
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
        title: "Old West",
        description:
            "Plataforma web para una barbería, pensada para digitalizar la operación diaria del negocio: los clientes reservan su cita online eligiendo servicio y horario disponible, mientras que el dueño gestiona el personal, los turnos y la agenda desde un panel propio.",
        image:
            "https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f9?auto=format&fit=crop&w=800&q=80",
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
        title: "Battio Lab",
        description:
            "API REST para la gestión operativa de un taller de scooters eléctricas: control de empleados, usuarios del sistema y, próximamente, inventario de repuestos y mantenimiento.",
        image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
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
        image:
            "https://images.unsplash.com/photo-1518895312237-a9e23508077d?auto=format&fit=crop&w=800&q=80",
        link: "https://github.com/imJOS3/Agencia-de-eventos",
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

                <div className="hidden lg:block w-full max-w-4xl">
                    <div className="grid grid-cols-4 gap-3 xl:gap-4 text-center">
                        <div className="themed-surface rounded-xl p-2 xl:p-3">
                            <div className="themed-glow-text font-bold text-base xl:text-lg">
                                {projectList.filter((project) => project.category === "Frontend").length}
                            </div>
                            <div className="themed-text-secondary text-xs xl:text-sm">Frontend</div>
                        </div>
                        <div className="themed-surface rounded-xl p-2 xl:p-3">
                            <div className="themed-glow-text font-bold text-base xl:text-lg">
                                {projectList.filter((project) => project.category === "Backend").length}
                            </div>
                            <div className="themed-text-secondary text-xs xl:text-sm">Backend</div>
                        </div>
                        <div className="themed-surface rounded-xl p-2 xl:p-3">
                            <div className="themed-glow-text font-bold text-base xl:text-lg">
                                {projectList.filter((project) => project.category === "Fullstack").length}
                            </div>
                            <div className="themed-text-secondary text-xs xl:text-sm">Fullstack</div>
                        </div>
                        <div className="themed-surface rounded-xl p-2 xl:p-3">
                            <div className="themed-glow-text font-bold text-base xl:text-lg">
                                {projectList.filter((project) => project.category === "ERP").length}
                            </div>
                            <div className="themed-text-secondary text-xs xl:text-sm">ERP</div>
                        </div>
                    </div>
                </div>
            </div>

            <ProjectFloatWindow project={selectedProject} onClose={handleClose} />
        </>
    );
};

export default Projects;