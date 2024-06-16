//
//
// create a custom hook to handle the dropdown actions
import { useEffect, useState, useRef } from "react";
import { USE_windowSize } from "../../../hooks/USE_windowWidth";
import { USE_scrollCssMenuToTop } from "../../../hooks/USE_scrollCssMenuToTop";

export function USE_handleDropdown(initial_HEIGHT = 200) {
  const [current_MENU, SET_currentMenu] = useState("all");
  const [menu_HEIGHT, SET_menuHeight] = useState(initial_HEIGHT);

  const dropdown_REF = useRef(null);
  const scroll = SHOULD_scroll(menu_HEIGHT);
  USE_scrollCssMenuToTop({ scroll_REF: dropdown_REF, current_MENU });

  function HANLDE_dd(action, el = null) {
    switch (action) {
      case "open":
        SET_menuHeight(dropdown_REF.current?.firstChild.offsetHeight + 1);
        break;

      case "resize":
        console.log("resize");
        SET_menuHeight(el.offsetHeight + 1);
        break;

      case "fit-content-font-resize":
        SET_menuHeight("fit-content");
        setTimeout(() => {
          SET_menuHeight(dropdown_REF.current?.firstChild.offsetHeight + 1);
        }, 301);
        break;

      case "close":
        SET_menuHeight(initial_HEIGHT);
        SET_currentMenu("all");
        break;
    }
  }

  return { HANLDE_dd, current_MENU, menu_HEIGHT, SET_currentMenu, dropdown_REF, scroll };
}

const SHOULD_scroll = (menu_HEIGHT) => {
  const { height } = USE_windowSize();
  const [scroll, SET_scroll] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const nav_HEIGHT = 60; // px
    const gap = 20; // px
    const vieport_HEIGHT = height - nav_HEIGHT - gap; // 100% height - nav

    const maxHeight = Math.min(vieport_HEIGHT, 700);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (menu_HEIGHT > maxHeight) {
      SET_scroll(true);
    } else {
      timeoutRef.current = setTimeout(() => {
        SET_scroll(false);
      }, 301);
    }
  }, [height, menu_HEIGHT]);

  return scroll;
};
