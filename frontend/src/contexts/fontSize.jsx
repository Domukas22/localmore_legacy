//
//

import { createContext, useState, useEffect } from "react";

export const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(JSON.parse(localStorage.getItem("fontSize")) || 1);

  useEffect(() => {
    let size;
    switch (fontSize) {
      case 2:
        size = 1.18; // 18px (1.125 * 16px)
        break;
      case 3:
        size = 1.25; // 20px (1.25 * 16px)
        break;
      case 1:
      default:
        // size = 1.063; // 17px
        size = 1.1; // 17px
        break;
    }
    document.documentElement.style.fontSize = `${size * 62.5}%`; // Base size is 10px (62.5% of 16px)
    localStorage.setItem("fontSize", JSON.stringify(fontSize));
  }, [fontSize]);

  return (
    <FontSizeContext.Provider
      value={{
        fontSize,
        setFontSize,
        fontSize_SCALE: fontSize === 1 ? 1.1 : fontSize === 2 ? 1.18 : 1.25,
      }}
    >
      {children}
    </FontSizeContext.Provider>
  );
};
