//

import { useState, useEffect } from "react";

export function USE_windowSize() {
  const [width, SET_width] = useState(window.innerWidth);
  const [height, SET_height] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      SET_width(window.innerWidth);
      SET_height(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, height };
}
