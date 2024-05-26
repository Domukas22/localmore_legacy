//
//

import DD from "../../../dd/dd";
import settings_ICON from "../../../../assets/icons/settings.png";

import { Settings_BLOCKS } from "../Transition_BLOCKS/Settings_BLOCKS";
import { USE_DDactions } from "../../../../hooks/USE_DDactions";
import { CssTransition_MENU } from "../Menus/CssTransition_MENU";

export function Settings_DD() {
  const { HANLDE_dd, current_MENU, menu_HEIGHT, dropdown_REF, scroll } = USE_DDactions();

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
      <CssTransition_MENU
        current_MENU={current_MENU}
        classNames="menu-primary"
        menu_NAME="all"
        resize={(el) => HANLDE_dd("resize", el)}
      >
        <Settings_BLOCKS resize={() => HANLDE_dd("fit-content-font-resize")} />
      </CssTransition_MENU>
    </DD>
  );
}
