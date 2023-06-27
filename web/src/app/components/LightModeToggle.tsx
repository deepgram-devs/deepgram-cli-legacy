"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";

const LightModeToggle = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className=""
    >
      {currentTheme === "light" && (
        <FontAwesomeIcon icon={faMoon} className="h-6 -my-1 mr-2" />
      )}
      {currentTheme !== "light" && (
        <FontAwesomeIcon icon={faSun} className="h-6 -my-1 mr-2" />
      )}
    </button>
  );
};

export default LightModeToggle;
