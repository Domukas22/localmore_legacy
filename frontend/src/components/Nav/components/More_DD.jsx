//
//

import { CSSTransition } from "react-transition-group";
import { Btn } from "../../btn/btn";
import DD from "../../dd/dd";
import { ICON_arrow } from "../../icons/icons";
import css from "./DD_content.module.css";
import { ICON_activeDigit } from "../../icons/icons";
import lightbulb from "../../../assets/icons/lightbulb.png";
import settings_ICON from "../../../assets/icons/settings.png";

import { USE_DDactions } from "../../../hooks/USE_DDactions";
import { Settings_BLOCKS } from "./Transition_BLOCKS/Settings_BLOCKS";
import { BtnBack_BLOCK } from "./Transition_BLOCKS/BtnBack_BLOCK";
import { Legal_BLOCK } from "./Transition_BLOCKS/Legal_BLOCK";

export function More_DD({ tagUsage_COUNT, align, lang, TOGGLE_lang }) {
  const [HANLDE_dd, current_MENU, menuHeight, SET_currentMenu, dropdown_REF] = USE_DDactions();

  return (
    <DD
      btn_TEXT="More"
      width={260}
      onOpen={() => HANLDE_dd("open")}
      onClose={() => HANLDE_dd("close")}
      align={align}
    >
      <div
        ref={dropdown_REF}
        style={{ height: menuHeight, transition: "300ms", position: "relative" }}
      >
        <All_MENU
          onEnter={(el) => HANLDE_dd("calculate", el)}
          timeout={300}
          current_MENU={current_MENU}
          SET_currentMenu={SET_currentMenu}
          tagUsage_COUNT={tagUsage_COUNT}
        />
        <Legal_MENU
          onEnter={(el) => HANLDE_dd("calculate", el)}
          timeout={300}
          current_MENU={current_MENU}
          SET_currentMenu={SET_currentMenu}
        />
        <Settings_MENU
          onEnter={(el) => HANLDE_dd("calculate", el)}
          timeout={300}
          current_MENU={current_MENU}
          SET_currentMenu={SET_currentMenu}
          lang={lang}
          TOGGLE_lang={TOGGLE_lang}
        />
      </div>
    </DD>
  );
}
function All_MENU({ onEnter, timeout, current_MENU, SET_currentMenu, tagUsage_COUNT }) {
  return (
    <CSSTransition
      in={current_MENU === "all"}
      timeout={timeout}
      classNames="menu-primary"
      unmountOnExit
      onEnter={onEnter}
    >
      <ul className="menu">
        <div className={css.block_WRAP}>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Alle tags"
              aria_LABEL=""
              left_ICON={<ICON_activeDigit count={tagUsage_COUNT} IS_active={true} />}
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<img src={lightbulb} />}
              text="Idee Vorschlagen"
              aria_LABEL=""
              onClick={() => ""}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Feedback geben"
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
        <div className={css.block_WRAP}>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="About us"
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Contact"
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Legal"
              aria_LABEL=""
              right_ICON={<ICON_arrow direction="right" />}
              onClick={() => SET_currentMenu("legal")}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Settings"
              aria_LABEL=""
              left_ICON={<img src={settings_ICON} />}
              right_ICON={<ICON_arrow direction="right" />}
              onClick={() => SET_currentMenu("settings")}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
      </ul>
    </CSSTransition>
  );
}
function Legal_MENU({ onEnter, timeout, current_MENU, SET_currentMenu }) {
  return (
    <CSSTransition
      in={current_MENU === "legal"}
      timeout={timeout}
      classNames="menu-secondary"
      unmountOnExit
      onEnter={onEnter}
    >
      <ul className="menu">
        <BtnBack_BLOCK title="Back" onClick={() => SET_currentMenu("all")} aria_LABEL="" />
        <Legal_BLOCK />
      </ul>
    </CSSTransition>
  );
}
function Settings_MENU({ lang, TOGGLE_lang, onEnter, timeout, current_MENU, SET_currentMenu }) {
  return (
    <CSSTransition
      in={current_MENU === "settings"}
      timeout={timeout}
      classNames="menu-secondary"
      unmountOnExit
      onEnter={onEnter}
    >
      <ul className="menu">
        <BtnBack_BLOCK title="Back" onClick={() => SET_currentMenu("all")} aria_LABEL="" />
        <Settings_BLOCKS lang={lang} TOGGLE_lang={TOGGLE_lang} />
      </ul>
    </CSSTransition>
  );
}
