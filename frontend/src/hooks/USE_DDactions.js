//
//
// create a custom hook to handle the dropdown actions
import { useEffect, useState, useRef } from "react";

export function USE_DDactions() {
  const [current_MENU, SET_currentMenu] = useState("all");
  const [menu_HEIGHT, SET_menuHeight] = useState(200);
  const dropdown_REF = useRef(null);

  useEffect(() => {
    // SET_menuHeight(dropdown_REF.current?.firstChild.offsetHeight);
    SET_menuHeight(200);
  }, []);

  function HANLDE_dd(action, el = null) {
    switch (action) {
      case "open":
        SET_menuHeight(dropdown_REF.current?.firstChild.offsetHeight);
        break;
      case "calculate":
        SET_menuHeight(el.offsetHeight);
        break;
      case "close":
        // SET_menuHeight(dropdown_REF.current?.firstChild.offsetHeight);
        SET_menuHeight(200);
        SET_currentMenu("all");
        break;
    }
  }

  // return [open, CALC_height, CLOSE_menu, current_MENU, menu_HEIGHT, SET_currentMenu];
  return [HANLDE_dd, current_MENU, menu_HEIGHT, SET_currentMenu, dropdown_REF];
}
