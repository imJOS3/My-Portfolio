// src/pages/Skills.tsx
import {
    SiHtml5, SiCss3, SiJavascript, SiReact, SiTypescript, SiTailwindcss, SiNextdotjs,
    SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiGit, SiPython, SiDocker, SiFigma, SiLinux,
    SiMysql, SiAmazon, SiKubernetes, SiGooglecloud, SiAngular, SiApachekafka, SiSpringboot
} from "react-icons/si";
import { FaJava, FaMicrosoft } from "react-icons/fa";

const frontend = [
    { name: "HTML", icon: <SiHtml5 className="text-orange-400" /> },
    { name: "CSS", icon: <SiCss3 className="text-blue-400" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-300" /> },
    { name: "React", icon: <SiReact className="text-cyan-300" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-300" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-300" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    { name: "Angular", icon: <SiAngular className="text-red-500" /> },
];

const backend = [
    { name: "Node.js", icon: <SiNodedotjs className="text-green-400" /> },
    { name: "Express", icon: <SiExpress className="text-gray-200" /> },
    { name: "Python", icon: <SiPython className="text-yellow-400" /> },
    { name: "Java", icon: <FaJava className="text-orange-400" /> },
    { name: "Spring Boot", icon: <SiSpringboot className="text-green-300" /> },
    { name: "Kafka", icon: <SiApachekafka className="text-gray-300" /> },
    { name: "Microservicios", icon: <SiSpringboot className="text-green-400" /> },
];

const databases = [
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
    { name: "MySQL", icon: <SiMysql className="text-blue-300" /> },
];

const cloud = [
    { name: "AWS", icon: <SiAmazon className="text-yellow-300" /> },
    { name: "Azure", icon: <FaMicrosoft className="text-blue-400" /> },
    { name: "Google Cloud", icon: <SiGooglecloud className="text-blue-300" /> },
    { name: "Kubernetes", icon: <SiKubernetes className="text-blue-400" /> },
];

const tools = [
    { name: "Git", icon: <SiGit className="text-orange-500" /> },
    { name: "Docker", icon: <SiDocker className="text-blue-300" /> },
    { name: "Figma", icon: <SiFigma className="text-pink-400" /> },
    { name: "Linux", icon: <SiLinux className="text-yellow-200" /> },
];

const SectionTitle = ({ title }: { title: string }) => (
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-fuchsia-200 mb-3 text-center">
        {title}
    </h2>
);

const SectionBox = ({ items, fit = false }: { items: { name: string, icon: JSX.Element }[], fit?: boolean }) => (
    <div className={`bg-black/70 backdrop-blur-md rounded-2xl border border-fuchsia-400/40 shadow-2xl p-3 sm:p-4 ${fit ? "inline-block w-fit mx-auto" : "w-full"}`}>
        <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {items.map((skill, idx) => (
                <li
                    key={idx}
                    className="relative flex flex-col items-center justify-center w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-white/10 rounded-lg shadow border border-fuchsia-400/30 hover:scale-110 transition-all duration-300 group"
                    title={skill.name}
                >
                    <span className="text-xl xs:text-2xl sm:text-3xl drop-shadow-neon">
                        {skill.icon}
                    </span>
                    {/* Tooltip para móviles */}
                    <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <span className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            {skill.name}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

const Section = ({ title, items, fit = false }: { title: string, items: { name: string, icon: JSX.Element }[], fit?: boolean }) => (
    <div className="w-full text-center">
        <SectionTitle title={title} />
        <SectionBox items={items} fit={fit} />
    </div>
);

const Skills = () => (
    <div
        className="min-h-screen p-3 sm:p-4 md:p-6 flex flex-col justify-center items-center scroll-mt-[50vh] w-full"
    >
        {/* Título Principal */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-fuchsia-300 mb-2 drop-shadow-neon">
                Habilidades Técnicas
            </h1>
            <p className="text-indigo-200 text-sm sm:text-base max-w-2xl">
                Tecnologías y herramientas que utilizo para crear soluciones innovadoras
            </p>
        </div>

        {/* Grid de Habilidades */}
        <div className="w-full max-w-7xl flex-grow">
            {/* Vista móvil/tablet: apilado simple con título+caja juntos */}
            <div className="grid grid-cols-1 lg:hidden gap-4 sm:gap-6 p-2 sm:p-4">
                <Section title="Frontend" items={frontend} />
                <Section title="Backend" items={backend} />
                <Section title="Bases de Datos" items={databases} />
                <Section title="Cloud & DevOps" items={cloud} />
                <Section title="Herramientas" items={tools} />
            </div>

            {/* Vista PC: títulos y cajas en filas separadas para que los títulos se alineen a la misma altura */}
            <div className="hidden lg:block p-2 sm:p-4">
                {/* Fila 1: Frontend / Cloud & DevOps */}
                <div className="grid grid-cols-2 gap-8">
                    <SectionTitle title="Frontend" />
                    <SectionTitle title="Cloud & DevOps" />
                </div>
                <div className="grid grid-cols-2 gap-8 items-center">
                    <SectionBox items={frontend} />
                    <SectionBox items={cloud} />
                </div>

                {/* Fila 2: Backend / Herramientas */}
                <div className="grid grid-cols-2 gap-8 mt-8">
                    <SectionTitle title="Backend" />
                    <SectionTitle title="Herramientas" />
                </div>
                <div className="grid grid-cols-2 gap-8 items-center">
                    <SectionBox items={backend} />
                    <SectionBox items={tools} />
                </div>
            </div>

            {/* Bases de Datos: solo en vista PC, fila propia centrada debajo de ambas columnas */}
            <div className="hidden lg:flex justify-center mt-4 sm:mt-6 md:mt-8 px-2 sm:px-4">
                <div className="w-full max-w-md lg:max-w-lg">
                    <Section title="Bases de Datos" items={databases} />
                </div>
            </div>
        </div>

        {/* Indicador para móviles */}
        <div className="lg:hidden mt-6 text-center">
            <p className="text-indigo-300 text-xs sm:text-sm">
                👆 Toca los iconos para ver los nombres
            </p>
        </div>

        {/* Contador de habilidades */}
        <div className="mt-6 sm:mt-8 text-center">
            <div className="bg-black/50 backdrop-blur-md rounded-xl border border-fuchsia-400/20 px-4 py-2">
                <p className="text-fuchsia-200 text-sm">
                    <span className="font-bold">{frontend.length + backend.length + databases.length + cloud.length + tools.length}</span> tecnologías dominadas
                </p>
            </div>
        </div>
    </div>
);

export default Skills;