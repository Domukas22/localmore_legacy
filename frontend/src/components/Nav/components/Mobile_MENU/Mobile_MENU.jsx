//
//
import { Dialog, Modal } from "react-aria-components";
import { Btn } from "../../../btn/btn";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { ICON_activeDigit, ICON_x } from "../../../icons/icons";
import lightbulb from "../../../../assets/icons/lightbulb.png";

import css from "../../Nav.module.css";
import { ICON_arrow } from "../../../icons/icons";
import { SavedProfileIDs_CONTEXT } from "../../../../contexts/savedProfiles";
import { useContext } from "react";
import { useRef, useEffect } from "react";

import { Settings_BLOCKS } from "../Transition_BLOCKS/Settings_BLOCKS";
import { BtnBack_BLOCK } from "../Transition_BLOCKS/BtnBack_BLOCK";
import { Legal_BLOCK } from "../Transition_BLOCKS/Legal_BLOCK";
import { Saved_BLOCK } from "../Transition_BLOCKS/Saved_BLOCK";

import { USE_getCategoryByID } from "../../../../hooks/USE_getDDcategory";
import { USE_filterCategType } from "../../../../hooks/USE_filterCategType";
import logo from "../../../../assets/icons/logo.png";
import { CssTransition_MENU } from "../Menus/CssTransition_MENU";
import { AllCategories_BLOCK } from "../Transition_BLOCKS/AllCategories_BLOCKS";
import { Businesses_BLOCK } from "../Transition_BLOCKS/Businesses_BLOCK";
import { Places_BLOCK } from "../Transition_BLOCKS/Places_BLOCK";
import { Upper_BLOCK } from "../Transition_BLOCKS/Upper_BLOCK";
import { Lower_BLOCK } from "../Transition_BLOCKS/Lower_BLOCK";
import { Feedback_BLOCK } from "../Transition_BLOCKS/Feeback_BLOCK";

export function Mobile_MENU({
  categories,
  TOGGLE_menu,
  profiles,
  IS_menuOpen,
  current_MENU,
  SET_currentMenu,
  savedProfile_OBJs,
  REMOVE_fromSaved,
}) {
  const { startCateg_ARR, endCateg_ARR, businessCateg_ARR, placesCateg_ARR } =
    USE_filterCategType(categories);
  // const { savedProfile_IDs } = useContext(SavedProfileIDs_CONTEXT);

  const scroll_REF = useRef(null);
  const [reverse, SET_reverse] = useState(false);

  useEffect(() => {
    // scroll to top when menu changes
    if (scroll_REF.current) {
      console.log("scroll");
      scroll_REF.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [current_MENU]);

  return (
    <Modal isOpen={IS_menuOpen} className={css.Modal_MENU}>
      <Dialog aria-label="Menu" ref={scroll_REF} className={css.Dialog_MENU}>
        <div style={{ height: "6rem" }}></div>{" "}
        {/* Instead of 6rem padding we have this div. The padding sometimes messes up when the toolarbar/ searchbar of the browser come sup on mobile, and everythign shifts to the top */}
        <div
          className={css.menu_PREWRAP}
          style={{ position: "relative" }}
          /* Avoids width glitches. The CSS menu's become absolute when swapping. */
        >
          {/* All */}
          <CssTransition_MENU current_MENU={current_MENU} classNames="menu-primary" menu_NAME="all">
            <Upper_BLOCK SET_currentMenu={SET_currentMenu} SET_reverse={SET_reverse} />

            <Lower_BLOCK SET_currentMenu={SET_currentMenu} />
            <div className={css.block_WRAP}>
              <li>
                <Btn
                  styles={["btn-44", "navDD_BTN"]}
                  text="Close menu"
                  right_ICON={<ICON_x />}
                  aria_LABEL=""
                  onClick={() => TOGGLE_menu()}
                  FIRE_clickEvent={false}
                />
              </li>
            </div>
          </CssTransition_MENU>

          {/* Legal */}
          <CssTransition_MENU
            current_MENU={current_MENU}
            classNames="menu-secondary"
            menu_NAME="legal"
          >
            <BtnBack_BLOCK
              title="Back to menu"
              onClick={() => SET_currentMenu("all")}
              aria_LABEL=""
            />
            <Legal_BLOCK />
          </CssTransition_MENU>

          {/* Settings */}
          <CssTransition_MENU
            current_MENU={current_MENU}
            classNames="menu-secondary"
            menu_NAME="settings"
          >
            <BtnBack_BLOCK
              title="Back to menu"
              onClick={() => SET_currentMenu("all")}
              aria_LABEL=""
            />
            <Settings_BLOCKS />
          </CssTransition_MENU>

          {/* All Categories */}
          <CssTransition_MENU
            current_MENU={current_MENU}
            classNames={reverse ? "menu-secondary-reverse" : "menu-secondary"}
            menu_NAME="categories"
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
          >
            <BtnBack_BLOCK
              title="All categories"
              onClick={() => SET_currentMenu("categories")}
              aria_LABEL=""
            />
            <Places_BLOCK places_CATEG={placesCateg_ARR} />
          </CssTransition_MENU>

          {/* Saved */}
          <CssTransition_MENU
            current_MENU={current_MENU}
            classNames="menu-secondary"
            menu_NAME="saved"
          >
            <BtnBack_BLOCK
              title="Back to menu"
              onClick={() => SET_currentMenu("all")}
              aria_LABEL=""
            />
            <Saved_BLOCK
              savedProfile_OBJs={savedProfile_OBJs}
              REMOVE_fromSaved={REMOVE_fromSaved}
            />
          </CssTransition_MENU>

          {/* Feedback */}
          <CssTransition_MENU
            current_MENU={current_MENU}
            classNames="menu-secondary"
            menu_NAME="feedback"
          >
            <BtnBack_BLOCK title="Back" onClick={() => SET_currentMenu("all")} aria_LABEL="" />
            <Feedback_BLOCK />
          </CssTransition_MENU>
        </div>
      </Dialog>
    </Modal>
  );
}
