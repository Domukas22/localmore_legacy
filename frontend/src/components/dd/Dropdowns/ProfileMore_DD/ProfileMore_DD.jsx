//
//

import { useState } from "react";

import Transition_MENU from "../../../Transition_MENU/Transition_MENU";
import DD from "../../DD";
import { USE_handleDropdown } from "../../hooks/USE_handleDropdown";
import { ProfileMore_BLOCK } from "../../../Transition_MENU/Blocks/Profile/ProfileMore_BLOCK/ProfileMore_BLOCK";
import { ICON_3dots, ICON_dropDownArrow, ICON_x } from "../../../icons/icons";

export function ProfileMore_DD({ align }) {
  const { HANLDE_dd, current_MENU, menu_HEIGHT, SET_currentMenu, dropdown_REF, scroll } =
    USE_handleDropdown();

  const [reverse, SET_reverse] = useState(false);

  return (
    <DD
      btn_TEXT="More"
      width={28}
      onOpen={() => HANLDE_dd("open")}
      onClose={() => HANLDE_dd("close")}
      align={align}
      scroll={scroll}
      height={menu_HEIGHT}
      menu_REF={dropdown_REF}
      styles={["btn-40", "onBlur", "dropdown-white", "red-x-on-hover"]}
      closed_ICON={<ICON_dropDownArrow color="white" />}
      open_ICON={<ICON_x color="white" small={true} />}
    >
      {/* All */}
      {/* <Transition_MENU
        current_MENU={current_MENU}
        classNames="menu-primary"
        menu_NAME="all"
        resize={(el) => HANLDE_dd("resize", el)}
      >
        <ProfileMore_BLOCK />
      </Transition_MENU> */}

      <ProfileMore_BLOCK />
    </DD>
  );
}
