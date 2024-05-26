//
//

import { CSSTransition } from "react-transition-group";
import { Btn } from "../../../btn/btn";
import DD from "../../../dd/dd";
import { ICON_arrow } from "../../../icons/icons";
import css from "../../Nav.module.css";
import { ICON_activeDigit } from "../../../icons/icons";
import lightbulb from "../../../../assets/icons/lightbulb.png";
import { useState, useRef, useEffect, useCallback, useContext, useLayoutEffect } from "react";

import { USE_DDactions } from "../../../../hooks/USE_DDactions";
import { Settings_BLOCKS } from "../Transition_BLOCKS/Settings_BLOCKS";
import { BtnBack_BLOCK } from "../Transition_BLOCKS/BtnBack_BLOCK";
import { Legal_BLOCK } from "../Transition_BLOCKS/Legal_BLOCK";
import { DDmoreStarter_BLOCK } from "../Transition_BLOCKS/Boring_BLOCK";

import { Upper_BLOCK } from "../Transition_BLOCKS/Upper_BLOCK";
import { Feedback_BLOCK } from "../Transition_BLOCKS/Feeback_BLOCK";
import { Businesses_BLOCK } from "../Transition_BLOCKS/Businesses_BLOCK";
import { Places_BLOCK } from "../Transition_BLOCKS/Places_BLOCK";

import logo from "../../../../assets/icons/logo.png";
import { USE_filterCategType } from "../../../../hooks/USE_filterCategType";
import { USE_getCategoryByID } from "../../../../hooks/USE_getDDcategory";
import { USE_windowSize } from "../../../../hooks/USE_windowWidth";
import { AllCategories_BLOCK } from "../Transition_BLOCKS/AllCategories_BLOCKS";
import { FontSizeContext } from "../../../../contexts/fontSize";

import USE_shouldDropdownScroll from "../../../../hooks/USE_shouldDropdownScroll";

export function More_DD({ tag_USAGES, align, IS_textMenu = false, categories }) {
  const [HANLDE_dd, current_MENU, menu_HEIGHT, SET_currentMenu, dropdown_REF] = USE_DDactions();
  const SHOULD_ddScroll = USE_shouldDropdownScroll(menu_HEIGHT);
  const { fontSize } = useContext(FontSizeContext);
  const [reverse, SET_reverse] = useState(false);
  const resize_REF = useRef(null);
  const [startCateg_ARR, endCateg_ARR, businessCateg_ARR, placesCateg_ARR] =
    USE_filterCategType(categories);

  const resize = useCallback(
    (el) => {
      HANLDE_dd("resize", el);
      console.log("resize()");
    },
    [HANLDE_dd]
  );

  useEffect(() => {
    // for the reload, when saving file on jsx, so the height doesnt default to 200
    HANLDE_dd("open");
  }, [dropdown_REF]);

  useLayoutEffect(() => {
    if (resize_REF.current) {
      HANLDE_dd("fit");
      console.log(menu_HEIGHT + " true");
    }
  }, [fontSize]);

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
        style={{ height: menu_HEIGHT }}
        data-height={menu_HEIGHT}
        data-scroll={SHOULD_ddScroll}
        className={css.ddMenu_WRAP}
      >
        {/* All */}
        <CssTransition_MENU
          current_MENU={current_MENU}
          classNames="menu-primary"
          menu_NAME="all"
          resize={resize}
        >
          <Upper_BLOCK
            SET_currentMenu={SET_currentMenu}
            visible_BTNs={{ liked: false }}
            SET_reverse={SET_reverse}
          />
          <DDmoreStarter_BLOCK SET_currentMenu={SET_currentMenu} />
        </CssTransition_MENU>

        {/* All Categories */}
        <CssTransition_MENU
          current_MENU={current_MENU}
          classNames={reverse ? "menu-secondary-reverse" : "menu-secondary"}
          menu_NAME="categories"
          resize={resize}
        >
          <BtnBack_BLOCK
            title="Back to menu"
            onClick={() => {
              SET_reverse(false);
              SET_currentMenu("all");
            }}
            aria_LABEL=""
          />
          <AllCategories_BLOCK
            start_CATEG={startCateg_ARR}
            end_CATEG={endCateg_ARR}
            SET_currentMenu={SET_currentMenu}
            SET_reverse={SET_reverse}
          />
        </CssTransition_MENU>

        {/* Category - Businesses */}
        <CssTransition_MENU
          current_MENU={current_MENU}
          classNames="menu-third"
          menu_NAME="businesses"
          resize={resize}
        >
          <BtnBack_BLOCK
            title="All categories"
            onClick={() => SET_currentMenu("categories")}
            aria_LABEL=""
          />
          <Businesses_BLOCK business_CATEG={businessCateg_ARR} />
        </CssTransition_MENU>

        {/* Category - Places */}
        <CssTransition_MENU
          current_MENU={current_MENU}
          classNames="menu-third"
          menu_NAME="places"
          resize={resize}
        >
          <BtnBack_BLOCK
            title="All categories"
            onClick={() => SET_currentMenu("categories")}
            aria_LABEL=""
          />
          <Places_BLOCK places_CATEG={placesCateg_ARR} />
        </CssTransition_MENU>

        {/* Settings */}
        {/* <CssTransition_MENU
          current_MENU={current_MENU}
          classNames="menu-secondary"
          menu_NAME="settings"
          resize={resize}
        >
          <div ref={resize_REF} data-test={menu_HEIGHT}>
            <BtnBack_BLOCK title="Back" onClick={() => SET_currentMenu("all")} aria_LABEL="" />
            <Settings_BLOCKS resize={() => {}} test={resize_REF.current} />
          </div>
        </CssTransition_MENU> */}
        <CssTransitionSettings_MENU
          current_MENU={current_MENU}
          classNames="menu-secondary"
          menu_NAME="settings"
          resize={resize}
          resize_REF={resize_REF}
        >
          {/* <div data-test={menu_HEIGHT}> */}
          <BtnBack_BLOCK title="Back" onClick={() => SET_currentMenu("all")} aria_LABEL="" />
          <Settings_BLOCKS resize={() => {}} test={resize_REF.current} />
          {/* </div> */}
        </CssTransitionSettings_MENU>

        {/* Feedback */}
        <CssTransition_MENU
          current_MENU={current_MENU}
          classNames="menu-secondary"
          menu_NAME="feedback"
          resize={resize}
        >
          <BtnBack_BLOCK title="Back" onClick={() => SET_currentMenu("all")} aria_LABEL="" />
          <Feedback_BLOCK />
        </CssTransition_MENU>

        {/* Legal */}
        <CssTransition_MENU
          current_MENU={current_MENU}
          classNames="menu-secondary"
          menu_NAME="legal"
          resize={resize}
        >
          <BtnBack_BLOCK title="Back" onClick={() => SET_currentMenu("all")} aria_LABEL="" />
          <Legal_BLOCK />
        </CssTransition_MENU>
      </div>
    </DD>
  );
}

function CssTransition_MENU({ children, current_MENU, menu_NAME, classNames, resize }) {
  return (
    <CSSTransition
      in={current_MENU === menu_NAME}
      timeout={300}
      classNames={classNames}
      onEnter={resize}
      unmountOnExit
    >
      <ul className="menu">{children && children}</ul>
    </CSSTransition>
  );
}
function CssTransitionSettings_MENU({
  children,
  current_MENU,
  menu_NAME,
  classNames,
  resize,
  resize_REF,
}) {
  return (
    <CSSTransition
      in={current_MENU === menu_NAME}
      timeout={300}
      classNames={classNames}
      onEnter={resize}
      unmountOnExit
    >
      <ul className="menu" ref={resize_REF}>
        {children && children}
      </ul>
    </CSSTransition>
  );
}
