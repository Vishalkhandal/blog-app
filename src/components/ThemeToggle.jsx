// import React, { useEffect, useState } from "react";
// import { Moon, Sun } from "lucide-react";

// const ThemeToggle = () => {
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   return (
//     <button
//       onClick={toggleTheme}
//       className="text-xl p-2 rounded-full border border-gray-300 dark:border-gray-600"
//       title="Toggle theme"
//     >
//       {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//     </button>
//   );
// };

// export default ThemeToggle;
