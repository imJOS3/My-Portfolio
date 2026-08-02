import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "night" ? "Switch to day mode" : "Switch to night mode"}
      className="p-2 rounded-lg themed-btn-gradient shadow-lg hover:scale-[1.05] transition-all duration-300"
    >
      {theme === "night" ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
};

export default ThemeToggle;