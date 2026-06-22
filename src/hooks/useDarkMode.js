import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("bv_theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("bv_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("bv_theme", "light");
    }
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return { isDark, toggle };
};

export default useDarkMode;