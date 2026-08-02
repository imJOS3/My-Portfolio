import { useState } from "react";
import {
    SiHtml5, SiCss3, SiJavascript, SiReact, SiTypescript, SiTailwindcss,
    SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiGit, SiPython, SiDocker, SiFigma, SiLinux,
    SiMysql, SiAmazon, SiKubernetes, SiGooglecloud, SiAngular, SiApachekafka, SiSpringboot, SiOracle
} from "react-icons/si";
import { FaJava, FaMicrosoft } from "react-icons/fa";

type Skill = {
    name: string;
    icon: JSX.Element;
    level: number;
};

// Junior / trainee levels — relative strength kept
const frontend: Skill[] = [
    { name: "HTML", icon: <SiHtml5 className="text-orange-400" />, level: 78 },
    { name: "CSS", icon: <SiCss3 className="text-blue-400" />, level: 72 },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-300" />, level: 75 },
    { name: "React", icon: <SiReact className="text-cyan-300" />, level: 68 },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-300" />, level: 70 },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-300" />, level: 65 },
    { name: "Angular", icon: <SiAngular className="text-red-500" />, level: 40 },
];

const backend: Skill[] = [
    { name: "Java", icon: <FaJava className="text-orange-400" />, level: 82 },
    { name: "Spring Boot", icon: <SiSpringboot className="text-green-300" />, level: 72 },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-400" />, level: 68 },
    { name: "Express", icon: <SiExpress className="text-gray-200" />, level: 65 },
    { name: "Python", icon: <SiPython className="text-yellow-400" />, level: 68 },
    { name: "Microservices", icon: <SiSpringboot className="text-green-400" />, level: 55 },
    { name: "Kafka", icon: <SiApachekafka className="text-gray-300" />, level: 45 },
];

const databases: Skill[] = [
    { name: "Oracle", icon: <SiOracle className="text-red-400" />, level: 84 },
    { name: "MySQL", icon: <SiMysql className="text-blue-300" />, level: 70 },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" />, level: 65 },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" />, level: 55 },
];

const cloud: Skill[] = [
    { name: "AWS", icon: <SiAmazon className="text-yellow-300" />, level: 45 },
    { name: "Google Cloud", icon: <SiGooglecloud className="text-blue-300" />, level: 42 },
    { name: "Azure", icon: <FaMicrosoft className="text-blue-400" />, level: 38 },
    { name: "Kubernetes", icon: <SiKubernetes className="text-blue-400" />, level: 35 },
];

const tools: Skill[] = [
    { name: "Linux", icon: <SiLinux className="text-yellow-200" />, level: 78 },
    { name: "Git", icon: <SiGit className="text-orange-500" />, level: 75 },
    { name: "Docker", icon: <SiDocker className="text-blue-300" />, level: 58 },
    { name: "Figma", icon: <SiFigma className="text-pink-400" />, level: 40 },
];

const SectionTitle = ({ title }: { title: string }) => (
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-fuchsia-200 mb-3 text-center">
        {title}
    </h2>
);

const getLevelColor = (level: number): string => {
    if (level >= 90) return "#d946ef";
    if (level >= 80) return "#a855f7";
    if (level >= 70) return "#818cf8";
    if (level >= 60) return "#22d3ee";
    if (level >= 50) return "#2dd4bf";
    if (level >= 40) return "#34d399";
    if (level >= 30) return "#fbbf24";
    if (level >= 20) return "#fb923c";
    return "#f43f5e";
};

const SkillLevelRing = ({ level }: { level: number }) => {
    const size = 64;
    const stroke = 6;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (Math.min(Math.max(level, 0), 100) / 100) * circumference;
    const color = getLevelColor(level);

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth={stroke}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-[stroke-dashoffset] duration-500 ease-out"
                    style={{ filter: `drop-shadow(0 0 6px ${color})` }}
                />
            </svg>
            <div
                className="absolute inset-[10px] rounded-full flex items-center justify-center border border-white/30"
                style={{
                    background: color,
                    boxShadow: `0 0 12px ${color}88`,
                }}
            >
                <span className="text-white text-[11px] font-bold leading-none drop-shadow">
                    {level}%
                </span>
            </div>
        </div>
    );
};

const SkillItem = ({
    skill,
    active,
    onActivate,
    onDeactivate,
}: {
    skill: Skill;
    active: boolean;
    onActivate: () => void;
    onDeactivate: () => void;
}) => (
    <li
        className={`relative flex flex-col items-center justify-center w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-white/10 rounded-lg shadow border transition-all duration-300 cursor-pointer ${
            active
                ? "z-50 scale-110 border-fuchsia-400"
                : "z-0 border-fuchsia-400/30 hover:scale-110 hover:border-fuchsia-400/60"
        }`}
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onClick={(e) => {
            e.stopPropagation();
            if (active) onDeactivate();
            else onActivate();
        }}
        onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (active) onDeactivate();
                else onActivate();
            }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${skill.name} ${skill.level}%`}
        aria-pressed={active}
    >
        <span className="text-xl xs:text-2xl sm:text-3xl drop-shadow-neon">
            {skill.icon}
        </span>

        <div
            className={`absolute left-1/2 -translate-x-1/2 z-50 transition-all duration-200 pointer-events-none top-full mt-2 ${
                active ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
            }`}
        >
            <div className="flex flex-col items-center gap-1 rounded-2xl bg-[#0b0618] border border-fuchsia-400/40 px-3 py-2 shadow-[0_0_24px_rgba(168,85,247,0.55)]">
                <SkillLevelRing level={skill.level} />
                <p className="text-[10px] sm:text-xs font-semibold text-fuchsia-200 whitespace-nowrap">
                    {skill.name}
                </p>
            </div>
        </div>
    </li>
);

const SectionBox = ({
    items,
    fit = false,
    activeKey,
    onActivate,
    onDeactivate,
    keyPrefix,
}: {
    items: Skill[];
    fit?: boolean;
    activeKey: string | null;
    onActivate: (key: string) => void;
    onDeactivate: () => void;
    keyPrefix: string;
}) => {
    const hasActive = items.some((skill, idx) => activeKey === `${keyPrefix}-${skill.name}-${idx}`);

    return (
        <div
            className={`bg-black/70 backdrop-blur-md rounded-2xl border border-fuchsia-400/40 shadow-2xl p-3 sm:p-4 overflow-visible ${
                fit ? "inline-block w-fit mx-auto" : "w-full"
            } ${hasActive ? "relative z-40" : "relative z-10"}`}
        >
            <ul className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 min-h-[5.5rem] sm:min-h-[6.5rem]">
                {items.map((skill, idx) => {
                    const key = `${keyPrefix}-${skill.name}-${idx}`;
                    return (
                        <SkillItem
                            key={key}
                            skill={skill}
                            active={activeKey === key}
                            onActivate={() => onActivate(key)}
                            onDeactivate={onDeactivate}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

const Section = ({
    title,
    items,
    fit = false,
    activeKey,
    onActivate,
    onDeactivate,
    keyPrefix,
}: {
    title: string;
    items: Skill[];
    fit?: boolean;
    activeKey: string | null;
    onActivate: (key: string) => void;
    onDeactivate: () => void;
    keyPrefix: string;
}) => (
    <div className="w-full text-center">
        <SectionTitle title={title} />
        <SectionBox
            items={items}
            fit={fit}
            activeKey={activeKey}
            onActivate={onActivate}
            onDeactivate={onDeactivate}
            keyPrefix={keyPrefix}
        />
    </div>
);

const Skills = () => {
    const [activeKey, setActiveKey] = useState<string | null>(null);

    const handleActivate = (key: string) => {
        setActiveKey(key);
    };

    const handleDeactivate = () => {
        setActiveKey(null);
    };

    return (
        <div className="min-h-screen p-3 sm:p-4 md:p-6 flex flex-col justify-center items-center scroll-mt-[50vh] w-full">
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-fuchsia-300 mb-2 drop-shadow-neon">
                    Technical Skills
                </h1>
                <p className="text-indigo-200 text-sm sm:text-base max-w-2xl">
                    Technologies and tools I use to build real-world solutions
                </p>
            </div>

            <div className="w-full max-w-7xl flex-grow relative z-10">
                <div className="grid grid-cols-1 lg:hidden gap-4 sm:gap-6 p-2 sm:p-4">
                    <Section title="Frontend" items={frontend} activeKey={activeKey} onActivate={handleActivate} onDeactivate={handleDeactivate} keyPrefix="m-fe" />
                    <Section title="Backend" items={backend} activeKey={activeKey} onActivate={handleActivate} onDeactivate={handleDeactivate} keyPrefix="m-be" />
                    <Section title="Databases" items={databases} activeKey={activeKey} onActivate={handleActivate} onDeactivate={handleDeactivate} keyPrefix="m-db" />
                    <Section title="Cloud & DevOps" items={cloud} activeKey={activeKey} onActivate={handleActivate} onDeactivate={handleDeactivate} keyPrefix="m-cloud" />
                    <Section title="Tools" items={tools} activeKey={activeKey} onActivate={handleActivate} onDeactivate={handleDeactivate} keyPrefix="m-tools" />
                </div>

                <div className="hidden lg:block p-2 sm:p-4">
                    <div className="grid grid-cols-2 gap-8">
                        <SectionTitle title="Frontend" />
                        <SectionTitle title="Cloud & DevOps" />
                    </div>
                    <div className="grid grid-cols-2 gap-8 items-center">
                        <SectionBox items={frontend} activeKey={activeKey} onActivate={handleActivate} onDeactivate={handleDeactivate} keyPrefix="d-fe" />
                        <SectionBox items={cloud} activeKey={activeKey} onActivate={handleActivate} onDeactivate={handleDeactivate} keyPrefix="d-cloud" />
                    </div>

                    <div className="grid grid-cols-2 gap-8 mt-8">
                        <SectionTitle title="Backend" />
                        <SectionTitle title="Tools" />
                    </div>
                    <div className="grid grid-cols-2 gap-8 items-center">
                        <SectionBox items={backend} activeKey={activeKey} onActivate={handleActivate} onDeactivate={handleDeactivate} keyPrefix="d-be" />
                        <SectionBox items={tools} activeKey={activeKey} onActivate={handleActivate} onDeactivate={handleDeactivate} keyPrefix="d-tools" />
                    </div>
                </div>

                <div className="hidden lg:flex justify-center mt-4 sm:mt-6 md:mt-8 px-2 sm:px-4">
                    <div className="w-full max-w-md lg:max-w-lg">
                        <Section title="Databases" items={databases} activeKey={activeKey} onActivate={handleActivate} onDeactivate={handleDeactivate} keyPrefix="d-db" />
                    </div>
                </div>
            </div>

            <div
                className={`mt-2 lg:mt-6 text-center relative z-0 transition-opacity duration-200 ${
                    activeKey ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                <p className="text-indigo-300 text-xs sm:text-sm">
                    Hover or tap an icon to see proficiency
                </p>
            </div>

            <div
                className={`mt-4 sm:mt-6 text-center relative z-0 transition-opacity duration-200 ${
                    activeKey ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                <div className="bg-black/50 backdrop-blur-md rounded-xl border border-fuchsia-400/20 px-4 py-2">
                    <p className="text-fuchsia-200 text-sm">
                        <span className="font-bold">
                            {frontend.length + backend.length + databases.length + cloud.length + tools.length}
                        </span>{" "}
                        technologies
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Skills;
