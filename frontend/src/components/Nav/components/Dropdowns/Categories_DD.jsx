//
//

import { useCallback, useEffect } from "react";
import DD from "../../../dd/dd";
import css from "../../Nav.module.css";
import { USE_DDactions } from "../../../../hooks/USE_DDactions";

import { USE_getCategories } from "../../../../hooks/USE_getCategories";

import Transition_MENU from "../../../../components/Transition_MENU/Transition_MENU";
import {
  BtnBack_BLOCK,
  AllCategories_BLOCK,
  Category_BLOCK,
} from "../../../../components/Transition_MENU/Blocks/Blocks";

export function Categories_DD({ categories, styles }) {
  const { startCateg_ARR, endCateg_ARR, GET_categoryChildren } = USE_getCategories(categories);

  const { HANLDE_dd, current_MENU, menu_HEIGHT, SET_currentMenu, dropdown_REF, scroll } =
    USE_DDactions();

  return (
    <DD
      btn_TEXT="Categories"
      width={26}
      onOpen={() => HANLDE_dd("open")}
      onClose={() => HANLDE_dd("close")}
      scroll={scroll}
      height={menu_HEIGHT}
      menu_REF={dropdown_REF}
      styles={styles}
    >
      {/* All Categories */}
      <Transition_MENU
        current_MENU={current_MENU}
        classNames={"menu-primary"}
        menu_NAME="all"
        resize={(el) => HANLDE_dd("resize", el)}
      >
        <AllCategories_BLOCK
          start_CATEG={startCateg_ARR}
          end_CATEG={endCateg_ARR}
          SET_currentMenu={SET_currentMenu}
        />
      </Transition_MENU>

      {/* Individual Categories */}
      {startCateg_ARR.map((categ) => {
        return (
          <Transition_MENU
            key={categ._id}
            resize={(el) => HANLDE_dd("resize", el)}
            current_MENU={current_MENU}
            classNames="menu-third"
            menu_NAME={categ._id}
          >
            <BtnBack_BLOCK
              title="All categories"
              onClick={() => SET_currentMenu("all")}
              aria_LABEL=""
            />

            <Category_BLOCK
              category_OBJ={categ}
              categoryChildren_ARR={GET_categoryChildren(categ._id)}
            />
          </Transition_MENU>
        );
      })}
    </DD>
  );
}
