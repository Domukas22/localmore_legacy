//

import { useState, useEffect } from "react";

export function USE_windowWidth() {
  const [width, SET_width] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => SET_width(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
}
