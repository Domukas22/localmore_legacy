//
//

import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Btn } from "../../btn/btn";
import DD from "../../dd/dd";
import { ICON_arrow } from "../../icons/icons";
import css from "./DD_content.module.css";

export function Categories_DD({ categories }) {
  const [activeMenu, setActiveMenu] = useState("all");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const IDs = {
    businessCateg_ID: "6648757cd5d02a9c790a0782",
    placesCateg_ID: "65eafad210e9fd0b015b91ae",
  };

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function open() {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function closeMenu() {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
    setActiveMenu("all");
  }
  // ------------------------------

  return (
    <DD btn_TEXT="Categories" width={260} onOpen={open} onClose={closeMenu}>
      {/* <DropdownMenu /> */}
      <div
        ref={dropdownRef}
        style={{ height: menuHeight, transition: "300ms", position: "relative" }}
      >
        <AllCategories_BLOCK
          categories={categories}
          onEnter={calcHeight}
          timeout={300}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          IDs={IDs}
        />
        <Business_BLOCK
          categories={categories.filter((c) => c.parent_CATEG === IDs.businessCateg_ID)}
          onEnter={calcHeight}
          timeout={300}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          IDs={IDs}
        />
        <Places_BLOCK
          categories={categories.filter((c) => c.parent_CATEG === IDs.placesCateg_ID)}
          onEnter={calcHeight}
          timeout={300}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          IDs={IDs}
        />
      </div>
    </DD>
  );
}

function AllCategories_BLOCK({ categories, onEnter, timeout, activeMenu, setActiveMenu, IDs }) {
  // categories with .IS_endCategory === true should be up placed at the top, then the rest sorted alpahbaetically underneath
  const start_CATEG = categories
    .filter((c) => c.IS_startCategory && !c.IS_endCategory)
    .sort((a, b) => a.name.en.localeCompare(b.name.en));
  const end_CATEG = categories
    .filter((c) => c.IS_endCategory && !c.IS_startCategory)
    .sort((a, b) => a.name.en.localeCompare(b.name.en));
  // const sorted_CATEG = [...start_CATEG, ...end_CATEG];

  return (
    <CSSTransition
      in={activeMenu === "all"}
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
          {start_CATEG.map((categ) => {
            return (
              <li key={categ.id}>
                <Btn
                  styles={["btn-44", "navDD_BTN"]}
                  left_ICON={<img src={categ.icon?.url} />}
                  right_ICON={<ICON_arrow direction="right" />}
                  text={categ.name.en}
                  aria_LABEL=""
                  onClick={() => {
                    if (categ._id === IDs.businessCateg_ID) {
                      setActiveMenu("business");
                    } else if (categ._id === IDs.placesCateg_ID) {
                      setActiveMenu("places");
                    }
                  }}
                  FIRE_clickEvent={false}
                />
              </li>
            );
          })}
        </div>
        <div className={css.block_WRAP}>
          {end_CATEG.map((categ) => {
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
function Business_BLOCK({ categories, onEnter, timeout, activeMenu, setActiveMenu }) {
  return (
    <CSSTransition
      in={activeMenu === "business"}
      timeout={timeout}
      classNames="menu-secondary"
      unmountOnExit
      onEnter={onEnter}
    >
      <ul className="menu">
        <div className={css.block_WRAP}>
          <li key={"business-categories"}>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<ICON_arrow direction="left" />}
              text="All Categories"
              aria_LABEL=""
              onClick={() => setActiveMenu("all")}
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
function Places_BLOCK({ categories, onEnter, timeout, activeMenu, setActiveMenu }) {
  return (
    <CSSTransition
      in={activeMenu === "places"}
      timeout={timeout}
      classNames="menu-secondary"
      unmountOnExit
      onEnter={onEnter}
    >
      <ul className="menu">
        <div className={css.block_WRAP}>
          <li key={"places-categories"}>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<ICON_arrow direction="left" />}
              text="All Categories"
              aria_LABEL=""
              onClick={() => setActiveMenu("all")}
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
