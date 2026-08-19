import {
    SiHtml5, SiCss3, SiJavascript, SiReact, SiTypescript, SiTailwindcss,
    SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiGit, SiPython, SiDocker, SiLinux,
    SiMysql, SiAmazon, SiGooglecloud, SiSpringboot, SiOracle
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

type Skill = {
    name: string;
    icon: JSX.Element;
    level: number;
};

const columns: { title: string; accent: string; items: Skill[] }[][] = [
    [
        {
            title: "Frontend",
            accent: "#22d3ee",
            items: [
                { name: "HTML", icon: <SiHtml5 className="text-orange-400" />, level: 78 },
                { name: "CSS", icon: <SiCss3 className="text-blue-400" />, level: 72 },
                { name: "JavaScript", icon: <SiJavascript className="text-yellow-300" />, level: 75 },
                { name: "React", icon: <SiReact className="text-cyan-300" />, level: 68 },
                { name: "TypeScript", icon: <SiTypescript className="text-blue-300" />, level: 70 },
                { name: "Tailwind", icon: <SiTailwindcss className="text-teal-300" />, level: 65 },
            ],
        },
        {
            title: "Databases",
            accent: "#a855f7",
            items: [
                { name: "Oracle", icon: <SiOracle className="text-red-400" />, level: 84 },
                { name: "MySQL", icon: <SiMysql className="text-blue-300" />, level: 70 },
                { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" />, level: 65 },
                { name: "MongoDB", icon: <SiMongodb className="text-green-500" />, level: 55 },
            ],
        },
    ],
    [
        {
            title: "Backend",
            accent: "#d946ef",
            items: [
                { name: "Java", icon: <FaJava className="text-orange-400" />, level: 82 },
                { name: "Spring Boot", icon: <SiSpringboot className="text-green-300" />, level: 72 },
                { name: "Node.js", icon: <SiNodedotjs className="text-green-400" />, level: 68 },
                { name: "Express", icon: <SiExpress className="themed-text-primary" />, level: 65 },
                { name: "Python", icon: <SiPython className="text-yellow-400" />, level: 68 },
            ],
        },
        {
            title: "Cloud & tools",
            accent: "#38bdf8",
            items: [
                { name: "AWS", icon: <SiAmazon className="text-yellow-300" />, level: 45 },
                { name: "Google Cloud", icon: <SiGooglecloud className="text-blue-300" />, level: 42 },
                { name: "Linux", icon: <SiLinux className="text-yellow-200" />, level: 78 },
                { name: "Git", icon: <SiGit className="text-orange-500" />, level: 75 },
                { name: "Docker", icon: <SiDocker className="text-blue-300" />, level: 58 },
            ],
        },
    ],
];

const SkillRow = ({ skill, accent }: { skill: Skill; accent: string }) => (
    <li className="flex items-center gap-3">
        <span className="w-7 shrink-0 text-xl">{skill.icon}</span>
        <span className="w-20 shrink-0 truncate text-xs font-semibold themed-text-primary sm:w-32 sm:text-base">
            {skill.name}
        </span>
        <div className="skill-meter skill-meter-lg min-w-0 flex-1">
            <span style={{ width: `${skill.level}%`, background: accent }} />
        </div>
        <span className="w-10 shrink-0 text-right font-mono text-sm themed-text-muted">
            {skill.level}%
        </span>
    </li>
);

const Skills = () => {
    return (
        <div className="flex h-full w-full min-h-0 flex-col justify-center gap-4 pt-5 sm:pt-8">
            <div>
                <p className="section-kicker">04 — Stack</p>
                <h2 className="themed-accent-text text-[clamp(1.35rem,3vw,2.1rem)] font-extrabold leading-tight">
                    Technical skills
                </h2>
            </div>

            <div className="grid min-h-0 grid-cols-2 gap-2 sm:gap-4 md:gap-6">
                {columns.map((column) => (
                    <div key={column[0].title} className="flex min-h-0 flex-col gap-4">
                        {column.map((group) => (
                            <section key={group.title} className="themed-surface rounded-2xl p-4 sm:p-5">
                                <h3 className="mb-3 text-base font-bold" style={{ color: group.accent }}>
                                    {group.title}
                                </h3>
                                <ul className="space-y-2 sm:space-y-3">
                                    {group.items.map((skill) => (
                                        <SkillRow key={skill.name} skill={skill} accent={group.accent} />
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
