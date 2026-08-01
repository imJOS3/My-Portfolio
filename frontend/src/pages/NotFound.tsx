import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaGhost } from 'react-icons/fa';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-fuchsia-700 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full h-full fixed inset-0">
        
        {/* Fantasmas que se mueven por toda la pantalla */}
        
        {/* Fantasma 1 - Movimiento por toda la pantalla */}
        <div className="absolute animate-pan-screen-1">
          <FaGhost className="text-6xl text-white/90 drop-shadow-lg" />
        </div>
        <div className="absolute animate-pan-screen-shadow-1 w-16 h-3 bg-purple-400/20 rounded-full blur-sm"></div>

        {/* Fantasma 2 - Movimiento diagonal */}
        <div className="absolute animate-pan-screen-2">
          <FaGhost className="text-5xl text-pink-300/80 drop-shadow-lg" />
        </div>
        <div className="absolute animate-pan-screen-shadow-2 w-14 h-3 bg-pink-400/15 rounded-full blur-sm"></div>

        {/* Fantasma 3 - Movimiento en zigzag */}
        <div className="absolute animate-pan-screen-3">
          <FaGhost className="text-4xl text-blue-300/80 drop-shadow-lg" />
        </div>
        <div className="absolute animate-pan-screen-shadow-3 w-12 h-3 bg-blue-400/15 rounded-full blur-sm"></div>

        {/* Fantasma 4 - Movimiento circular amplio */}
        <div className="absolute animate-pan-screen-4">
          <FaGhost className="text-5xl text-yellow-300/80 drop-shadow-lg" />
        </div>
        <div className="absolute animate-pan-screen-shadow-4 w-14 h-3 bg-yellow-400/15 rounded-full blur-sm"></div>

        {/* Fantasma 5 - Movimiento aleatorio extremo */}
        <div className="absolute animate-pan-screen-5">
          <FaGhost className="text-4xl text-green-300/80 drop-shadow-lg" />
        </div>
        <div className="absolute animate-pan-screen-shadow-5 w-12 h-3 bg-green-400/15 rounded-full blur-sm"></div>

      </div>

      {/* Contenido centrado */}
      <div className="relative z-10 ">
        <div className="mb-6">
          <h1 className="text-7xl font-bold text-center text-white mb-2">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <h2 className="text-2xl font-bold  text-white mb-4">
          ¡Ups! Página no encontrada
        </h2>

   

        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="group flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <FaHome className="group-hover:scale-110 transition-transform" />
            Ir al Inicio
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Volver Atrás
          </button>
        </div>

    
      </div>

      {/* Estilos para las animaciones de pantalla completa */}
      <style>{`
        /* Fantasma 1 - Recorrido horizontal completo */
        @keyframes pan-screen-1 {
          0% {
            transform: translate(-100px, 20vh) rotate(0deg);
          }
          25% {
            transform: translate(30vw, 10vh) rotate(15deg);
          }
          50% {
            transform: translate(60vw, 80vh) rotate(-10deg);
          }
          75% {
            transform: translate(90vw, 40vh) rotate(20deg);
          }
          100% {
            transform: translate(110vw, 60vh) rotate(0deg);
          }
        }

        @keyframes pan-screen-shadow-1 {
          0% {
            transform: translate(-100px, 0px);
            opacity: 0.3;
          }
          25% {
            transform: translate(30vw, 0px);
            opacity: 0.2;
          }
          50% {
            transform: translate(60vw, 0px);
            opacity: 0.4;
          }
          75% {
            transform: translate(90vw, 0px);
            opacity: 0.1;
          }
          100% {
            transform: translate(110vw, 0px);
            opacity: 0.3;
          }
        }

        /* Fantasma 2 - Recorrido diagonal */
        @keyframes pan-screen-2 {
          0% {
            transform: translate(110vw, 80vh) rotate(10deg);
          }
          33% {
            transform: translate(70vw, 20vh) rotate(-15deg);
          }
          66% {
            transform: translate(20vw, 60vh) rotate(25deg);
          }
          100% {
            transform: translate(-100px, 10vh) rotate(-5deg);
          }
        }

        @keyframes pan-screen-shadow-2 {
          0% {
            transform: translate(110vw, 0px);
            opacity: 0.25;
          }
          33% {
            transform: translate(70vw, 0px);
            opacity: 0.15;
          }
          66% {
            transform: translate(20vw, 0px);
            opacity: 0.3;
          }
          100% {
            transform: translate(-100px, 0px);
            opacity: 0.2;
          }
        }

        /* Fantasma 3 - Movimiento en zigzag */
        @keyframes pan-screen-3 {
          0% {
            transform: translate(50vw, -100px) rotate(-5deg);
          }
          20% {
            transform: translate(80vw, 30vh) rotate(20deg);
          }
          40% {
            transform: translate(20vw, 50vh) rotate(-25deg);
          }
          60% {
            transform: translate(90vw, 70vh) rotate(30deg);
          }
          80% {
            transform: translate(10vw, 20vh) rotate(-20deg);
          }
          100% {
            transform: translate(60vw, 110vh) rotate(5deg);
          }
        }

        @keyframes pan-screen-shadow-3 {
          0% {
            transform: translate(50vw, 0px);
            opacity: 0.2;
          }
          20% {
            transform: translate(80vw, 0px);
            opacity: 0.1;
          }
          40% {
            transform: translate(20vw, 0px);
            opacity: 0.25;
          }
          60% {
            transform: translate(90vw, 0px);
            opacity: 0.08;
          }
          80% {
            transform: translate(10vw, 0px);
            opacity: 0.2;
          }
          100% {
            transform: translate(60vw, 0px);
            opacity: 0.12;
          }
        }

        /* Fantasma 4 - Movimiento circular amplio */
        @keyframes pan-screen-4 {
          0% {
            transform: translate(20vw, 50vh) rotate(0deg);
          }
          25% {
            transform: translate(80vw, 20vh) rotate(90deg);
          }
          50% {
            transform: translate(60vw, 80vh) rotate(180deg);
          }
          75% {
            transform: translate(10vw, 70vh) rotate(270deg);
          }
          100% {
            transform: translate(20vw, 50vh) rotate(360deg);
          }
        }

        @keyframes pan-screen-shadow-4 {
          0% {
            transform: translate(20vw, 0px);
            opacity: 0.25;
          }
          25% {
            transform: translate(80vw, 0px);
            opacity: 0.15;
          }
          50% {
            transform: translate(60vw, 0px);
            opacity: 0.3;
          }
          75% {
            transform: translate(10vw, 0px);
            opacity: 0.1;
          }
          100% {
            transform: translate(20vw, 0px);
            opacity: 0.25;
          }
        }

        /* Fantasma 5 - Movimiento aleatorio extremo */
        @keyframes pan-screen-5 {
          0% {
            transform: translate(-100px, 70vh) rotate(5deg);
          }
          14% {
            transform: translate(40vw, 10vh) rotate(-30deg);
          }
          28% {
            transform: translate(85vw, 90vh) rotate(45deg);
          }
          42% {
            transform: translate(15vw, 40vh) rotate(-40deg);
          }
          56% {
            transform: translate(95vw, 25vh) rotate(50deg);
          }
          70% {
            transform: translate(5vw, 85vh) rotate(-35deg);
          }
          84% {
            transform: translate(75vw, 15vh) rotate(40deg);
          }
          100% {
            transform: translate(110vw, 95vh) rotate(-10deg);
          }
        }

        @keyframes pan-screen-shadow-5 {
          0% {
            transform: translate(-100px, 0px);
            opacity: 0.2;
          }
          14% {
            transform: translate(40vw, 0px);
            opacity: 0.08;
          }
          28% {
            transform: translate(85vw, 0px);
            opacity: 0.25;
          }
          42% {
            transform: translate(15vw, 0px);
            opacity: 0.12;
          }
          56% {
            transform: translate(95vw, 0px);
            opacity: 0.05;
          }
          70% {
            transform: translate(5vw, 0px);
            opacity: 0.18;
          }
          84% {
            transform: translate(75vw, 0px);
            opacity: 0.1;
          }
          100% {
            transform: translate(110vw, 0px);
            opacity: 0.15;
          }
        }

        .animate-pan-screen-1 {
          animation: pan-screen-1 25s linear infinite;
        }
        .animate-pan-screen-shadow-1 {
          animation: pan-screen-shadow-1 25s linear infinite;
        }

        .animate-pan-screen-2 {
          animation: pan-screen-2 20s linear infinite;
        }
        .animate-pan-screen-shadow-2 {
          animation: pan-screen-shadow-2 20s linear infinite;
        }

        .animate-pan-screen-3 {
          animation: pan-screen-3 18s linear infinite;
        }
        .animate-pan-screen-shadow-3 {
          animation: pan-screen-shadow-3 18s linear infinite;
        }

        .animate-pan-screen-4 {
          animation: pan-screen-4 30s linear infinite;
        }
        .animate-pan-screen-shadow-4 {
          animation: pan-screen-shadow-4 30s linear infinite;
        }

        .animate-pan-screen-5 {
          animation: pan-screen-5 22s linear infinite;
        }
        .animate-pan-screen-shadow-5 {
          animation: pan-screen-shadow-5 22s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;