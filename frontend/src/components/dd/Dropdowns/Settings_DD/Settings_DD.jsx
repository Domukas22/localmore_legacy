//
//

import DD from "../../DD";
import settings_ICON from "../../../../assets/icons/settings.png";
import Transition_MENU from "../../../Transition_MENU/Transition_MENU";
import { Settings_BLOCKS } from "../../../Transition_MENU/Blocks/Nav/Settings_BLOCKS/Settings_BLOCKS";
import { USE_handleDropdown } from "../../hooks/USE_handleDropdown";

export function Settings_DD() {
  const { HANLDE_dd, current_MENU, menu_HEIGHT, dropdown_REF, scroll } = USE_handleDropdown();

  return (
    <DD
      align="right"
      width={28}
      btnLeft_ICON={<img src={settings_ICON} />}
      onOpen={() => HANLDE_dd("open")}
      onClose={() => HANLDE_dd("close")}
      scroll={scroll}
      height={menu_HEIGHT}
      menu_REF={dropdown_REF}
    >
      {/* Settings */}
      <Transition_MENU
        current_MENU={current_MENU}
        classNames="menu-primary"
        menu_NAME="all"
        resize={(el) => HANLDE_dd("resize", el)}
      >
        <Settings_BLOCKS resize={() => HANLDE_dd("fit-content-font-resize")} />
      </Transition_MENU>
    </DD>
  );
}
