// // src/components/ThemeToggle.jsx
// import { MdLightMode, MdDarkMode } from "react-icons/md";
// import useTheme from "../hooks/useTheme";

// export default function ThemeToggle({ className = "" }) {
//   const { theme, toggleTheme } = useTheme();
//   const isDark = theme === "dark";

//   return (
//     <button
//       onClick={toggleTheme}
//       aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
//       title={isDark ? "Switch to light mode" : "Switch to dark mode"}
//       className={`w-9 h-9 flex items-center justify-center rounded-full border
//                   border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300
//                   hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${className}`}
//     >
//       {isDark ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
//     </button>
//   );
// }
// src/components/ThemeToggle.jsx
import { MdLightMode, MdDarkMode } from "react-icons/md";
import useTheme from "../hooks/useTheme";

export default function ThemeToggle({ className = "", variant = "default" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const variants = {
    default:
      "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
    // For use on permanently-dark surfaces (e.g. the public navbar) regardless of theme
    light:
      "border-white/30 text-white hover:bg-white/10",
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`w-9 h-9 flex items-center justify-center rounded-full border
                  transition-colors ${variants[variant]} ${className}`}
    >
      {isDark ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
    </button>
  );
}
