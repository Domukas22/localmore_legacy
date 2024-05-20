//
//

import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Btn } from "../../btn/btn";
import DD from "../../dd/dd";
import { ICON_arrow } from "../../icons/icons";
import css from "./DD_content.module.css";
import { ICON_activeDigit } from "../../icons/icons";
import lightbulb from "../../../assets/icons/lightbulb.png";
import settings from "../../../assets/icons/settings.png";
import en_FLAG from "../../../assets/icons/flags/en.png";
import de_FLAG from "../../../assets/icons/flags/de.webp";
import light from "../../../assets/icons/light.png";

// export function Settings_DD({ lang, TOGGLE_lang }) {
//   const [activeMenu, setActiveMenu] = useState("all");
//   const [menuHeight, setMenuHeight] = useState(null);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
//   }, []);

//   function open() {
//     setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
//   }

//   function calcHeight(el) {
//     const height = el.offsetHeight;
//     setMenuHeight(height);
//   }

//   function closeMenu() {
//     setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
//     setActiveMenu("all");
//   }
//   // ------------------------------

//   return (
//     <DD
//       btnLeft_ICON={<img src={settings} />}
//       align="right"
//       width={240}
//       onOpen={open}
//       onClose={closeMenu}
//     >
//       {/* <DropdownMenu /> */}
//       <div
//         ref={dropdownRef}
//         style={{ height: menuHeight, transition: "300ms", position: "relative" }}
//       >
//         <All_BLOCK
//           onEnter={calcHeight}
//           timeout={300}
//           activeMenu={activeMenu}
//           setActiveMenu={setActiveMenu}
//         />
//       </div>
//     </DD>
//   );
// }
// function All_BLOCK({ onEnter, timeout, activeMenu, setActiveMenu, tagUsage_COUNT }) {
//   return (
//     <CSSTransition
//       in={activeMenu === "all"}
//       timeout={timeout}
//       classNames="menu-primary"
//       unmountOnExit
//       onEnter={onEnter}
//     >
//       <ul className="menu">
//         <div className={css.block_WRAP}>
//           <li>
//             <Btn
//               styles={["btn-44", "navDD_BTN"]}
//               text="Alle tags"
//               aria_LABEL=""
//               left_ICON={<ICON_activeDigit count={tagUsage_COUNT} IS_active={true} />}
//               onClick={() => {}}
//               FIRE_clickEvent={false}
//             />
//           </li>
//           <li>
//             <Btn
//               styles={["btn-44", "navDD_BTN"]}
//               left_ICON={<img src={lightbulb} />}
//               text="Idee Vorschlagen"
//               aria_LABEL=""
//               onClick={() => ""}
//             />
//           </li>
//           <li>
//             <Btn
//               styles={["btn-44", "navDD_BTN"]}
//               text="Feedback geben"
//               aria_LABEL=""
//               onClick={() => {}}
//               FIRE_clickEvent={false}
//             />
//           </li>
//         </div>
//         <div className={css.block_WRAP}>
//           <li>
//             <Btn
//               styles={["btn-44", "navDD_BTN"]}
//               text="About us"
//               aria_LABEL=""
//               onClick={() => {}}
//               FIRE_clickEvent={false}
//             />
//           </li>
//           <li>
//             <Btn
//               styles={["btn-44", "navDD_BTN"]}
//               text="Contact"
//               aria_LABEL=""
//               onClick={() => {}}
//               FIRE_clickEvent={false}
//             />
//           </li>
//           <li>
//             <Btn
//               styles={["btn-44", "navDD_BTN"]}
//               text="Legal"
//               aria_LABEL=""
//               right_ICON={<ICON_arrow direction="right" />}
//               onClick={() => setActiveMenu("legal")}
//               FIRE_clickEvent={false}
//             />
//           </li>
//         </div>
//       </ul>
//     </CSSTransition>
//   );
// }

export function Settings_DD({ lang, TOGGLE_lang }) {
  return (
    <DD align="right" width={280} btnLeft_ICON={<img src={settings} />}>
      <ul>
        <div className={css.block_WRAP}>
          <span>Language</span>
          <div className={css.inline_SPAN}>
            <li>
              <Btn
                styles={["btn-44", "navDD_BTN"]}
                left_ICON={<img src={en_FLAG} style={{ borderRadius: "8px" }} />}
                text={"EN"}
                aria_LABEL=""
                onClick={() => TOGGLE_lang("en")}
                active={lang === "en"}
                FIRE_clickEvent={false}
              />
            </li>
            <li>
              <Btn
                styles={["btn-44", "navDD_BTN"]}
                left_ICON={<img src={de_FLAG} style={{ borderRadius: "8px" }} />}
                text={"DE"}
                aria_LABEL=""
                onClick={() => TOGGLE_lang("de")}
                active={lang === "de"}
                FIRE_clickEvent={false}
              />
            </li>
          </div>
        </div>
        <div className={css.block_WRAP}>
          <span>Appearance</span>
          <div className={css.inline_SPAN}>
            <li>
              <Btn
                styles={["btn-44", "navDD_BTN"]}
                left_ICON={<img src={light} />}
                text={"Light"}
                aria_LABEL=""
                onClick={() => {}}
                active={true}
                FIRE_clickEvent={false}
              />
            </li>
            <li>
              <Btn
                styles={["btn-44", "navDD_BTN"]}
                // left_ICON={<img src={light} />}
                text={"Dark"}
                aria_LABEL=""
                onClick={() => {}}
                active={false}
                FIRE_clickEvent={false}
              />
            </li>
          </div>
        </div>
        <div className={css.block_WRAP}>
          <span>Text size</span>
          <div className={css.inline_SPAN}>
            <li>
              <Btn
                styles={["btn-44", "navDD_BTN"]}
                text={"Normal"}
                aria_LABEL=""
                onClick={() => {}}
                active={true}
                FIRE_clickEvent={false}
              />
            </li>
            <li>
              <Btn
                styles={["btn-44", "navDD_BTN"]}
                text={"Big"}
                aria_LABEL=""
                onClick={() => {}}
                active={false}
                FIRE_clickEvent={false}
              />
            </li>
            <li>
              <Btn
                styles={["btn-44", "navDD_BTN"]}
                text={"Huge"}
                aria_LABEL=""
                onClick={() => {}}
                active={false}
                FIRE_clickEvent={false}
              />
            </li>
          </div>
        </div>
      </ul>
    </DD>
  );
}
