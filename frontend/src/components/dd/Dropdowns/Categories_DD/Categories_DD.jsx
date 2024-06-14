//
//

import { USE_getCategories } from "../../../../hooks/USE_getCategories";
import { AllCategories_BLOCK } from "../../../Transition_MENU/Blocks/Categories/AllCategories_BLOCK/AllCategories_BLOCK";
import { Category_BLOCK } from "../../../Transition_MENU/Blocks/Categories/Category_BLOCK/Category_BLOCK";
import { BtnBack_BLOCK } from "../../../Transition_MENU/Blocks/General/BtnBack_BLOCK/BtnBack_BLOCK";
import Transition_MENU from "../../../Transition_MENU/Transition_MENU";
import DD from "../../DD";
import { USE_handleDropdown } from "../../hooks/USE_handleDropdown";

export function Categories_DD({ categories, styles }) {
  const { startCateg_ARR, endCateg_ARR, GET_subCategories } = USE_getCategories(categories);

  const { HANLDE_dd, current_MENU, menu_HEIGHT, SET_currentMenu, dropdown_REF, scroll } =
    USE_handleDropdown();

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

            <Category_BLOCK category_OBJ={categ} categoryChildren_ARR={GET_subCategories(categ)} />
          </Transition_MENU>
        );
      })}
    </DD>
  );
}
