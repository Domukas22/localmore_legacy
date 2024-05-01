//

import { useContext, useRef, useEffect } from "react";

import { LogoSvg_COMP } from "../../assets/logo/LogoSvg_COMP";
import {
  ICON_x,
  ICON_dropDownArrow,
  ICON_save,
  ICON_activeDigit,
  ICON_searchSmall,
  ICON_arrow,
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

export default function Nav({ tagUsages, search, SET_search, categories }) {
  const [IS_menuOpen, TOGGLE_menu, SET_menuOpen] = USE_Toggle(false);
  const { lang, TOGGLE_lang } = useContext(Lang_CONTEXT);
  const { savedProfile_IDs } = useContext(SavedProfileIDs_CONTEXT);
  const window_WIDTH = USE_windowWidth();

  const MOVE_provideIdeasButton = window_WIDTH < 1350;
  const MOVE_savedItemsBtn = window_WIDTH < 1150;
  const IS_mobileLayout = window_WIDTH < 1050;
  const SHRINK_logo = window_WIDTH > 400 || IS_menuOpen ? false : true;

  const [SHRINK_search, SET_shrinkSearch] = USE_Toggle(window_WIDTH < 700 ? true : false);

  return (
    <header className={css.header}>
      <AnimatePresence>
        {SHRINK_search && (
          <h1 key="nav-logo">
            <a href="http://localhost:5173/" title="← Back to the homepage">
              <LogoSvg_COMP shrink={SHRINK_logo} />
            </a>
          </h1>
        )}

        <nav key="nav">
          <ul>
            {(SHRINK_logo || window_WIDTH > 400) && (
              <li>
                <SearchBar
                  SET_search={SET_search}
                  IS_mobile={window_WIDTH < 700}
                  shrink={window_WIDTH < 700 ? SHRINK_search : false}
                  search={search}
                  SET_shrinkSearch={SET_shrinkSearch}
                />
              </li>
            )}
            {!IS_mobileLayout && (
              <>
                <li>
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
                  <DD btn_TEXT="Kategorien" width={240}>
                    <ul>
                      <li key={"allCategories"}>
                        <Btn
                          styles={["btn-44", "navDD_BTN"]}
                          text="All Categories"
                          aria_LABEL=""
                          onClick={() => {}}
                          FIRE_clickEvent={false}
                        />
                      </li>
                      {categories &&
                        categories.length > 0 &&
                        categories.map((category) => {
                          const SHOW_arrowRight =
                            category.child_CATEG?.length > 0 && category.IS_endCategory === false;

                          return (
                            <li key={category._id}>
                              <Btn
                                styles={["btn-44", "navDD_BTN"]}
                                left_ICON={<img src={category.icon?.url} />}
                                right_ICON={SHOW_arrowRight && <ICON_arrow direction="right" />}
                                text={category.name.en}
                                aria_LABEL=""
                                onClick={() => {}}
                                FIRE_clickEvent={false}
                              />
                            </li>
                          );
                        })}
                    </ul>
                  </DD>
                </li>
                <li>
                  <DD btn_TEXT="Anderes" width={240}>
                    <ul>
                      <li key={"all-tags"}>
                        <Btn
                          styles={["btn-44", "navDD_BTN"]}
                          text="Alle tags"
                          aria_LABEL=""
                          left_ICON={<ICON_activeDigit count={tagUsages.length} IS_active={true} />}
                          onClick={() => {}}
                          FIRE_clickEvent={false}
                        />
                      </li>
                      {MOVE_provideIdeasButton && (
                        <li key={"provide-ideas"}>
                          <Btn
                            styles={["btn-44", "navDD_BTN"]}
                            left_ICON={<img src={lightbulb} />}
                            text="Idee Vorschlagen"
                            aria_LABEL=""
                            onClick={() => ""}
                          />
                        </li>
                      )}
                      {MOVE_savedItemsBtn && (
                        <li key={"saved"}>
                          <Btn
                            styles={["btn-44", "navDD_BTN"]}
                            // left_ICON={<img src={lightbulb} />}
                            text="Von mir gespeichert"
                            aria_LABEL=""
                            onClick={() => ""}
                          />
                        </li>
                      )}
                      <li key={"allCategories"}>
                        <Btn
                          styles={["btn-44", "navDD_BTN"]}
                          text="Feedback geben"
                          aria_LABEL=""
                          onClick={() => {}}
                          FIRE_clickEvent={false}
                        />
                      </li>
                      <li key={"about-us"}>
                        <Btn
                          styles={["btn-44", "navDD_BTN"]}
                          text="About us"
                          aria_LABEL=""
                          onClick={() => {}}
                          FIRE_clickEvent={false}
                        />
                      </li>
                      <li key={"contact"}>
                        <Btn
                          styles={["btn-44", "navDD_BTN"]}
                          text="Contact us"
                          aria_LABEL=""
                          onClick={() => {}}
                          FIRE_clickEvent={false}
                        />
                      </li>
                      <li key={"impressum"}>
                        <Btn
                          styles={["btn-44", "navDD_BTN"]}
                          text="Impressum"
                          aria_LABEL=""
                          onClick={() => {}}
                          FIRE_clickEvent={false}
                        />
                      </li>
                      <li key={"Dateschutz"}>
                        <Btn
                          styles={["btn-44", "navDD_BTN"]}
                          text="Dateschutz"
                          aria_LABEL=""
                          onClick={() => {}}
                          FIRE_clickEvent={false}
                        />
                      </li>
                      <li key={"Einwillingungseinstellungen"}>
                        <Btn
                          styles={["btn-44", "navDD_BTN"]}
                          text="Einwillingungseinstellungen"
                          aria_LABEL=""
                          onClick={() => {}}
                          FIRE_clickEvent={false}
                        />
                      </li>
                      <li key={"Attributions"}>
                        <Btn
                          styles={["btn-44", "navDD_BTN"]}
                          text="Attributions"
                          aria_LABEL=""
                          onClick={() => {}}
                          FIRE_clickEvent={false}
                        />
                      </li>
                    </ul>
                  </DD>
                </li>{" "}
              </>
            )}
            {IS_mobileLayout && SHRINK_search && (
              <li>
                <Btn
                  styles={["btn-40", "round", "grey"]}
                  text="Menu"
                  right_ICON={<ICON_dropDownArrow />}
                  aria_LABEL=""
                  onClick={TOGGLE_menu}
                />
              </li>
            )}
          </ul>
        </nav>
        {!IS_mobileLayout && (
          <div style={{ display: "flex", columnGap: "8px" }} key="nav-right">
            {!MOVE_provideIdeasButton && (
              <Btn
                styles={["btn-40", "round", "grey"]}
                left_ICON={<img src={lightbulb} style={{ borderRadius: "8px" }} />}
                text="Idee Vorschlagen"
                aria_LABEL=""
                onClick={() => ""}
              />
            )}
            {!MOVE_savedItemsBtn && (
              <Btn
                styles={["btn-40", "round", "grey"]}
                left_ICON={<ICON_save />}
                right_ICON={<span>{savedProfile_IDs ? savedProfile_IDs.size : 0}</span>}
                aria_LABEL="See saved profiles"
                onClick={() => ""}
              />
            )}

            <DD
              btnLeft_ICON={
                <img
                  src={lang === "en" ? en_FLAG : lang === "de" ? de_FLAG : ""}
                  style={{
                    borderRadius: "4px",
                    border: "1px solid rgba(0,0,0,0.2)",
                    objectFit: "cover",
                    height: "16px",
                    width: "24px",
                  }}
                />
              }
            >
              <ul>
                <li>
                  <Btn
                    styles={["btn-40", "navDD_BTN"]}
                    left_ICON={<img src={en_FLAG} style={{ borderRadius: "8px" }} />}
                    text={"EN"}
                    aria_LABEL=""
                    onClick={() => TOGGLE_lang("en")}
                    active={lang === "en"}
                  />
                </li>
                <li>
                  <Btn
                    styles={["btn-40", "navDD_BTN"]}
                    left_ICON={<img src={de_FLAG} style={{ borderRadius: "8px" }} />}
                    text={"DE"}
                    aria_LABEL=""
                    onClick={() => TOGGLE_lang("de")}
                    active={lang === "de"}
                  />
                </li>
              </ul>
            </DD>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
