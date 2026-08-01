// src/pages/ProjectCarousel.tsx
import { useState, useEffect } from 'react';
import { Project } from './projectFloatWindow';

interface ProjectCarouselProps {
    projects: Project[];
    onProjectClick: (project: Project) => void;
}

const ProjectCarousel = ({ projects, onProjectClick }: ProjectCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(1);

    useEffect(() => {
        const updateItemsToShow = () => {
            if (window.innerWidth >= 768) {
                setItemsToShow(2);
            } else if (window.innerWidth >= 640) {
                setItemsToShow(1.5);
            } else {
                setItemsToShow(1);
            }
        };

        updateItemsToShow();
        window.addEventListener('resize', updateItemsToShow);
        return () => window.removeEventListener('resize', updateItemsToShow);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex >= projects.length - Math.floor(itemsToShow) ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? projects.length - Math.floor(itemsToShow) : prevIndex - 1
        );
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const slideWidth = `${100 / projects.length}%`;

    return (
        <div className="relative w-full max-w-6xl mx-auto">
            {/* Contenedor del carrusel */}
            <div className="relative overflow-hidden rounded-2xl">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / projects.length)}%)`,
                        width: `${projects.length * (100 / itemsToShow)}%`
                    }}
                >
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 p-2 sm:p-3 md:p-4"
                            style={{ width: slideWidth }}
                        >
                            <div
                                onClick={() => onProjectClick(project)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') onProjectClick(project);
                                }}
                                className="group themed-surface rounded-2xl shadow-2xl overflow-hidden hover:scale-[1.02] hover:border-cyan-400/50 transition-all duration-300 h-full flex flex-col cursor-pointer"
                            >
                                {/* Imagen del proyecto */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                                        style={
                                            project.imageScale
                                                ? { transform: `scale(${project.imageScale})` }
                                                : undefined
                                        }
                                    />
                                    <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            project.type === 'Frontend' ? 'bg-fuchsia-500/80 text-white' :
                                            project.type === 'Backend' ? 'bg-blue-500/80 text-white' :
                                            project.type === 'Fullstack' ? 'bg-green-500/80 text-white' :
                                            project.type === 'SaaS' ? 'bg-cyan-500/80 text-white' :
                                            project.type === 'ERP' ? 'bg-amber-500/80 text-white' :
                                            'bg-purple-500/80 text-white'
                                        }`}>
                                            {project.type}
                                        </span>
                                        {(project.status === 'wip' || project.status === 'improve') && (
                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-violet-600/90 text-white border border-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.35)]">
                                                {project.status === 'wip' ? 'En proceso' : 'Por mejorar'}
                                            </span>
                                        )}
                                    </div>
                                    {/* Overlay + texto "Ver detalles" al hacer hover */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                        <span className="opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 text-white text-sm sm:text-base font-semibold tracking-wide">
                                            Ver detalles →
                                        </span>
                                    </div>
                                </div>

                                {/* Contenido del proyecto */}
                                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                                    <h3 className="font-bold text-lg sm:text-xl md:text-2xl themed-glow-text mb-2 transition-colors line-clamp-2">
                                        {project.title}
                                    </h3>
                                    <p className="themed-text-secondary text-sm sm:text-base mb-4 flex-grow line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="flex justify-end items-center mt-auto pt-2 themed-border-accent border-t">
                                        <span className="themed-text-muted group-hover:themed-glow-text text-xs sm:text-sm font-semibold transition-colors">
                                            Ver detalles →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controles de navegación */}
            {projects.length > itemsToShow && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 themed-surface hover:border-cyan-400/50 text-[var(--text-primary)] p-2 sm:p-3 rounded-full transition-all duration-200 z-10"
                        aria-label="Proyecto anterior"
                    >
                        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 themed-surface hover:border-cyan-400/50 text-[var(--text-primary)] p-2 sm:p-3 rounded-full transition-all duration-200 z-10"
                        aria-label="Siguiente proyecto"
                    >
                        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Indicadores de slide (puntos) */}
            {projects.length > itemsToShow && (
                <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
                    {Array.from({ length: projects.length - Math.floor(itemsToShow) + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300"
                            style={{
                                background: index === currentIndex ? 'var(--accent-gradient)' : 'var(--pill-bg)',
                                transform: index === currentIndex ? 'scale(1.25)' : 'scale(1)',
                            }}
                            aria-label={`Ir al slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectCarousel;