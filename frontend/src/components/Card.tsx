import React from "react";

interface CardProps {
    title: string;
    description: string;
    image?: string;
    link?: string;
}

const Card: React.FC<CardProps> = ({ title, description, image, link }) => {
    const [clicked, setClicked] = React.useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 350);
    };

    return (
        <div
            className={`
                themed-surface backdrop-blur-md 
                rounded-xl p-4 md:p-6 
                shadow-xl 
                hover:scale-[1.02] transition-transform duration-300 
                w-full md:max-w-xs 
                cursor-pointer
                ${clicked ? 'scale-95 themed-ring-accent ring-4 shadow-2xl' : ''}
            `}
            onClick={handleClick}
        >
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="w-full h-32 md:h-40 object-cover rounded-lg mb-3 md:mb-4 themed-border-accent border-2"
                />
            )}
            <h2 className="text-xl md:text-2xl font-bold themed-glow-text mb-2">{title}</h2>
            <p className="text-sm md:text-base themed-text-secondary mb-3 md:mb-4">{description}</p>
            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        inline-block px-3 py-1.5 md:px-4 md:py-2 
                        themed-btn-gradient
                        text-sm md:text-base font-semibold shadow-lg 
                        hover:opacity-90
                        transition-all 
                        rounded-full themed-border-accent border-2
                    "
                >
                    Ver proyecto
                </a>
            )}
        </div>
    );
};

export default Card;