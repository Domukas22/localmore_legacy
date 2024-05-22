//
//

import { createContext, useState, useEffect } from "react";

export const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState("normal"); // 'normal', 'big', 'huge'

  // useEffect(() => {
  //   let size;
  //   switch (fontSize) {
  //     case "big":
  //       size = "1.8rem"; // 18px
  //       break;
  //     case "huge":
  //       size = "2.0rem"; // 20px
  //       break;
  //     case "normal":
  //     default:
  //       size = "1.6rem"; // 16px
  //       break;
  //   }
  //   document.documentElement.style.setProperty("--user-font-size", size);
  // }, [fontSize]);

  useEffect(() => {
    let size;
    switch (fontSize) {
      case "big":
        size = "1.125"; // 18px (1.125 * 16px)
        break;
      case "huge":
        size = "1.25"; // 20px (1.25 * 16px)
        break;
      case "normal":
      default:
        size = "1"; // 16px
        break;
    }
    document.documentElement.style.fontSize = `${size * 62.5}%`; // Base size is 10px (62.5% of 16px)
  }, [fontSize]);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};
