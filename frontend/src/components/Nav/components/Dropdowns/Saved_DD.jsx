//
//

import DD from "../../../dd/dd";
import { ICON_save } from "../../../icons/icons";
import { Saved_BLOCK } from "../Transition_BLOCKS/Saved_BLOCK";

import { USE_DDactions } from "../../../../hooks/USE_DDactions";
import { CssTransition_MENU } from "../Menus/CssTransition_MENU";

export function Saved_DD({ savedProfile_OBJs, REMOVE_fromSaved }) {
  const { HANLDE_dd, menu_HEIGHT, dropdown_REF, current_MENU, scroll } = USE_DDactions();

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
      <CssTransition_MENU
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
      </CssTransition_MENU>
    </DD>
  );
}
