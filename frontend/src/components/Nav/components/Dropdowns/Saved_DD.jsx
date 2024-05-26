//
//

import DD from "../../../dd/dd";
import { ICON_save } from "../../../icons/icons";
import { Saved_BLOCK } from "../Transition_BLOCKS/Saved_BLOCK";

import { USE_DDactions } from "../../../../hooks/USE_DDactions";
import { CssTransition_MENU } from "../Menus/CssTransition_MENU";

export function Saved_DD({ all_PROFILES }) {
  const { HANLDE_dd, menu_HEIGHT, dropdown_REF, current_MENU } = USE_DDactions();

  return (
    <DD
      align="right"
      width={40}
      btnLeft_ICON={<ICON_save />}
      onOpen={() => HANLDE_dd("open")}
      onClose={() => HANLDE_dd("close")}
      scroll={scroll}
      height={menu_HEIGHT}
      menu_REF={dropdown_REF}
    >
      <CssTransition_MENU
        current_MENU={current_MENU}
        classNames="menu-primary"
        menu_NAME="all"
        resize={(el) => HANLDE_dd("resize", el)}
      >
        <Saved_BLOCK
          all_PROFILES={all_PROFILES}
          resize={() => HANLDE_dd("fit-content-font-resize")}
        />
      </CssTransition_MENU>
    </DD>
  );
}
