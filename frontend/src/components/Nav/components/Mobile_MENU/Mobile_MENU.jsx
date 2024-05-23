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

export function Mobile_MENU({
  tagUsage_COUNT,
  lang,
  TOGGLE_lang,
  categories,
  TOGGLE_menu,
  profiles,
  IS_menuOpen,
  current_MENU,
  SET_currentMenu,
}) {
  // const [current_MENU, SET_currentMenu] = useState("all");
  const timeout = 300;

  const [startCateg_ARR, endCateg_ARR, businessCateg_ARR, placesCateg_ARR] =
    USE_filterCategType(categories);
  const { savedProfile_IDs } = useContext(SavedProfileIDs_CONTEXT);
  const scroll_REF = useRef(null);

  useEffect(() => {
    // scroll to top when menu changes
    if (scroll_REF.current) {
      scroll_REF.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [current_MENU]);

  return (
    <Modal isOpen={IS_menuOpen} className={css.Modal_MENU}>
      <Dialog aria-label="Menu" ref={scroll_REF} className={css.Dialog_MENU}>
        <div className={css.menu_PREWRAP}>
          <All_MENU
            timeout={timeout}
            current_MENU={current_MENU}
            SET_currentMenu={SET_currentMenu}
            tagUsage_COUNT={tagUsage_COUNT}
            TOGGLE_menu={TOGGLE_menu}
            savedProfile_IDs={savedProfile_IDs}
          />
          <Legal_MENU
            timeout={timeout}
            current_MENU={current_MENU}
            SET_currentMenu={SET_currentMenu}
          />
          <Settings_MENU
            timeout={timeout}
            current_MENU={current_MENU}
            SET_currentMenu={SET_currentMenu}
            lang={lang}
            TOGGLE_lang={TOGGLE_lang}
          />
          <AllCategories_MENU
            timeout={timeout}
            current_MENU={current_MENU}
            SET_currentMenu={SET_currentMenu}
            categories={categories}
            startCateg_ARR={startCateg_ARR}
            endCateg_ARR={endCateg_ARR}
          />
          <Business_MENU
            categories={businessCateg_ARR}
            timeout={timeout}
            current_MENU={current_MENU}
            SET_currentMenu={SET_currentMenu}
          />
          <Places_MENU
            categories={placesCateg_ARR}
            timeout={timeout}
            current_MENU={current_MENU}
            SET_currentMenu={SET_currentMenu}
          />
          <Saved_MENU
            timeout={timeout}
            current_MENU={current_MENU}
            SET_currentMenu={SET_currentMenu}
            profiles={profiles}
          />
        </div>
      </Dialog>
    </Modal>
  );
}

function All_MENU({
  timeout,
  current_MENU,
  SET_currentMenu,
  tagUsage_COUNT,
  TOGGLE_menu,
  savedProfile_IDs,
}) {
  return (
    <CSSTransition
      in={current_MENU === "all"}
      timeout={timeout}
      classNames="menu-primary"
      unmountOnExit
    >
      <ul className="menu">
        <div className={css.block_WRAP}>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Home"
              left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/609/609803.png"></img>}
              aria_LABEL=""
              // left_ICON={<ICON_activeDigit count={tagUsage_COUNT} IS_active={true} />}
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Categories"
              left_ICON={
                <img src="https://cdn-icons-png.flaticon.com/512/11244/11244162.png"></img>
              }
              aria_LABEL=""
              right_ICON={<ICON_arrow direction="right" />}
              onClick={() => SET_currentMenu("categories")}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text={`Saved (${savedProfile_IDs.size})`}
              left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/2107/2107845.png"></img>}
              aria_LABEL=""
              right_ICON={<ICON_arrow direction="right" />}
              onClick={() => SET_currentMenu("saved")}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
        <div className={css.block_WRAP}>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Alle tags"
              aria_LABEL=""
              left_ICON={<ICON_activeDigit count={tagUsage_COUNT} IS_active={true} />}
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<img src={lightbulb} />}
              text="Idee Vorschlagen"
              aria_LABEL=""
              onClick={() => ""}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Feedback geben"
              left_ICON={
                <img src="https://cdn-icons-png.freepik.com/512/4066/4066310.png?ga=GA1.1.807612306.1716024941" />
              }
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Settings"
              aria_LABEL=""
              left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/3953/3953226.png"></img>}
              right_ICON={<ICON_arrow direction="right" />}
              onClick={() => SET_currentMenu("settings")}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
        <div className={css.block_WRAP}>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="About us"
              left_ICON={<img src={logo}></img>}
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Contact"
              left_ICON={
                <img src="https://cdn-icons-png.freepik.com/512/7596/7596763.png?ga=GA1.1.807612306.1716024941" />
              }
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
          <li>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              text="Legal"
              left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/3122/3122321.png"></img>}
              aria_LABEL=""
              right_ICON={<ICON_arrow direction="right" />}
              onClick={() => SET_currentMenu("legal")}
              FIRE_clickEvent={false}
            />
          </li>
        </div>
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
      </ul>
    </CSSTransition>
  );
}
function Legal_MENU({ timeout, current_MENU, SET_currentMenu }) {
  return (
    <CSSTransition
      in={current_MENU === "legal"}
      timeout={timeout}
      classNames="menu-secondary"
      unmountOnExit
    >
      <ul className="menu">
        <BtnBack_BLOCK title="Back to menu" onClick={() => SET_currentMenu("all")} aria_LABEL="" />
        <Legal_BLOCK />
      </ul>
    </CSSTransition>
  );
}
function Settings_MENU({ lang, TOGGLE_lang, timeout, current_MENU, SET_currentMenu }) {
  return (
    <CSSTransition
      in={current_MENU === "settings"}
      timeout={timeout}
      classNames="menu-secondary"
      unmountOnExit
    >
      <ul className="menu">
        <BtnBack_BLOCK title="Back to menu" onClick={() => SET_currentMenu("all")} aria_LABEL="" />
        <Settings_BLOCKS lang={lang} TOGGLE_lang={TOGGLE_lang} />
      </ul>
    </CSSTransition>
  );
}
function Saved_MENU({ timeout, current_MENU, SET_currentMenu, profiles }) {
  return (
    <CSSTransition
      in={current_MENU === "saved"}
      timeout={timeout}
      classNames="menu-secondary"
      unmountOnExit
    >
      <ul className="menu">
        <BtnBack_BLOCK title="Back to menu" onClick={() => SET_currentMenu("all")} aria_LABEL="" />
        <Saved_BLOCK all_PROFILES={profiles} />
      </ul>
    </CSSTransition>
  );
}
///
function AllCategories_MENU({
  timeout,
  current_MENU,
  SET_currentMenu,
  startCateg_ARR,
  endCateg_ARR,
}) {
  const [reverse, SET_reverse] = useState(false);

  return (
    <CSSTransition
      in={current_MENU === "categories"}
      timeout={timeout}
      classNames={reverse ? "menu-secondary-reverse" : "menu-secondary"}
      unmountOnExit
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
function Business_MENU({ categories, timeout, current_MENU, SET_currentMenu }) {
  return (
    <CSSTransition
      in={current_MENU === "businesses"}
      timeout={timeout}
      classNames="menu-third"
      unmountOnExit
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
function Places_MENU({ categories, timeout, current_MENU, SET_currentMenu }) {
  return (
    <CSSTransition
      in={current_MENU === "places"}
      timeout={timeout}
      classNames="menu-third"
      unmountOnExit
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
