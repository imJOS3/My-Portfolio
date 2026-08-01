/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",     // Asegura incluir este archivo
    "./src/**/*.{js,ts,jsx,tsx}", // Incluye todos los archivos de la carpeta src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
