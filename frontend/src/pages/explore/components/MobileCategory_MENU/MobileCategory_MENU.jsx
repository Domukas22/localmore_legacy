//
//

import { useEffect, useRef, useState } from "react";
import { Dialog, Modal } from "react-aria-components";
import css from "./MobileCategory_MENU.module.css";
import { ICON_arrow, ICON_x, ICON_activeDigit } from "../../../../components/icons/icons";
import { Btn } from "../../../../components/btn/btn";
import { CssTransition_MENU } from "../../../../components/Nav/components/Menus/CssTransition_MENU";
import SearchBar from "../../../../components/search/Searchbar";
import { AllCategories_BLOCK } from "../../../../components/Nav/components/Transition_BLOCKS/AllCategories_BLOCKS";
import { BtnBack_BLOCK } from "../../../../components/Nav/components/Transition_BLOCKS/BtnBack_BLOCK";
import { Businesses_BLOCK } from "../../../../components/Nav/components/Transition_BLOCKS/Businesses_BLOCK";
import { Places_BLOCK } from "../../../../components/Nav/components/Transition_BLOCKS/Places_BLOCK";
import { USE_DDactions } from "../../../../hooks/USE_DDactions";
import { USE_filterCategType } from "../../../../hooks/USE_filterCategType";

export function MobileCategory_MENU({
  IS_mobileCategoryMenuOpen,
  SET_isMobileCategoryMenuOpen,
  categories,
}) {
  const scroll_REF = useRef(null);

  const { startCateg_ARR, endCateg_ARR, businessCateg_ARR, placesCateg_ARR } =
    USE_filterCategType(categories);

  const { HANLDE_dd, current_MENU, menu_HEIGHT, SET_currentMenu, dropdown_REF, scroll } =
    USE_DDactions();

  return (
    <Modal isOpen={IS_mobileCategoryMenuOpen} className={css.tags_MODAL}>
      <Dialog aria-label="Menu" ref={scroll_REF} className={css.Dialog_MENU} autoFocus={false}>
        <div className={css.top}>
          <h3>Choose a category</h3>
          <Btn
            styles={["btn-44", "grey"]}
            right_ICON={<ICON_x color="dark" />}
            onClick={() => SET_isMobileCategoryMenuOpen(false)}
          />
        </div>

        <div className={css.menu_WRAP}>
          {/* All Categories */}
          <CssTransition_MENU
            current_MENU={current_MENU}
            classNames={"menu-primary"}
            menu_NAME="all"
          >
            <AllCategories_BLOCK
              start_CATEG={startCateg_ARR}
              end_CATEG={endCateg_ARR}
              SET_currentMenu={SET_currentMenu}
            />
          </CssTransition_MENU>

          {/* Category - Businesses */}
          <CssTransition_MENU
            current_MENU={current_MENU}
            classNames="menu-secondary"
            menu_NAME="businesses"
          >
            <BtnBack_BLOCK
              title="All categories"
              onClick={() => SET_currentMenu("all")}
              aria_LABEL=""
            />
            <Businesses_BLOCK business_CATEG={businessCateg_ARR} />
          </CssTransition_MENU>

          {/* Category - Places */}
          <CssTransition_MENU
            current_MENU={current_MENU}
            classNames="menu-secondary"
            menu_NAME="places"
          >
            <BtnBack_BLOCK
              title="All categories"
              onClick={() => SET_currentMenu("all")}
              aria_LABEL=""
            />
            <Places_BLOCK places_CATEG={placesCateg_ARR} />
          </CssTransition_MENU>
        </div>
      </Dialog>
    </Modal>
  );
}
