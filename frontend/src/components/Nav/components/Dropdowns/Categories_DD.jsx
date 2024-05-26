//
//

import { useCallback, useEffect } from "react";
import DD from "../../../dd/dd";
import css from "../../Nav.module.css";
import { USE_DDactions } from "../../../../hooks/USE_DDactions";

import { USE_filterCategType } from "../../../../hooks/USE_filterCategType";
import { BtnBack_BLOCK } from "../Transition_BLOCKS/BtnBack_BLOCK";
import USE_shouldDropdownScroll from "../../../../hooks/USE_shouldDropdownScroll";
import { CssTransition_MENU } from "../Menus/CssTransition_MENU";

import { AllCategories_BLOCK } from "../Transition_BLOCKS/AllCategories_BLOCKS";
import { Businesses_BLOCK } from "../Transition_BLOCKS/Businesses_BLOCK";
import { Places_BLOCK } from "../Transition_BLOCKS/Places_BLOCK";

export function Categories_DD({ categories }) {
  const [startCateg_ARR, endCateg_ARR, businessCateg_ARR, placesCateg_ARR] =
    USE_filterCategType(categories);

  const [HANLDE_dd, current_MENU, menu_HEIGHT, SET_currentMenu, dropdown_REF] = USE_DDactions();
  const SHOULD_ddScroll = USE_shouldDropdownScroll(menu_HEIGHT);
  const resize = useCallback((el) => HANLDE_dd("resize", el), [HANLDE_dd]);

  useEffect(() => {
    // for the reload, when saving file on jsx, so the height doesnt default to 200
    HANLDE_dd("open");
  }, [dropdown_REF]);

  return (
    <DD
      btn_TEXT="Categories"
      width={26}
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
        {/* All Categories */}
        <CssTransition_MENU
          current_MENU={current_MENU}
          classNames={"menu-primary"}
          menu_NAME="all"
          resize={resize}
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
          resize={resize}
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
          resize={resize}
        >
          <BtnBack_BLOCK
            title="All categories"
            onClick={() => SET_currentMenu("all")}
            aria_LABEL=""
          />
          <Places_BLOCK places_CATEG={placesCateg_ARR} />
        </CssTransition_MENU>
      </div>
    </DD>
  );
}
