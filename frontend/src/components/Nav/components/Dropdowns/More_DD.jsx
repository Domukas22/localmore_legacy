//
//

import { CSSTransition } from "react-transition-group";
import { Btn } from "../../../btn/btn";
import DD from "../../../dd/dd";
import { ICON_arrow } from "../../../icons/icons";
import css from "../../Nav.module.css";
import { ICON_activeDigit } from "../../../icons/icons";
import lightbulb from "../../../../assets/icons/lightbulb.png";
import { useState, useRef, useEffect } from "react";

import { USE_DDactions } from "../../../../hooks/USE_DDactions";
import { Settings_BLOCKS } from "../Transition_BLOCKS/Settings_BLOCKS";
import { BtnBack_BLOCK } from "../Transition_BLOCKS/BtnBack_BLOCK";
import { Legal_BLOCK } from "../Transition_BLOCKS/Legal_BLOCK";
import { Boring_BLOCK } from "../Transition_BLOCKS/Boring_BLOCK";
import { Middle_BLOCK } from "../Transition_BLOCKS/Middle_BLOCK";
import { Upper_BLOCK } from "../Transition_BLOCKS/Upper_BLOCK";

import logo from "../../../../assets/icons/logo.png";
import { USE_filterCategType } from "../../../../hooks/USE_filterCategType";
import { USE_getCategoryByID } from "../../../../hooks/USE_getDDcategory";
import { USE_windowSize } from "../../../../hooks/USE_windowWidth";

export function More_DD({
  tagUsage_COUNT,
  align,
  lang,
  TOGGLE_lang,
  IS_textMenu = false,
  categories,
}) {
  const [HANLDE_dd, current_MENU, menuHeight, SET_currentMenu, dropdown_REF] = USE_DDactions();
  const [startCateg_ARR, endCateg_ARR, businessCateg_ARR, placesCateg_ARR] =
    USE_filterCategType(categories);
  const timeout = 300;

  const { height } = USE_windowSize();
  const [scroll, SET_scroll] = useState(false);

  useEffect(() => {
    const nav_HEIGHT = 60; // px
    const gap = 20; // px
    const maxHeight = height - nav_HEIGHT - gap;
    console.log("max: ", maxHeight, "menu: ", menuHeight);

    if (menuHeight > maxHeight) {
      SET_scroll(true);
    } else {
      SET_scroll(false);
    }
  }, [height]);

  return (
    <DD
      btn_TEXT={IS_textMenu ? "Menu" : "More"}
      width={26}
      onOpen={() => HANLDE_dd("open")}
      onClose={() => HANLDE_dd("close")}
      align={align}
    >
      <div
        ref={dropdown_REF}
        style={{
          height: menuHeight,
          transition: "300ms",
          position: "relative",
          overflowX: "hidden",
        }}
        data-scroll={scroll}
        className={css.dd_SUBWRAP}
      >
        <CssTransition_MENU
          current_MENU={current_MENU}
          classNames="menu-primary"
          menu_NAME="all"
          HANLDE_dd={HANLDE_dd}
        >
          <Upper_BLOCK SET_currentMenu={SET_currentMenu} visible_BTNs={{ liked: false }} />
          <Middle_BLOCK tagUsage_COUNT={tagUsage_COUNT} />
          <Boring_BLOCK SET_currentMenu={SET_currentMenu} />
        </CssTransition_MENU>

        <CssTransition_MENU
          current_MENU={current_MENU}
          classNames="menu-secondary"
          menu_NAME="legal"
          HANLDE_dd={HANLDE_dd}
        >
          <BtnBack_BLOCK title="Back" onClick={() => SET_currentMenu("all")} aria_LABEL="" />
          <Legal_BLOCK />
        </CssTransition_MENU>

        <CssTransition_MENU
          current_MENU={current_MENU}
          classNames="menu-secondary"
          menu_NAME="settings"
          HANLDE_dd={HANLDE_dd}
        >
          <BtnBack_BLOCK title="Back" onClick={() => SET_currentMenu("all")} aria_LABEL="" />
          <Settings_BLOCKS
            lang={lang}
            TOGGLE_lang={TOGGLE_lang}
            // SET_height={() => onEnter(resize_REF)}
          />
        </CssTransition_MENU>

        <AllCategories_MENU
          onEnter={(el) => HANLDE_dd("calculate", el)}
          timeout={timeout}
          current_MENU={current_MENU}
          SET_currentMenu={SET_currentMenu}
          categories={categories}
          startCateg_ARR={startCateg_ARR}
          endCateg_ARR={endCateg_ARR}
        />
        <Business_MENU
          onEnter={(el) => HANLDE_dd("calculate", el)}
          categories={businessCateg_ARR}
          timeout={timeout}
          current_MENU={current_MENU}
          SET_currentMenu={SET_currentMenu}
        />
        <Places_MENU
          onEnter={(el) => HANLDE_dd("calculate", el)}
          categories={placesCateg_ARR}
          timeout={timeout}
          current_MENU={current_MENU}
          SET_currentMenu={SET_currentMenu}
        />
      </div>
    </DD>
  );
}

// --------------------------------
// TODO: Create separate files for each
function AllCategories_MENU({
  timeout,
  current_MENU,
  SET_currentMenu,
  startCateg_ARR,
  endCateg_ARR,
  onEnter,
}) {
  const [reverse, SET_reverse] = useState(false);

  return (
    <CSSTransition
      in={current_MENU === "categories"}
      timeout={timeout}
      classNames={reverse ? "menu-secondary-reverse" : "menu-secondary"}
      unmountOnExit
      onEnter={onEnter}
    >
      <ul className="menu">
        <BtnBack_BLOCK
          title="Back to menu"
          onClick={() => {
            SET_reverse(false);
            SET_currentMenu("all");
          }}
          aria_LABEL=""
        />
        <div className={css.block_WRAP}>
          <li key={"all-categories"}>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="All Categories"
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          {startCateg_ARR.map((categ) => {
            return (
              <li key={categ._id}>
                <Btn
                  styles={["btn-44", "navDD_BTN"]}
                  left_ICON={<img src={categ.icon?.url} />}
                  right_ICON={<ICON_arrow direction="right" />}
                  text={categ.name.en}
                  aria_LABEL=""
                  onClick={() => {
                    SET_reverse(true);
                    SET_currentMenu(USE_getCategoryByID(categ._id));
                  }}
                  FIRE_clickEvent={false}
                />
              </li>
            );
          })}
        </div>
        <div className={css.block_WRAP}>
          <p>All categories</p>
          {endCateg_ARR.map((categ) => {
            return (
              <li key={categ.id}>
                <Btn
                  styles={["btn-44", "navDD_BTN"]}
                  left_ICON={<img src={categ.icon?.url} />}
                  // right_ICON={<ICON_arrow direction="right" />}
                  text={categ.name.en}
                  aria_LABEL=""
                  onClick={() => {}}
                  FIRE_clickEvent={false}
                />
              </li>
            );
          })}
        </div>
      </ul>
    </CSSTransition>
  );
}
function Business_MENU({ onEnter, categories, timeout, current_MENU, SET_currentMenu }) {
  return (
    <CSSTransition
      in={current_MENU === "businesses"}
      timeout={timeout}
      classNames="menu-third"
      unmountOnExit
      onEnter={onEnter}
    >
      <ul className="menu">
        <div className={css.block_WRAP}>
          <li key={"business-categories"}>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<ICON_arrow direction="left" />}
              text="All Categories"
              aria_LABEL=""
              onClick={() => SET_currentMenu("categories")}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
        <div className={css.block_WRAP}>
          <p>Find businesses</p>
          {categories.map((categ) => {
            return (
              <li key={categ.id}>
                <Btn
                  styles={["btn-44", "navDD_BTN"]}
                  left_ICON={<img src={categ.icon?.url} />}
                  // right_ICON={<ICON_arrow direction="right" />}
                  text={categ.name.en}
                  aria_LABEL=""
                  onClick={() => {}}
                  FIRE_clickEvent={false}
                />
              </li>
            );
          })}
        </div>
      </ul>
    </CSSTransition>
  );
}
function Places_MENU({ onEnter, categories, timeout, current_MENU, SET_currentMenu }) {
  return (
    <CSSTransition
      in={current_MENU === "places"}
      timeout={timeout}
      classNames="menu-third"
      unmountOnExit
      onEnter={onEnter}
    >
      <ul className="menu">
        <div className={css.block_WRAP}>
          <li key={"places-categories"}>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<ICON_arrow direction="left" />}
              text="All Categories"
              aria_LABEL=""
              onClick={() => SET_currentMenu("categories")}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
        <div className={css.block_WRAP}>
          <p>Find places</p>
          {categories.map((categ) => {
            return (
              <li key={categ.id}>
                <Btn
                  styles={["btn-44", "navDD_BTN"]}
                  left_ICON={<img src={categ.icon?.url} />}
                  // right_ICON={<ICON_arrow direction="right" />}
                  text={categ.name.en}
                  aria_LABEL=""
                  onClick={() => {}}
                  FIRE_clickEvent={false}
                />
              </li>
            );
          })}
        </div>
      </ul>
    </CSSTransition>
  );
}
// --------------------------------

function CssTransition_MENU({ children, current_MENU, menu_NAME, HANLDE_dd, classNames }) {
  return (
    <CSSTransition
      in={current_MENU === menu_NAME}
      timeout={300}
      classNames={classNames}
      unmountOnExit
      onEnter={(el) => HANLDE_dd("calculate", el)}
    >
      <ul className="menu">{children && children}</ul>
    </CSSTransition>
  );
}
