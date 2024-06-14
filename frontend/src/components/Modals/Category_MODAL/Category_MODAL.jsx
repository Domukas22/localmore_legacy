//
//

import { useRef } from "react";
import { Dialog, Modal } from "react-aria-components";
import css from "./Category_MODAL.module.css";
import { ICON_x } from "../../icons/icons";
import { Btn } from "../../Btn/Btn";

import Transition_MENU from "../../Transition_MENU/Transition_MENU";

import { Category_BLOCK } from "../../Transition_MENU/Blocks/Categories/Category_BLOCK/Category_BLOCK";
import { BtnBack_BLOCK } from "../../Transition_MENU/Blocks/General/BtnBack_BLOCK/BtnBack_BLOCK";
import { AllCategories_BLOCK } from "../../Transition_MENU/Blocks/Categories/AllCategories_BLOCK/AllCategories_BLOCK";

import { USE_handleDropdown } from "../../DD/hooks/USE_handleDropdown";
import { USE_getCategories } from "../../../hooks/USE_getCategories";

export function Category_MODAL({
  IS_mobileCategoryMenuOpen,
  SET_isMobileCategoryMenuOpen,
  categories,
}) {
  const scroll_REF = useRef(null);
  const { startCateg_ARR, endCateg_ARR, GET_subCategories } = USE_getCategories(categories);
  const { HANLDE_dd, current_MENU, SET_currentMenu } = USE_handleDropdown();

  return (
    <Modal
      isOpen={IS_mobileCategoryMenuOpen}
      className={css.Category_MODAL}
      onClick={() => {
        SET_isMobileCategoryMenuOpen(false);
      }}
    >
      <Dialog aria-label="Menu" ref={scroll_REF} className={css.Dialog_MENU} autoFocus={false}>
        <div className={css.top}>
          <h3>Choose a category</h3>
          <Btn
            styles={["btn-40", "round", "grey"]}
            right_ICON={<ICON_x color="dark" />}
            onClick={() => SET_isMobileCategoryMenuOpen(false)}
          />
        </div>

        <div className={css.menu_WRAP}>
          <div className={css.menu_SUBWRAP}>
            {/* All Categories */}
            <Transition_MENU
              current_MENU={current_MENU}
              classNames={"menu-primary"}
              menu_NAME="all"
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
                    categoryChildren_ARR={GET_subCategories(categ)}
                  />
                </Transition_MENU>
              );
            })}
          </div>
        </div>
      </Dialog>
    </Modal>
  );
}
