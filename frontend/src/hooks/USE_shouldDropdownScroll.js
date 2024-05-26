//
//
import { USE_windowSize } from "./USE_windowWidth";
import { useEffect, useState } from "react";

const USE_shouldDropdownScroll = (menu_HEIGHT) => {
  const { height } = USE_windowSize();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const nav_HEIGHT = 60; // px
    const gap = 20; // px
    const maxHeight = height - nav_HEIGHT - gap;

    if (menu_HEIGHT > maxHeight) {
      setScroll(true);
    } else {
      setTimeout(() => {
        setScroll(false);
      }, 301);
    }
  }, [height, menu_HEIGHT]);

  return scroll;
};

export default USE_shouldDropdownScroll;
