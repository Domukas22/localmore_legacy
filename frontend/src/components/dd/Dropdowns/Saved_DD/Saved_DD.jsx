//
//

import { Saved_BLOCK } from "../../../Transition_MENU/Blocks/Nav/Saved_BLOCK/Saved_BLOCK";
import Transition_MENU from "../../../Transition_MENU/Transition_MENU";
import { ICON_save } from "../../../icons/icons";
import DD from "../../DD";
import { USE_handleDropdown } from "../../hooks/USE_handleDropdown";

export function Saved_DD({ savedProfile_OBJs, REMOVE_fromSaved }) {
  const { HANLDE_dd, menu_HEIGHT, dropdown_REF, current_MENU, scroll } = USE_handleDropdown(
    savedProfile_OBJs.length === 0 ? 50 : 200
  );

  return (
    <DD
      align="right"
      width={32}
      btnLeft_ICON={<ICON_save />}
      onOpen={() => HANLDE_dd("open")}
      onClose={() => HANLDE_dd("close")}
      scroll={scroll}
      height={menu_HEIGHT}
      menu_REF={dropdown_REF}
      icon={
        <span style={{ width: "1.6rem", fontWeight: "700", paddingTop: "0.1rem" }}>
          {savedProfile_OBJs.length}
        </span>
      }
    >
      <Transition_MENU
        current_MENU={current_MENU}
        classNames="menu-primary"
        menu_NAME="all"
        resize={(el) => HANLDE_dd("resize", el)}
      >
        <Saved_BLOCK
          savedProfile_OBJs={savedProfile_OBJs}
          REMOVE_fromSaved={REMOVE_fromSaved}
          resize={() => HANLDE_dd("fit-content-font-resize")}
        />
      </Transition_MENU>
    </DD>
  );
}
