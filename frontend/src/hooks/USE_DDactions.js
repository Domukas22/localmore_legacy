//
//
// create a custom hook to handle the dropdown actions
import { useEffect, useState, useRef } from "react";
import { USE_windowSize } from "./USE_windowWidth";

export function USE_DDactions() {
  const [current_MENU, SET_currentMenu] = useState("all");
  const [menu_HEIGHT, SET_menuHeight] = useState(200);

  const dropdown_REF = useRef(null);
  const scroll = SHOULD_scroll(menu_HEIGHT);

  useEffect(() => SET_menuHeight(menu_HEIGHT), [menu_HEIGHT]);

  useEffect(() => {
    if (!dropdown_REF.current) return;
    dropdown_REF.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [current_MENU]);

  function HANLDE_dd(action, el = null) {
    switch (action) {
      case "open":
        SET_menuHeight(dropdown_REF.current?.firstChild.offsetHeight + 1);
        break;

      case "resize":
        SET_menuHeight(el.offsetHeight + 1);
        break;

      case "fit-content-font-resize":
        SET_menuHeight("fit-content");
        setTimeout(() => {
          SET_menuHeight(dropdown_REF.current?.firstChild.offsetHeight + 1);
        }, 301);
        break;

      case "close":
        SET_menuHeight(200);
        SET_currentMenu("all");
        break;
    }
  }

  return { HANLDE_dd, current_MENU, menu_HEIGHT, SET_currentMenu, dropdown_REF, scroll };
}

const SHOULD_scroll = (menu_HEIGHT) => {
  const { height } = USE_windowSize();
  const [scroll, SET_scroll] = useState(false);

  useEffect(() => {
    const nav_HEIGHT = 60; // px
    const gap = 20; // px
    const maxHeight = height - nav_HEIGHT - gap;

    if (menu_HEIGHT > maxHeight) {
      SET_scroll(true);
    } else {
      setTimeout(() => {
        SET_scroll(false);
      }, 301);
    }
  }, [height, menu_HEIGHT]);

  return scroll;
};
