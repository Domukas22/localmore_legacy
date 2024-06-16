//
//

import { useEffect } from "react";

export function USE_scrollCssMenuToTop({ scroll_REF, current_MENU }) {
  useEffect(() => {
    if (scroll_REF.current) scroll_REF.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [current_MENU, scroll_REF]);
}
