import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import ProfileImage from '../../assets/pfpPorfolioCartoon.png';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

const Contact = () => {
  const handleContactClick = () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "contact_button_click",
        button_name: "Contactarme Aquí",
        page_section: "Contact Section"
      });
      console.log("✅ Evento enviado a GTM: contact_button_click");
    }
    window.location.href = '/contactme';
  };

  return (
    <div
      className="flex flex-col justify-center items-center bg-black/70 backdrop-blur-md rounded-2xl border border-fuchsia-400/40 shadow-2xl p-4 sm:p-6 md:p-8 py-8 sm:py-10 md:py-12 scroll-mt-[50vh]"
    >
      {/* Título */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-fuchsia-300 mb-3 sm:mb-4 drop-shadow-neon text-center">
        Contáctame
      </h1>

      <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8 lg:gap-10">
        {/* Información de contacto */}
        <div className="flex-1 flex flex-col justify-center order-2 lg:order-1 w-full">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-fuchsia-200 mb-2 text-center lg:text-left">
            ¿Quieres trabajar conmigo?
          </h2>
          <p className="text-indigo-200 mb-3 sm:mb-4 text-sm sm:text-base text-center lg:text-left">
            Si tienes una idea, proyecto, propuesta laboral o simplemente
            quieres saludar, ¡no dudes en contactarme!
          </p>

          {/* Información de contacto */}
          <div className="space-y-1.5 sm:space-y-2 text-indigo-100 mb-4 sm:mb-5">
            <div className="text-center lg:text-left">
              <span className="font-semibold text-fuchsia-300 text-sm sm:text-base">Email:</span>{" "}
              <a
                href="mailto:josebenjuema2005@gmail.com"
                className="hover:underline text-fuchsia-200 text-sm sm:text-base break-words"
              >
                josebenjuema2005@gmail.com
              </a>
            </div>
            <div className="text-center lg:text-left">
              <span className="font-semibold text-fuchsia-300 text-sm sm:text-base">Teléfono:</span>{" "}
              <a
                href="tel:+573182893475"
                className="hover:underline text-fuchsia-200 text-sm sm:text-base"
              >
                +57 318 289 3475
              </a>
            </div>
            <div className="text-center lg:text-left">
              <span className="font-semibold text-fuchsia-300 text-sm sm:text-base">Ubicación:</span>{" "}
              <span className="text-sm sm:text-base">Bogotá D.C, Colombia</span>
            </div>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-fuchsia-200 mb-2 sm:mb-3 text-center lg:text-left">
              Redes Sociales
            </h3>
            <div className="flex justify-center lg:justify-start gap-4 sm:gap-5">
              <a
                id="github-link"
                href="https://github.com/imJOS3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fuchsia-300 hover:text-fuchsia-100 text-2xl sm:text-3xl transition-transform hover:scale-110"
              >
                <FaGithub />
              </a>
              <a
                id="linkedin-link"
                href="https://www.linkedin.com/in/jose-benjumea-5167b8271/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fuchsia-300 hover:text-fuchsia-100 text-2xl sm:text-3xl transition-transform hover:scale-110"
              >
                <FaLinkedin />
              </a>
              <a
                id="instagram-link"
                href="https://instagram.com/injo.se"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fuchsia-300 hover:text-fuchsia-100 text-2xl sm:text-3xl transition-transform hover:scale-110"
              >
                <FaInstagram />
              </a>
              <a
                id="facebook-link"
                href="https://www.facebook.com/josenakgamer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fuchsia-300 hover:text-fuchsia-100 text-2xl sm:text-3xl transition-transform hover:scale-110"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        {/* Imagen e interacción */}
        <div className="flex-1 flex flex-col justify-center items-center order-1 lg:order-2 w-full">
          <div className="group relative flex flex-col items-center">
            {/* Glow/sombra detrás de la imagen: solo pulsa al hacer hover (en la imagen o el botón) */}
            <div className="absolute top-0 w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mb-3 sm:mb-4 rounded-full bg-fuchsia-500/50 blur-2xl opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300 pointer-events-none"></div>

            <img
              src={ProfileImage}
              alt="Contacto Futurista"
              className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain mb-3 sm:mb-4 opacity-70 group-hover:opacity-100 transition-all duration-300 cursor-pointer group-hover:scale-105"
              id="contact-img"
              onClick={handleContactClick}
            />
            {/* Botón de contacto */}
            <button
              id="contact-btn"
              className="relative px-4 py-2 sm:px-5 sm:py-2.5 bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              onClick={handleContactClick}
            >
              ¡Contáctame aquí!
            </button>
          </div>
        </div>
      </div>

      {/* Información adicional para móviles */}
      <div className="mt-6 sm:mt-8 text-center lg:hidden">
        <p className="text-indigo-200 text-xs sm:text-sm">
          💡 Toca la imagen o el botón para contactarme directamente
        </p>
      </div>
    </div>
  );
};

export default Contact;