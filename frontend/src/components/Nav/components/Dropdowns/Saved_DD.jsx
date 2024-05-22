//
//

import { useContext } from "react";
import { SavedProfileIDs_CONTEXT } from "../../../../contexts/savedProfiles";
import { Btn } from "../../../btn/btn";
import DD from "../../../dd/dd";
import { ICON_save, ICON_x } from "../../../icons/icons";
import { Saved_BLOCK } from "../Transition_BLOCKS/Saved_BLOCK";

import { USE_DDactions } from "../../../../hooks/USE_DDactions";
import { CSSTransition } from "react-transition-group";

export function Saved_DD({ all_PROFILES }) {
  const [HANLDE_dd, current_MENU, menuHeight, SET_currentMenu, dropdown_REF] = USE_DDactions();

  return (
    <DD
      align="right"
      width={40}
      btnLeft_ICON={<ICON_save />}
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
        >
          <div style={{ height: "fit-content" }}>
            <Saved_BLOCK all_PROFILES={all_PROFILES} />
          </div>
        </CSSTransition>
      </ul>
    </DD>
  );
}
