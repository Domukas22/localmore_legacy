//

import React, { useContext, useRef } from "react";

import { LogoSvg_COMP } from "../../assets/logo/LogoSvg_COMP";
import {
  ICON_x,
  ICON_dropDownArrow,
  ICON_save,
  ICON_activeDigit,
  ICON_searchSmall,
} from "../icons/icons";

import DropDown from "react-a11y-dropdown";
import DD from "../dd/dd";

import { USE_windowWidth } from "../../hooks/USE_windowWidth";
// import en_FLAG from "../../assets/icons/flags/en.webp";
import en_FLAG from "../../assets/icons/flags/en.png";
import de_FLAG from "../../assets/icons/flags/de.webp";
import lightbulb from "../../assets/icons/lightbulb.png";

import { AnimatePresence } from "framer-motion";

import css from "./Nav.module.css";
import USE_Toggle from "../../hooks/USE_toggle";
import { Btn } from "../btn/btn";
import {
  SearchField,
  Input,
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  OverlayArrow,
  Popover,
  Switch,
} from "react-aria-components";
import { Lang_CONTEXT } from "../../contexts/lang";
import { SavedProfileIDs_CONTEXT } from "../../contexts/savedProfiles";
import { Menu, MenuItem, MenuTrigger } from "react-aria-components";
import SearchBar from "../search/search";

export default function Nav({ tagUsages, search, SET_search }) {
  const [IS_menuOpen, TOGGLE_menu, SET_menuOpen] = USE_Toggle(false);
  const { lang, TOGGLE_lang } = useContext(Lang_CONTEXT);
  const { savedProfile_IDs } = useContext(SavedProfileIDs_CONTEXT);

  const window_WIDTH = USE_windowWidth();
  const [SHRINK_search, SET_shrinkSearch] = USE_Toggle(false);

  const btn = useRef(null);

  return (
    <header className={css.header}>
      <AnimatePresence>
        <h1 key="nav-logo">
          <a href="http://localhost:5173/" title="← Back to the homepage">
            <LogoSvg_COMP IS_menuOpen={IS_menuOpen} />
          </a>
        </h1>

        <nav key="nav">
          <ul>
            <li>
              <SearchBar
                SET_search={SET_search}
                IS_mobile={window_WIDTH < 700}
                shrink={window_WIDTH < 700 ? SHRINK_search : false}
                search={search}
                SET_shrinkSearch={SET_shrinkSearch}
              />
            </li>
            <li ref={btn}>
              <Btn
                styles={["btn-40", "round", "grey"]}
                text="Startseite"
                aria_LABEL=""
                onClick={() => {}}
                active="true"
                key="nav-btn-1"
              />
            </li>
            <li>
              <Btn
                styles={["btn-40", "round", "grey"]}
                text="Kategorien"
                aria_LABEL=""
                right_ICON={<ICON_dropDownArrow />}
                onClick={() => ""}
                key="nav-btn-2"
              />
            </li>

            {/* <li>
            <Btn
              styles={["btn-40", "round", "grey"]}
              text="Alle tags"
              right_ICON={<span>{tagUsages.length}</span>}
              aria_LABEL=""
              onClick={() => ""}
            />
          </li> */}

            <li>
              <Btn
                styles={["btn-40", "round", "grey"]}
                text="Anderes"
                right_ICON={<ICON_dropDownArrow />}
                aria_LABEL=""
                onClick={() => ""}
              />
            </li>

            <li>
              <DD label="Lang">
                <ul>
                  <li>
                    <Btn
                      styles={["btn-40"]}
                      left_ICON={<img src={en_FLAG} style={{ borderRadius: "8px" }} />}
                      text={"EN"}
                      aria_LABEL=""
                      onClick={() => TOGGLE_lang("en")}
                    />
                  </li>
                  <li>
                    <Btn
                      styles={["btn-40"]}
                      left_ICON={<img src={de_FLAG} style={{ borderRadius: "8px" }} />}
                      text={"DE"}
                      aria_LABEL=""
                      onClick={() => TOGGLE_lang("de")}
                    />
                  </li>
                </ul>
              </DD>
            </li>
          </ul>
        </nav>
        <div style={{ display: "flex", columnGap: "8px" }} key="nav-right">
          <Btn
            styles={["btn-40", "round", "grey"]}
            left_ICON={<img src={lightbulb} style={{ borderRadius: "8px" }} />}
            text="Idee Vorschlagen"
            aria_LABEL=""
            onClick={() => ""}
          />
          <Btn
            styles={["btn-40", "round", "grey"]}
            left_ICON={<ICON_save />}
            right_ICON={<span>{savedProfile_IDs ? savedProfile_IDs.size : 0}</span>}
            aria_LABEL="Gespeichert"
            onClick={() => ""}
          />
          <Btn
            styles={["btn-40", "round", "grey"]}
            left_ICON={<img src={en_FLAG} style={{ borderRadius: "8px" }} />}
            right_ICON={<ICON_dropDownArrow />}
            aria_LABEL="Change lanuage"
            onClick={() => ""}
          />

          <Btn
            styles={["btn-40", "round", "grey"]}
            text="Menu"
            right_ICON={<ICON_dropDownArrow />}
            aria_LABEL="Gespeichert"
            onClick={TOGGLE_menu}
          />
        </div>
      </AnimatePresence>
    </header>
  );
}
