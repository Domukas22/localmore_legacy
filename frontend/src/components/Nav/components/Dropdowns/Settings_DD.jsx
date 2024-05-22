//
//

import DD from "../../../dd/dd";
import settings_ICON from "../../../../assets/icons/settings.png";
import { Settings_BLOCKS } from "../Transition_BLOCKS/Settings_BLOCKS";
import { useRef } from "react";

import { USE_DDactions } from "../../../../hooks/USE_DDactions";
import { CSSTransition } from "react-transition-group";

export function Settings_DD({ lang, TOGGLE_lang }) {
  const [HANLDE_dd, current_MENU, menuHeight, SET_currentMenu, dropdown_REF] = USE_DDactions();
  const resize_REF = useRef(null);
  return (
    <DD
      align="right"
      width={28}
      btnLeft_ICON={<img src={settings_ICON} />}
      onOpen={() => HANLDE_dd("open")}
      onClose={() => HANLDE_dd("close")}
    >
      <ul
        ref={dropdown_REF}
        style={{
          height: menuHeight,
          transition: "300ms",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <CSSTransition
          in={true}
          timeout={300}
          classNames="menu-primary"
          unmountOnExit
          onEnter={(el) => HANLDE_dd("calculate", el)}
          ref={resize_REF}
        >
          <div>
            <Settings_BLOCKS
              lang={lang}
              TOGGLE_lang={TOGGLE_lang}
              SET_height={() => HANLDE_dd("calculate", resize_REF)}
            />
          </div>
        </CSSTransition>
      </ul>
    </DD>
  );
}
