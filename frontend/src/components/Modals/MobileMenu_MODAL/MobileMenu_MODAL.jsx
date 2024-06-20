//
//

import css from "./MobileMenu_MODAL.module.css";
import { useState, useRef, useEffect } from "react";
import { USE_getCategories } from "../../../hooks/USE_getCategories";

import { Dialog, Modal } from "react-aria-components";
import Transition_MENU from "../../Transition_MENU/Transition_MENU";

import { BtnBack_BLOCK } from "../../Transition_MENU/Blocks/General/BtnBack_BLOCK/BtnBack_BLOCK";
import { EndBtn_BLOCK } from "../../Transition_MENU/Blocks/General/EndBtn_BLOCK/EndBtn_BLOCK";

import { Category_BLOCK } from "../../Transition_MENU/Blocks/Categories/Category_BLOCK/Category_BLOCK";
import { AllCategories_BLOCK } from "../../Transition_MENU/Blocks/Categories/AllCategories_BLOCK/AllCategories_BLOCK";

import { Legal_BLOCK } from "../../Transition_MENU/Blocks/Nav/Legal_BLOCK/Legal_BLOCK";
import { Settings_BLOCKS } from "../../Transition_MENU/Blocks/Nav/Settings_BLOCKS/Settings_BLOCKS";
import { Feedback_BLOCK } from "../../Transition_MENU/Blocks/Nav/Feedback_BLOCK/Feedback_BLOCK";
import { Saved_BLOCK } from "../../Transition_MENU/Blocks/Nav/Saved_BLOCK/Saved_BLOCK";
import { Nav_BLOCKS } from "../../Transition_MENU/Blocks/Nav/Nav_BLOCKS/Nav_BLOCKS";
import { USE_scrollCssMenuToTop } from "../../../hooks/USE_scrollCssMenuToTop";

export function MobileMenu_MODAL({
  categories,
  TOGGLE_menu,
  profiles,
  IS_menuOpen,
  current_MENU,
  SET_currentMenu,
  savedProfile_OBJs,
  REMOVE_fromSaved,
  width,
  SET_reportProblemModalOpen,
}) {
  const { startCateg_ARR, endCateg_ARR, GET_subCategories } = USE_getCategories(categories);
  // const { savedProfile_IDs } = useContext(SavedProfileIDs_CONTEXT);

  const scroll_REF = useRef(null);
  const [reverse, SET_reverse] = useState(false);
  USE_scrollCssMenuToTop({ scroll_REF, current_MENU });

  return (
    <Modal isOpen={IS_menuOpen} className={css.MobileMenu_MODAL}>
      <Dialog aria-label="Menu" ref={scroll_REF} className={css.Dialog_MENU}>
        <div style={{ height: "6rem" }}></div>
        {/* Instead of 6rem padding we have this div. The padding sometimes messes up when the toolarbar/ searchbar of the browser come sup on mobile, and everythign shifts to the top */}
        <div
          className={css.menu_PREWRAP}
          style={{ position: "relative" }}
          /* Avoids width glitches. The CSS menu's become absolute when swapping. */
        >
          {/* All */}
          <Transition_MENU current_MENU={current_MENU} classNames="menu-primary" menu_NAME="all">
            <Nav_BLOCKS SET_currentMenu={SET_currentMenu} SET_reverse={SET_reverse} />
            <EndBtn_BLOCK text="Close menu" onClick={() => TOGGLE_menu()} width={width} />
          </Transition_MENU>

          {/* Legal */}
          <Transition_MENU
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
          </Transition_MENU>

          {/* Settings */}
          <Transition_MENU
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
          </Transition_MENU>

          {/* All Categories */}
          <Transition_MENU
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
          </Transition_MENU>

          {/* Individual Categories */}
          {startCateg_ARR.map((categ) => {
            return (
              <Transition_MENU
                key={categ._id}
                current_MENU={current_MENU}
                classNames="menu-third"
                menu_NAME={categ._id}
              >
                <BtnBack_BLOCK
                  title="All categories"
                  onClick={() => SET_currentMenu("categories")}
                  aria_LABEL=""
                />

                <Category_BLOCK
                  category_OBJ={categ}
                  categoryChildren_ARR={GET_subCategories(categ)}
                />
              </Transition_MENU>
            );
          })}

          {/* Saved */}
          <Transition_MENU
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
          </Transition_MENU>

          {/* Feedback */}
          <Transition_MENU
            current_MENU={current_MENU}
            classNames="menu-secondary"
            menu_NAME="feedback"
          >
            <BtnBack_BLOCK title="Back" onClick={() => SET_currentMenu("all")} aria_LABEL="" />
            <Feedback_BLOCK SET_reportProblemModalOpen={SET_reportProblemModalOpen} />
          </Transition_MENU>
        </div>
      </Dialog>
    </Modal>
  );
}
