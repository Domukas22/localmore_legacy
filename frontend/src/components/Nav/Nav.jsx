//

import css from "./Nav.module.css";
import { useContext, useEffect, useRef, useState } from "react";

import { LogoSvg_COMP } from "../../assets/logo/LogoSvg_COMP";
import { ICON_x, ICON_dropDownArrow, ICON_search } from "../icons/icons";
import PropTypes from "prop-types";
import { USE_windowSize } from "../../hooks/USE_windowWidth";
import { AnimatePresence, motion } from "framer-motion";
import USE_Toggle from "../../hooks/USE_toggle";
import { Btn } from "../Btn/Btn";
import { Lang_CONTEXT } from "../../contexts/lang";
import { Theme_CONTEXT } from "../../contexts/theme";
import { FontSizeContext } from "../../contexts/fontSize";
import SearchBar from "../Searchbar/Searchbar";

import { Categories_DD, More_DD, Settings_DD, Saved_DD } from "../DD/Dropdowns/Dropdowns";
import { MobileMenu_MODAL } from "../Modals/MobileMenu_MODAL/MobileMenu_MODAL";

import { ICON_menuLines } from "../icons/icons";

import { SavedProfileIDs_CONTEXT } from "../../contexts/savedProfiles";
import { USE_showBrowserToolbar } from "../../hooks/USE_showBrowserToolbar";

export default function Nav({ tagUsages, search, SET_search, categories, profiles, nav_REF }) {
  const [IS_menuOpen, xx, SET_menuOpen] = USE_Toggle(false);
  const [IS_searchOpen, TOGGLE_search, SET_searchOpen] = USE_Toggle(false);
  const { fontSize } = useContext(FontSizeContext); // 1, 2, 3
  const { lang, TOGGLE_lang } = useContext(Lang_CONTEXT);
  const { theme } = useContext(Theme_CONTEXT);
  const [current_MENU, SET_currentMenu] = useState("all");

  const mainSearch_REF = useRef(null);
  const overlaySearch_REF = useRef(null);

  const { savedProfile_IDs, REMOVE_fromSaved } = useContext(SavedProfileIDs_CONTEXT);
  const savedProfile_OBJs = profiles.filter((p) => savedProfile_IDs.has(p._id));

  function TOGGLE_menu(val) {
    if (IS_menuOpen || val === "close") {
      SET_menuOpen(false);
      setTimeout(() => SET_currentMenu("all"), 301);
    } else {
      SET_menuOpen(true);
      USE_showBrowserToolbar();
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-noscroll", `${search !== ""}`);
  }, [search]);

  const { width: window_WIDTH } = USE_windowSize();
  const layout = GET_layout(window_WIDTH, fontSize);

  const SHRINK_logo = layout < 7 || IS_menuOpen ? false : true;
  if (window_WIDTH > 940 && IS_menuOpen) TOGGLE_menu("close");
  if (layout < 5 && IS_searchOpen) SET_searchOpen(false);
  if (5 <= layout && !IS_searchOpen && search !== "") {
    SET_searchOpen(true);
  }
  const SHOULD_showSearchBtn = layout > 4 && !IS_menuOpen;

  return (
    <header
      className={css.header}
      data-theme={theme}
      data-hidemainnav={IS_searchOpen}
      ref={nav_REF}
    >
      <div className={css.nav_WRAP}>
        <h1 key="nav-logo" data-shrink={SHRINK_logo}>
          <a href="http://localhost:5173/" title="← Back to the homepage">
            <LogoSvg_COMP shrink={SHRINK_logo} />
          </a>
        </h1>
        <nav key="nav">
          <ul className={!SHOULD_showSearchBtn ? css["hide-search-btn"] : ""}>
            <AnimatePresence>
              {layout > 4 && !IS_menuOpen && (
                <motion.li
                  initial={{ opacity: 0, x: 70 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 70 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  data-custom="search-btn-li"
                >
                  <Btn
                    styles={["btn-40", "round", "grey"]}
                    text={layout <= 8 && "Search"}
                    left_ICON={<ICON_search />}
                    aria_LABEL=""
                    onClick={() => {
                      TOGGLE_search();
                    }}
                    custom_DATA="search-btn"
                    FIRE_clickEvent={false}
                  />
                </motion.li>
              )}
            </AnimatePresence>

            {layout < 5 && (
              <li>
                <SearchBar
                  SET_search={SET_search}
                  search={search}
                  searchBar_REF={mainSearch_REF}
                  placeholder={"Search places, businesses..."}
                  width="30rem"
                />
              </li>
            )}

            {layout < 3 && (
              <li>
                <Btn
                  styles={["btn-40", "round", "grey", "active"]}
                  text="Startseite"
                  aria_LABEL=""
                  onClick={() => {}}
                  active="true"
                  key="nav-btn-1"
                />
              </li>
            )}
            {layout <= 3 && (
              <li>
                <Categories_DD categories={categories} />
              </li>
            )}
            {layout <= 4 && (
              <li>
                <More_DD
                  tag_USAGES={tagUsages}
                  align={layout > 1 && "right"}
                  IS_textMenu={layout > 3}
                  categories={categories}
                  SHOULD_showCategories={layout > 3}
                  SHOULD_showSettings={layout !== 1}
                  SHOULD_showHome={layout > 2}
                />
              </li>
            )}
            {layout >= 5 && (
              <li>
                <Btn
                  styles={["btn-40", "round", "grey", "nav-DD"]}
                  text={layout <= 7 && "Menu"}
                  right_ICON={
                    IS_menuOpen ? (
                      <ICON_x small={layout <= 7 ? true : false} />
                    ) : !IS_menuOpen && layout > 7 ? (
                      <ICON_menuLines />
                    ) : (
                      <ICON_dropDownArrow />
                    )
                  }
                  aria_LABEL=""
                  onClick={TOGGLE_menu}
                  expanded={IS_menuOpen}
                />
              </li>
            )}
            {layout < 5 && (
              <li data-marginleft={layout === 1 ? true : false}>
                <Saved_DD
                  savedProfile_OBJs={savedProfile_OBJs}
                  REMOVE_fromSaved={REMOVE_fromSaved}
                />
              </li>
            )}
            {layout === 1 && (
              <li>
                <Settings_DD />
              </li>
            )}
          </ul>
        </nav>
      </div>

      <MobileMenu_MODAL
        categories={categories}
        TOGGLE_menu={TOGGLE_menu}
        profiles={profiles}
        IS_menuOpen={IS_menuOpen}
        current_MENU={current_MENU}
        SET_currentMenu={SET_currentMenu}
        savedProfile_OBJs={savedProfile_OBJs}
        REMOVE_fromSaved={REMOVE_fromSaved}
      />

      <AnimatePresence>
        {IS_searchOpen && (
          <motion.div
            className={css.search_OVERLAY}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            // transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <SearchBar SET_search={SET_search} search={search} searchBar_REF={overlaySearch_REF} />
            <Btn
              styles={["btn-40", "round", "grey"]}
              text="Cancel"
              aria_LABEL="Search Heidelberg"
              onClick={() => {
                TOGGLE_search();
                SET_search("");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
function GET_layout(windowWidth, fontSize) {
  const layoutMapping = {
    1: {
      // font size 1
      1200: 1,
      1090: 2,
      960: 3,
      800: 4,
      620: 5,
      510: 6,
      360: 7,
      300: 8,
      default: 10,
    },
    2: {
      // font size 2
      1280: 1,
      1140: 2,
      1000: 3,
      860: 4,
      640: 5,
      540: 6,
      370: 7,
      300: 8,
      default: 10,
    },
    3: {
      // font size 3
      1400: 1,
      1280: 2,
      1120: 3,
      940: 4,
      850: 5,
      600: 6,
      400: 7,
      340: 8,
      default: 10,
    },
  };

  const sizeMapping = layoutMapping[fontSize] || layoutMapping[3]; // Default to font size 3 if not found
  const breakpoints = Object.keys(sizeMapping)
    .map(Number)
    .filter((bp) => !isNaN(bp))
    .sort((a, b) => b - a); // Sort breakpoints in descending order

  // Iterate over the breakpoints to find the correct layout
  for (let breakpoint of breakpoints) {
    if (windowWidth > breakpoint) {
      return sizeMapping[breakpoint];
    }
  }
  return sizeMapping.default;
}

Nav.propTypes = {
  tagUsages: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
  SET_search: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  profiles: PropTypes.array.isRequired,
};
