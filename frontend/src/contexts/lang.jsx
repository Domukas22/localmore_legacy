//

import { createContext, useState } from "react";

const Lang_CONTEXT = createContext({
  lang: "en",
  TOGGLE_lang: () => {},
});

const Lang_PROVIDER = ({ children }) => {
  const [lang, SET_lang] = useState(JSON.parse(localStorage.getItem("lang")) || "en");

  const TOGGLE_lang = (target_LANG) => {
    SET_lang(target_LANG);
    localStorage.setItem("lang", JSON.stringify(target_LANG));
  };

  return <Lang_CONTEXT.Provider value={{ lang, TOGGLE_lang }}>{children}</Lang_CONTEXT.Provider>;
};

export { Lang_CONTEXT, Lang_PROVIDER };
