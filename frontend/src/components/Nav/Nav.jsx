//

import React, { useContext } from "react";

import { LogoSvg_COMP } from "../../assets/logo/LogoSvg_COMP";
import {
  ICON_x,
  ICON_dropDownArrow,
  ICON_save,
  ICON_activeDigit,
  ICON_searchSmall,
} from "../icons/icons";

// import en_FLAG from "../../assets/icons/flags/en.webp";
import en_FLAG from "../../assets/icons/flags/en.png";

import css from "./Nav.module.css";
import USE_Toggle from "../../hooks/USE_toggle";
import { Btn } from "../btn/btn";
import { SearchField, Label, Input, Button } from "react-aria-components";
import { Lang_CONTEXT } from "../../contexts/lang";
import { SavedProfileIDs_CONTEXT } from "../../contexts/savedProfiles";

import { Menu, MenuItem, MenuTrigger, Popover } from "react-aria-components";

export default function Nav({ tagUsages }) {
  const [IS_menuOpen, TOGGLE_menu, SET_menuOpen] = USE_Toggle(false);
  const { lang, TOGGLE_lang } = useContext(Lang_CONTEXT);
  const { savedProfile_IDs } = useContext(SavedProfileIDs_CONTEXT);

  return (
    <header className={css.header}>
      <h1>
        <a href="http://localhost:5173/" title="← Back to the homepage">
          <LogoSvg_COMP IS_menuOpen={IS_menuOpen} />
        </a>
      </h1>

      <nav>
        <ul>
          <li>
            <Btn
              styles={["btn-40", "round", "grey"]}
              text="Startseite"
              aria_LABEL="Explore"
              onClick={() => ""}
              active="true"
            />
          </li>
          <li>
            <Btn
              styles={["btn-40", "round", "grey"]}
              text="Kategorien"
              aria_LABEL="Kategorien"
              right_ICON={<ICON_dropDownArrow />}
              onClick={() => ""}
            />
          </li>
          <li>
            <Btn
              styles={["btn-40", "round", "grey"]}
              text="Anderes"
              right_ICON={<ICON_dropDownArrow />}
              aria_LABEL="Anderes"
              onClick={() => ""}
            />
          </li>
          <li>
            <Btn
              styles={["btn-40", "round", "grey"]}
              text="Alle tags"
              right_ICON={<ICON_activeDigit count={tagUsages.length} />}
              aria_LABEL="Gespeichert"
              onClick={() => ""}
            />
          </li>
          <li>
            <MenuTrigger>
              <Button aria-label="Menu">☰</Button>
              <Popover>
                <Menu onAction={alert}>
                  <MenuItem id="open">Open</MenuItem>
                  <MenuItem id="rename">Rename…</MenuItem>
                  <MenuItem id="duplicate">Duplicate</MenuItem>
                  <MenuItem id="share">Share…</MenuItem>
                  <MenuItem id="delete">Delete…</MenuItem>
                </Menu>
              </Popover>
            </MenuTrigger>
          </li>
        </ul>
      </nav>
      <div style={{ display: "flex", columnGap: "8px" }}>
        <SearchField
          className={css["react-aria-SearchField"]}
          aria-label="Heidelberg durchsuchen..."
        >
          <ICON_searchSmall />
          {/* <Label className={css["react-aria-Label"]}>Suche</Label> */}
          <Input
            placeholder="Heidelberg durchsuchen..."
            className={css["react-aria-Input"]}
            aria-label="Heidelberg durchsuchen..."
          />
          <Button className={css["react-aria-Button"]}>
            <div className={css.x_WRAP}>
              <ICON_x />
            </div>
          </Button>
        </SearchField>
        <Btn
          styles={["btn-40", "round", "grey"]}
          text={savedProfile_IDs ? savedProfile_IDs.size : 0}
          left_ICON={<ICON_save />}
          aria_LABEL="Gespeichert"
          onClick={() => ""}
        />
        <Btn
          styles={["btn-40", "round", "grey"]}
          text="EN"
          left_ICON={<img src={en_FLAG} style={{ borderRadius: "8px" }} />}
          right_ICON={<ICON_dropDownArrow />}
          aria_LABEL="Gespeichert"
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

      {/* <button onClick={TOGGLE_menu}>Menu</button> */}
    </header>
  );
}
