//
//

import DD from "../../../dd/dd";
import settings_ICON from "../../../../assets/icons/settings.png";
import { Settings_BLOCKS } from "../Transition_BLOCKS/Settings_BLOCKS";
import { useRef } from "react";

import { USE_DDactions } from "../../../../hooks/USE_DDactions";
import { useCallback, useContext, useEffect, useLayoutEffect } from "react";
import { FontSizeContext } from "../../../../contexts/fontSize";
import css from "../../Nav.module.css";
import { BtnBack_BLOCK } from "../Transition_BLOCKS/BtnBack_BLOCK";
import { CssTransition_MENU } from "../Menus/CssTransition_MENU";
import USE_shouldDropdownScroll from "../../../../hooks/USE_shouldDropdownScroll";

// export function Settings_DD({ lang, TOGGLE_lang }) {
//   const [HANLDE_dd, current_MENU, menuHeight, SET_currentMenu, dropdown_REF] = USE_DDactions();
//   const resize_REF = useRef(null);
//   return (
//     <DD
//       align="right"
//       width={28}
//       btnLeft_ICON={<img src={settings_ICON} />}
//       onOpen={() => HANLDE_dd("open")}
//       onClose={() => HANLDE_dd("close")}
//     >
//       <ul
//         ref={dropdown_REF}
//         style={{
//           height: menuHeight,
//           transition: "300ms",
//           display: "flex",
//           justifyContent: "flex-start",
//         }}
//       >
//         <CSSTransition
//           in={true}
//           timeout={300}
//           classNames="menu-primary"
//           unmountOnExit
//           onEnter={(el) => HANLDE_dd("calculate", el)}
//           ref={resize_REF}
//         >
//           <div>
//             <Settings_BLOCKS
//               lang={lang}
//               TOGGLE_lang={TOGGLE_lang}
//               SET_height={() => HANLDE_dd("calculate", resize_REF)}
//             />
//           </div>
//         </CSSTransition>
//       </ul>
//     </DD>
//   );
// }
export function Settings_DD() {
  const [HANLDE_dd, current_MENU, menu_HEIGHT, SET_currentMenu, dropdown_REF] = USE_DDactions();
  const { fontSize } = useContext(FontSizeContext);

  const SHOULD_ddScroll = USE_shouldDropdownScroll(menu_HEIGHT);
  const resize = useCallback((el) => HANLDE_dd("resize", el), [HANLDE_dd]);

  useEffect(() => {
    // for the reload, when saving file on jsx, so the height doesnt default to 200
    HANLDE_dd("open");
  }, [dropdown_REF]);

  const resize_REF = useRef(null);
  useLayoutEffect(() => {
    if (resize_REF.current) {
      HANLDE_dd("fit-content-font-resize");
    }
  }, [fontSize]);

  return (
    <DD
      align="right"
      width={28}
      btnLeft_ICON={<img src={settings_ICON} />}
      onOpen={() => HANLDE_dd("open")}
      onClose={() => HANLDE_dd("close")}
    >
      <div
        ref={dropdown_REF}
        style={{ height: menu_HEIGHT }}
        data-height={menu_HEIGHT}
        data-scroll={SHOULD_ddScroll}
        className={css.ddMenu_WRAP}
      >
        {/* Settings */}
        <CssTransition_MENU
          current_MENU={current_MENU}
          classNames="menu-primary"
          menu_NAME="all"
          resize={resize}
        >
          <div ref={resize_REF} data-test={menu_HEIGHT}>
            <Settings_BLOCKS resize={() => {}} test={resize_REF.current} />
          </div>
        </CssTransition_MENU>
      </div>
    </DD>
  );
}
