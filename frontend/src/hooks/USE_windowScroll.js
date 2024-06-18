//
//

import { useEffect, useState } from "react";

export default function USE_windowScroll() {
  const [scrolled, SET_scrolled] = useState(window.scrollY);

  useEffect(() => {
    const HANDLE_scroll = () => {
      SET_scrolled(window.scrollY);
    };

    window.addEventListener("scroll", HANDLE_scroll);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("scroll", HANDLE_scroll);
    };
  }, []);

  return scrolled;
}
