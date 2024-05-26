//
//
// create a custom hook to handle the dropdown actions
import { useEffect, useState, useRef } from "react";

export function USE_DDactions() {
  const [current_MENU, SET_currentMenu] = useState("all");
  const [menu_HEIGHT, SET_menuHeight] = useState(200);
  const dropdown_REF = useRef(null);

  useEffect(() => SET_menuHeight(200), []);

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
      case "fit":
        // SET_menuHeight("fit-content");
        console.log(dropdown_REF?.current?.lastChild?.clientHeight);
        SET_menuHeight(dropdown_REF?.current?.lastChild?.clientHeight + 1);
        console.log(dropdown_REF?.current?.clientHeight);
        console.log(dropdown_REF?.current?.lastChild?.clientHeight);

        break;
      case "close":
        SET_menuHeight(200);
        SET_currentMenu("all");
        break;
    }
  }

  // return [open, CALC_height, CLOSE_menu, current_MENU, menu_HEIGHT, SET_currentMenu];
  return [HANLDE_dd, current_MENU, menu_HEIGHT, SET_currentMenu, dropdown_REF];
}
