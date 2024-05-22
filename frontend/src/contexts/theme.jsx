//
//

import { createContext, useState } from "react";

const Theme_CONTEXT = createContext({
  theme: "light",
  TOGGLE_theme: () => {},
});

const Theme_PROVIDER = ({ children }) => {
  const [theme, SET_theme] = useState(JSON.parse(localStorage.getItem("theme")) || "light");

  const TOGGLE_theme = (target_THEME) => {
    SET_theme(target_THEME);
    localStorage.setItem("theme", JSON.stringify(target_THEME));
  };

  return (
    <Theme_CONTEXT.Provider value={{ theme, TOGGLE_theme }}>{children}</Theme_CONTEXT.Provider>
  );
};

export { Theme_CONTEXT, Theme_PROVIDER };
