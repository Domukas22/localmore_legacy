//
//

import { CSSTransition } from "react-transition-group";
import { Btn } from "../../../btn/btn";
import DD from "../../../dd/dd";
import { ICON_arrow } from "../../../icons/icons";
import css from "../../Nav.module.css";
import { USE_DDactions } from "../../../../hooks/USE_DDactions";
import { USE_getCategoryByID } from "../../../../hooks/USE_getDDcategory";
import { USE_filterCategType } from "../../../../hooks/USE_filterCategType";
import { BtnBack_BLOCK } from "../Transition_BLOCKS/BtnBack_BLOCK";

export function Categories_DD({ categories }) {
  const [startCateg_ARR, endCateg_ARR, businessCateg_ARR, placesCateg_ARR] =
    USE_filterCategType(categories);

  const [HANLDE_dd, current_MENU, menu_HEIGHT, SET_currentMenu, dropdown_REF] = USE_DDactions();

  return (
    <DD
      btn_TEXT="Categories"
      width={26}
      onOpen={() => HANLDE_dd("open")}
      onClose={() => HANLDE_dd("close")}
    >
      <div
        ref={dropdown_REF}
        style={{ height: menu_HEIGHT, transition: "300ms", position: "relative" }}
      >
        <AllCategories_BLOCK
          onEnter={(el) => HANLDE_dd("calculate", el)}
          timeout={300}
          current_MENU={current_MENU}
          SET_currentMenu={SET_currentMenu}
          startCateg_ARR={startCateg_ARR}
          endCateg_ARR={endCateg_ARR}
        />
        <Business_BLOCK
          categories={businessCateg_ARR}
          onEnter={(el) => HANLDE_dd("calculate", el)}
          timeout={300}
          current_MENU={current_MENU}
          SET_currentMenu={SET_currentMenu}
        />
        <Places_BLOCK
          categories={placesCateg_ARR}
          onEnter={(el) => HANLDE_dd("calculate", el)}
          timeout={300}
          current_MENU={current_MENU}
          SET_currentMenu={SET_currentMenu}
        />
      </div>
    </DD>
  );
}

function AllCategories_BLOCK({
  onEnter,
  timeout,
  current_MENU,
  SET_currentMenu,
  startCateg_ARR,
  endCateg_ARR,
}) {
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
              <li key={categ.id}>
                <Btn
                  styles={["btn-44", "navDD_BTN"]}
                  left_ICON={<img src={categ.icon?.url} />}
                  right_ICON={<ICON_arrow direction="right" />}
                  text={categ.name.en}
                  aria_LABEL=""
                  onClick={() => SET_currentMenu(USE_getCategoryByID(categ._id))}
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
function Business_BLOCK({ categories, onEnter, timeout, current_MENU, SET_currentMenu }) {
  return (
    <CSSTransition
      in={current_MENU === "businesses"}
      timeout={timeout}
      classNames="menu-secondary"
      unmountOnExit
      onEnter={onEnter}
    >
      <ul className="menu">
        <BtnBack_BLOCK
          title="All categories"
          onClick={() => SET_currentMenu("all")}
          aria_LABEL=""
        />
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
function Places_BLOCK({ categories, onEnter, timeout, current_MENU, SET_currentMenu }) {
  return (
    <CSSTransition
      in={current_MENU === "places"}
      timeout={timeout}
      classNames="menu-secondary"
      unmountOnExit
      onEnter={onEnter}
    >
      <ul className="menu">
        <BtnBack_BLOCK
          title="All categories"
          onClick={() => SET_currentMenu("all")}
          aria_LABEL=""
        />
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
